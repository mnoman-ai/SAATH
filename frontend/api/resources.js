import { put, get } from "@vercel/blob";
import fs from "fs";
import path from "path";

const options = {
    access: "private",
    token: process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN
};

const seedFile = path.join(process.cwd(), "data", "resources.json");

function readSeedData() {
    try {
        return JSON.parse(fs.readFileSync(seedFile, "utf8"));
    } catch {
        return { resources: [] };
    }
}

function mergeResources(seed, live) {
    const map = new Map();

    for (const item of seed.resources || []) {
        map.set(String(item.id), item);
    }

    for (const item of live.resources || []) {
        const key = String(item.id || item.name);
        map.set(key, item);
    }

    return { resources: Array.from(map.values()) };
}

async function getData() {
    const seed = readSeedData();
    let live = { resources: [] };

    try {
        const blob = await get("resources.json", options);
        if (blob) {
            live = JSON.parse(await new Response(blob.stream).text());
        }
    } catch {
        live = { resources: [] };
    }

    return mergeResources(seed, live);
}

async function saveData(data) {
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

export default async function handler(req, res) {
    try {
        const data = await getData();

        if (req.method === "GET") {
            return res.status(200).json(data);
        }

        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method not allowed" });
        }

        const body = req.body || {};
        const { name, category, condition, location, description, contact, sharing } = body;

        if (!name || !location || !description || !contact) {
            return res.status(400).json({
                message: "Please fill all required details."
            });
        }

        const item = {
            id: Date.now(),
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
        await saveData(data);

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
