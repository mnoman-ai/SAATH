const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));
const feedbackFile = path.join(__dirname, "..", "data", "feedback.json");

app.post("/api/feedback", (req, res) => {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
        return res.status(400).json({
            message: "Rating and feedback are required."
        });
    }

    const data = JSON.parse(fs.readFileSync(feedbackFile, "utf8"));

    const newFeedback = {
        id: data.feedback.length + 1,
        rating: Number(rating),
        comment: comment.trim(),
        createdAt: new Date().toISOString()
    };

    data.feedback.push(newFeedback);

    fs.writeFileSync(
        feedbackFile,
        JSON.stringify(data, null, 2)
    );

    res.status(201).json({
        message: "Feedback submitted successfully.",
        feedback: newFeedback
    });
});

app.get("/api/feedback", (req, res) => {
    const data = JSON.parse(fs.readFileSync(feedbackFile, "utf8"));

    res.json(data);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
