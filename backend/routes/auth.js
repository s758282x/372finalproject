//Admin account = Admin@admin.com
// Admin123

//Normal User account: User@user.com
// Password123

const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/sync", async (req, res) => {
  const { username, name,} = req.body;

  if (!username) return res.status(400).json({ error: "Missing username" });

  try {
    // Check if user already exists by username
    const existing = await db.query("SELECT * FROM users WHERE username = $1", [username]);

    if (existing.rows.length > 0) {
      return res.json(existing.rows[0]);
    }

    // Parse name into first and last
    const [first_name, last_name] = name?.split(" ") ?? ["New", "User"];

    // Create new user with default balance
    const result = await db.query(
      "INSERT INTO users (first_name, last_name, username, balance) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name || "", username, 1000]
    );
    

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error syncing user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
