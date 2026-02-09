const express = require("express");
const prisma = require("../prisma");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Find users who can teach what the logged-in user wants to learn
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Skills current user wants to learn
    const myLearningSkills = await prisma.skill.findMany({
      where: {
        userId: req.userId,
        type: "learn"
      },
      select: { name: true }
    });

    const skillNames = myLearningSkills.map(skill => skill.name);

    if (skillNames.length === 0) {
      return res.json([]);
    }

    // Find users who teach those skills
    const matches = await prisma.skill.findMany({
      where: {
        type: "teach",
        name: { in: skillNames },
        NOT: { userId: req.userId }
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

// Get all users with their teach skills
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        skills: {
          where: { type: "teach" }
        }
      }
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


module.exports = router;
