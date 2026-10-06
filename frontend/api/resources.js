import { put, get } from "@vercel/blob";
import fs from "fs";
import path from "path";

const options = {
    access: "private",
    token: process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN
};

const seedPath = path.join(process.cwd(), "data", "resources.json");

function getSeed() {
    return JSON.parse(fs.readFileSync(seedPath, "utf8"));
}

async function readBlob() {
    try {
        const blob = await get("resources.json", options);
        if (!blob) return null;
        return JSON.parse(await new Response(blob.stream).text());
    } catch {
        return null;
    }
}

async function writeBlob(data) {
    await put(
        "resources.json",
        JSON.stringify(data, null, 2),
        {
            ...options,
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: "application/json"
        }
    );
}

function cleanData(seed, live) {
    const seedIds = new Set(seed.resources.map(item => String(item.id)));

    // If the Blob contains the old single-item/demo data, reset it to
    // the current 20-item demo catalog. Once the current catalog exists,
    // newly added user resources are kept.
    if (!live || !Array.isArray(live.resources)) {
        return seed;
    }

    const hasCurrentCatalog = seed.resources.every(item =>
        live.resources.some(saved => String(saved.id) === String(item.id))
    );

    if (!hasCurrentCatalog) {
        return seed;
    }

    const merged = new Map();
    seed.resources.forEach(item => merged.set(String(item.id), item));

    live.resources.forEach(item => {
        const key = String(item.id || item.name);
        if (!seedIds.has(key)) merged.set(key, item);
    });

    return { resources: Array.from(merged.values()) };
}

export default async function handler(req, res) {
    try {
        const seed = getSeed();
        const live = await readBlob();
        const data = cleanData(seed, live);

        if (req.method === "GET") {
            // If old Blob data was found, save the clean 20-item catalog now.
            if (!live || JSON.stringify(live) !== JSON.stringify(data)) {
                await writeBlob(data);
            }
            return res.status(200).json(data);
        }

        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method not allowed" });
        }

        const { name, category, condition, location, description, contact, sharing } = req.body || {};

        if (!name || !location || !description || !contact) {
            return res.status(400).json({
                message: "Please fill all required details."
            });
        }

        const item = {
            id: "user-" + Date.now(),
            name: name.trim(),
            category: category || "Other",
            condition: condition || "Good",
            location: location.trim(),
            description: description.trim(),
            contact: contact.trim(),
            sharing: sharing || "Available",
            image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=900",
            owner: {
                name: "Rohan Verma",
                role: "SAATH Community Member",
                location: location.trim(),
                contact: contact.trim()
            },
            createdAt: new Date().toISOString()
        };

        data.resources.unshift(item);
        await writeBlob(data);

        return res.status(200).json({
            message: "Resource added successfully.",
            resource: item
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Please try again."
        });
    }
}
