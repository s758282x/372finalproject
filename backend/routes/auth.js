
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/sync", async (req, res) => {
  const { username, name } = req.body;

  if (!username) return res.status(400).json({ error: "Missing username" });

  try {
    // Parse name into first and last
    const [first_name, last_name] = name?.split(" ") ?? ["New", "User"];

    // Find or create user atomically
    const [user, created] = await User.findOrCreate({
      where: { username },
      defaults: {
        first_name,
        last_name: last_name || "",
        balance: 1000,
      },
    });

    res.json(user);
  } catch (err) {
    console.error("Error syncing user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
