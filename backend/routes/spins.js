const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/spins - Save a spin result
router.post("/", async (req, res) => {
  console.log("Request body received:", req.body);
  const { result } = req.body;

  if (!result) {
    return res.status(400).json({ error: "Spin result is required." });
  }

  try {
    const insertQuery = "INSERT INTO spins (result) VALUES ($1) RETURNING *";
    const { rows } = await db.query(insertQuery, [result]);
    res.status(201).json({ spin: rows[0] });
  } catch (err) {
    console.error("Error saving spin:", err);
    res.status(500).json({ error: "Database error." });
  }
});

// GET /api/spins - Fetch recent spin results
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM spins ORDER BY created_at DESC LIMIT 10"
    );
    res.json({ spins: rows });
  } catch (err) {
    console.error("Error fetching spins:", err);
    res.status(500).json({ error: "Database fetch error." });
  }
});

module.exports = router;
