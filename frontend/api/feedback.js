import { put, get } from "@vercel/blob";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    const { rating, comment } = req.body;

    if (!rating || !comment) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const options = {
        access: "private",
        token: process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN
    };

    const blob = await get("feedback.json", options);

    let data = {
        feedback: []
    };

    if (blob) {
        const text = await new Response(blob.stream).text();
        data = JSON.parse(text);
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
            allowOverwrite: true,
            contentType: "application/json"
        }
    );

    res.json({
        message: "Feedback submitted successfully."
    });
}
