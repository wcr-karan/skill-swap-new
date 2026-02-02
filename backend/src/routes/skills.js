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
// Get my skills
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      where: { userId: req.userId },
      orderBy: { id: "desc" },
    });

    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
// Explore other users' skills
router.get("/explore", authMiddleware, async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      where: {
        NOT: { userId: req.userId }, // exclude my own skills
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            bio: true,
          },
        },
      },
      orderBy: { id: "desc" },
    });

    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Find skill swap matches
router.get("/matches", authMiddleware, async (req, res) => {
  try {
    // 1. Get my skills
    const mySkills = await prisma.skill.findMany({
      where: { userId: req.userId },
    });

    const teachSkills = mySkills
      .filter(s => s.type === "teach")
      .map(s => s.name);

    const learnSkills = mySkills
      .filter(s => s.type === "learn")
      .map(s => s.name);

    // 2. Find other users who match
    const matches = await prisma.skill.findMany({
      where: {
        userId: { not: req.userId },
        OR: [
          { name: { in: learnSkills }, type: "teach" }, // they teach what I want
          { name: { in: teachSkills }, type: "learn" }  // they want what I teach
        ]
      },
      include: {
        user: {
          select: { id: true, name: true, bio: true }
        }
      }
    });

    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
