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

// ─────────────────────────────────────────
// AI Skill Match Scoring (TF-IDF Cosine Similarity)
// ─────────────────────────────────────────

// Tokenize a string into lowercase word set
function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
}

// Build a term frequency vector from an array of skill strings
function buildTFVector(skills) {
  const terms = {};
  const allTokens = skills.flatMap(s => tokenize(s));
  allTokens.forEach(token => { terms[token] = (terms[token] || 0) + 1; });
  return terms;
}

// Cosine similarity between two TF vectors
function cosineSimilarity(vecA, vecB) {
  const allKeys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  let dot = 0, magA = 0, magB = 0;
  for (const k of allKeys) {
    const a = vecA[k] || 0;
    const b = vecB[k] || 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// GET /matches/ai — AI-scored matches for logged-in user
router.get("/ai", authMiddleware, async (req, res) => {
  try {
    // Get my learn skills
    const myLearnSkills = await prisma.skill.findMany({
      where: { userId: req.userId, type: "learn" },
      select: { name: true },
    });

    // Get my teach skills
    const myTeachSkills = await prisma.skill.findMany({
      where: { userId: req.userId, type: "teach" },
      select: { name: true },
    });

    if (myLearnSkills.length === 0 && myTeachSkills.length === 0) {
      return res.json([]);
    }

    // Build query vector from what I want to learn
    const myLearnVec = buildTFVector(myLearnSkills.map(s => s.name));
    const myTeachVec = buildTFVector(myTeachSkills.map(s => s.name));

    // Get all other users with their skills
    const allUsers = await prisma.user.findMany({
      where: { id: { not: req.userId } },
      select: {
        id: true,
        name: true,
        bio: true,
        skills: true,
      },
    });

    // Score each user
    const scored = allUsers.map(user => {
      const theirTeach = user.skills.filter(s => s.type === "teach").map(s => s.name);
      const theirLearn = user.skills.filter(s => s.type === "learn").map(s => s.name);

      // How well do they teach what I want to learn?
      const teachScore = myLearnVec && Object.keys(myLearnVec).length > 0
        ? cosineSimilarity(myLearnVec, buildTFVector(theirTeach))
        : 0;

      // How well do they want to learn what I teach?
      const learnScore = myTeachVec && Object.keys(myTeachVec).length > 0
        ? cosineSimilarity(myTeachVec, buildTFVector(theirLearn))
        : 0;

      // Combined score (weighted: 60% teach match, 40% learn match)
      const combinedScore = (teachScore * 0.6 + learnScore * 0.4);
      const matchPercent = Math.round(combinedScore * 100);

      return {
        ...user,
        matchScore: matchPercent,
        teachScore: Math.round(teachScore * 100),
        learnScore: Math.round(learnScore * 100),
      };
    });

    // Sort by match score descending, filter out 0s
    const results = scored
      .filter(u => u.matchScore > 0 || u.skills.length > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json(results);
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
