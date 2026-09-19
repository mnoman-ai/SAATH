import { put, list } from "@vercel/blob";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { item, category, quantity, reason } = req.body;

    if (!item || !category || !quantity || !reason) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const files = await list({ prefix: "requests.json" });

    let data = { requests: [] };

    if (files.blobs.length) {
        const response = await fetch(files.blobs[0].url);
        data = await response.json();
    }

    data.requests.push({
        id: data.requests.length + 1,
        item: item.trim(),
        category,
        quantity: Number(quantity),
        reason: reason.trim(),
        createdAt: new Date().toISOString()
    });

    await put(
        "requests.json",
        JSON.stringify(data, null, 2),
        {
            access: "public",
            addRandomSuffix: false,
            contentType: "application/json"
        }
    );

    res.json({
        message: "Request submitted successfully."
    });
}
