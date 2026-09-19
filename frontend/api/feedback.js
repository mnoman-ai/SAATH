import { put, list } from "@vercel/blob";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { rating, comment } = req.body;

    if (!rating || !comment) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const options = {
        access: "private",
        storeId: process.env.BLOB_READ_WRITE_TOKEN_STORE_ID,
        token: process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN
    };

    const files = await list({
        prefix: "feedback.json",
        ...options
    });

    let data = { feedback: [] };

    if (files.blobs.length > 0) {
        const response = await fetch(files.blobs[0].url);
        data = await response.json();
    }

    data.feedback.push({
        id: data.feedback.length + 1,
        rating: Number(rating),
        comment: comment.trim(),
        createdAt: new Date().toISOString()
    });

    await put(
        "feedback.json",
        JSON.stringify(data, null, 2),
        {
            ...options,
            addRandomSuffix: false,
            contentType: "application/json"
        }
    );

    res.json({
        message: "Feedback submitted successfully."
    });
}
