import { put, get } from "@vercel/blob";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    const { item, category, quantity, reason } = req.body;

    if (!item || !category || !quantity || !reason) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const options = {
        access: "private",
        token: process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN
    };

    const blob = await get("requests.json", options);

    let data = {
        requests: []
    };

    if (blob) {
        const text = await new Response(blob.stream).text();
        data = JSON.parse(text);
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
            ...options,
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: "application/json"
        }
    );

    res.json({
        message: "Request submitted successfully."
    });
}
