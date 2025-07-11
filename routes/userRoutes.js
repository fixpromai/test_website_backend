const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuth");
const User = require("../models/User"); // adjust path if needed

router.get("/me", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email photo polishCount");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
