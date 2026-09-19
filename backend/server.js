const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

const feedbackFile = path.join(__dirname, "..", "data", "feedback.json");
const requestFile = path.join(__dirname, "..", "data", "requests.json");

app.post("/api/feedback", (req, res) => {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const data = JSON.parse(fs.readFileSync(feedbackFile, "utf8"));

    data.feedback.push({
        id: data.feedback.length + 1,
        rating: Number(rating),
        comment: comment.trim(),
        createdAt: new Date().toISOString()
    });

    fs.writeFileSync(feedbackFile, JSON.stringify(data, null, 2));

    res.json({
        message: "Feedback submitted successfully."
    });
});

app.get("/api/feedback", (req, res) => {
    res.json(JSON.parse(fs.readFileSync(feedbackFile, "utf8")));
});

app.post("/api/requests", (req, res) => {
    const { item, category, quantity, reason } = req.body;

    if (!item || !category || !quantity || !reason) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const data = JSON.parse(fs.readFileSync(requestFile, "utf8"));

    data.requests.push({
        id: data.requests.length + 1,
        item: item.trim(),
        category: category,
        quantity: Number(quantity),
        reason: reason.trim(),
        createdAt: new Date().toISOString()
    });

    fs.writeFileSync(requestFile, JSON.stringify(data, null, 2));

    res.json({
        message: "Request submitted successfully."
    });
});

app.get("/api/requests", (req, res) => {
    res.json(JSON.parse(fs.readFileSync(requestFile, "utf8")));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
