import { put, get } from "@vercel/blob";

const options = {
    access: "private",
    token: process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const blob = await get("users.json", options);
        let users = [];

        if (blob) {
            const text = await new Response(blob.stream).text();
            users = JSON.parse(text);
        }

        const { action, name, email, password } = req.body;

        if (action === "register") {
            if (!name || !email || !password) {
                return res.status(400).json({ success: false, message: "Please fill all fields" });
            }

            if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
                return res.status(400).json({ success: false, message: "Email already registered" });
            }

            users.push({ id: Date.now(), name: name.trim(), email: email.trim(), password });

            await put("users.json", JSON.stringify(users, null, 2), {
                ...options,
                addRandomSuffix: false,
                allowOverwrite: true,
                contentType: "application/json"
            });

            return res.json({ success: true, message: "Registration Successful!" });
        }

        if (action === "login") {
            const user = users.find(user =>
                user.email.toLowerCase() === String(email || "").toLowerCase() &&
                user.password === password
            );

            if (!user) {
                return res.status(401).json({ success: false, message: "Wrong Email or Password!" });
            }

            return res.json({ success: true, name: user.name });
        }

        return res.status(400).json({ success: false, message: "Invalid action" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
