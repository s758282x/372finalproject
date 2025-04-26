const express = require("express");
const router = express.Router();
const Bet = require("../models/Bet");

// POST /api/bets - Save multiple bets
router.post("/", async (req, res) => {
  const { user_id, bets, spin_result } = req.body;

  if (!user_id || !Array.isArray(bets) || bets.length === 0) {
    return res.status(400).json({ error: "Missing or invalid bet data." });
  }

  try {
    const insertPromises = bets.map((bet) =>
      Bet.create({
        user_id,
        bet_type: bet.bet,
        amount: bet.amount,
        spin_result,
        created_at: new Date(),
      })
    );

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
    const bets = await Bet.findAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
    });

    res.json({ bets });
  } catch (error) {
    console.error("Error fetching bets:", error);
    res.status(500).json({ error: "Failed to fetch bets." });
  }
});

module.exports = router;
