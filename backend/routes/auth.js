const express = require("express");
const router = express.Router();
const db = require("../db"); // <- use your existing DB client

router.post("/sync", async (req, res) => {
  const { email, name } = req.body;

  if (!email) return res.status(400).json({ error: "Missing email" });

  try {
    const existing = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (existing.rows.length > 0) {
      return res.json(existing.rows[0]);
    }

    const [first_name, last_name] = name?.split(" ") ?? ["New", "User"];
    const result = await db.query(
      "INSERT INTO users (first_name, last_name, email, balance) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name || "", email, 1000]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error syncing user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
