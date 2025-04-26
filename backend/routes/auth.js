//Admin account = Admin@admin.com
// Admin123

//Normal User account: User@user.com
// Password123

const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/sync", async (req, res) => {
  const { username, name } = req.body;

  if (!username) return res.status(400).json({ error: "Missing username" });

  try {
    // Check if user already exists by username
    const existing = await User.findOne({ where: { username } });

    if (existing) {
      return res.json(existing);
    }

    // Parse name into first and last
    const [first_name, last_name] = name?.split(" ") ?? ["New", "User"];

    // Create new user with default balance
    const newUser = await User.create({
      first_name,
      last_name: last_name || "",
      username,
      balance: 1000,
    });

    res.json(newUser);
  } catch (err) {
    console.error("Error syncing user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
