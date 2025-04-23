const express = require("express");
const router = express.Router();
const db = require("../db");

// PUT /api/users/:id/balance
router.put("/:id/balance", async (req, res) => {
  const { id } = req.params;
  const { balance } = req.body;

  try {
    await db.query("UPDATE users SET balance = $1 WHERE user_id = $2", [balance, id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Balance update failed:", err);
    res.status(500).json({ error: "Could not update balance" });
  }
});

module.exports = router;
