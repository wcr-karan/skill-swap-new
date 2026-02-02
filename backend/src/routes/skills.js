const express = require("express");
const prisma = require("../prisma");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add a skill
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, type } = req.body; // type = "teach" or "learn"

    if (!name || !type) {
      return res.status(400).json({ error: "Name and type are required" });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        type,
        userId: req.userId,
      },
    });

    res.status(201).json(skill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
