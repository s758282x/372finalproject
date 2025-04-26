const express = require("express");
const router = express.Router();
const User = require("../models/User");

// PUT /api/users/:id/balance
router.put("/:id/balance", async (req, res) => {
  const { id } = req.params;
  const { balance } = req.body;

  try {
    await User.update(
      { balance },                  // what to set
      { where: { user_id: id } }    // where condition
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Balance update failed:", err);
    res.status(500).json({ error: "Could not update balance" });
  }
});

module.exports = router;
