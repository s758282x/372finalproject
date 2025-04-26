const express = require("express");
const router = express.Router();
const Spin = require("../models/Spin");

// POST /api/spins - Save a spin result
router.post("/", async (req, res) => {
  console.log("Request body received:", req.body);
  const { result } = req.body;

  if (result === undefined || result === null) {
    return res.status(400).json({ error: "Spin result is required." });
  }

  try {
    const newSpin = await Spin.create({
      result,
      created_at: new Date(),
    });
    res.status(201).json({ spin: newSpin });
  } catch (err) {
    console.error("Error saving spin:", err);
    res.status(500).json({ error: "Database error." });
  }
});

// GET /api/spins - Fetch recent spin results
router.get("/", async (req, res) => {
  try {
    const spins = await Spin.findAll({
      order: [["created_at", "DESC"]],
      limit: 50,
    });
    res.json({ spins });
  } catch (err) {
    console.error("Error fetching spins:", err);
    res.status(500).json({ error: "Database fetch error." });
  }
});

module.exports = router;
