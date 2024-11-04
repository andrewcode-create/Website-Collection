const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/User");

const router = express.Router();

router.get("/settings", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/settings", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { settings: req.body.settings },
      { new: true }
    );
    res.json(user.settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
