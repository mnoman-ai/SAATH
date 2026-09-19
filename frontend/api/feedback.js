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

    const files = await list({ prefix: "feedback.json" });

    let data = { feedback: [] };

    if (files.blobs.length) {
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
            access: "public",
            addRandomSuffix: false,
            contentType: "application/json"
        }
    );

    res.json({
        message: "Feedback submitted successfully."
    });
}
