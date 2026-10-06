import { put, get } from "@vercel/blob";
import fs from "fs";
import path from "path";

const options = {
    access: "private",
    token: process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN
};

const filePath = path.join(process.cwd(), "data", "resources.json");

function readDefaultData() {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {
        return { resources: [] };
    }
}

export default async function handler(req, res) {
    try {
        let data = null;

        try {
            const blob = await get("resources.json", options);
            if (blob) {
                data = JSON.parse(await new Response(blob.stream).text());
            }
        } catch {
            data = null;
        }

        if (!data || !Array.isArray(data.resources)) {
            data = readDefaultData();
        }

        if (req.method === "GET") {
            return res.status(200).json(data);
        }

        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method not allowed" });
        }

        const { name, category, condition, location, description, contact, sharing } = req.body || {};

        if (!name || !location || !description || !contact) {
            return res.status(400).json({ message: "Please fill all required details." });
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
            image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=700",
            createdAt: new Date().toISOString()
        };

        data.resources.unshift(item);

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

        return res.status(200).json({
            message: "Resource added successfully.",
            resource: item
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
}
