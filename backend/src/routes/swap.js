const express = require("express");
const prisma = require("../prisma");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Send a swap request
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { toUserId, skillOffered, skillWanted } = req.body;

    if (!toUserId || !skillOffered || !skillWanted) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const request = await prisma.swapRequest.create({
      data: {
        fromUserId: req.userId,
        toUserId: parseInt(toUserId),
        skillOffered,
        skillWanted,
      },
    });

    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
// Get incoming swap requests
router.get("/incoming", authMiddleware, async (req, res) => {
  try {
    const requests = await prisma.swapRequest.findMany({
      where: { toUserId: req.userId },
      include: {
        fromUser: {
          select: { id: true, name: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
// Accept or reject a swap request
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const requestId = parseInt(req.params.id);
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Make sure the logged-in user is the receiver
    const existing = await prisma.swapRequest.findUnique({
      where: { id: requestId }
    });

    if (!existing || existing.toUserId !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updated = await prisma.swapRequest.update({
      where: { id: requestId },
      data: { status }
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
