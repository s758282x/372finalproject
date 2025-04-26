const express = require("express");
const router = express.Router();
const db = require("../db"); // assuming your db.js exports a pool or client

// POST /api/bets - Save multiple bets
router.post("/", async (req, res) => {
  const { user_id, bets, spin_result } = req.body;

  if (!user_id || !Array.isArray(bets) || bets.length === 0) {
    return res.status(400).json({ error: "Missing or invalid bet data." });
  }

  try {
    const insertPromises = bets.map(bet => {
      return db.query(
        "INSERT INTO bets (user_id, bet_type, amount, spin_result) VALUES ($1, $2, $3, $4)",
        [user_id, bet.bet, bet.amount, spin_result]
      );
    });

    await Promise.all(insertPromises);

    res.json({ message: "Bets saved successfully." });
  } catch (error) {
    console.error("Error saving bets:", error);
    res.status(500).json({ error: "Failed to save bets." });
  }
});

// GET /api/bets/:userId - Get all bets for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM bets WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json({ bets: result.rows });
  } catch (error) {
    console.error("Error fetching bets:", error);
    res.status(500).json({ error: "Failed to fetch bets." });
  }
});

module.exports = router;
