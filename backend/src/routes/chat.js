const express = require("express");
const prisma = require("../prisma");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET /chat/:swapId/messages — Fetch message history for a swap
router.get("/:swapId/messages", authMiddleware, async (req, res) => {
  try {
    const swapId = parseInt(req.params.swapId);

    // Verify the user is part of this swap
    const swap = await prisma.swapRequest.findUnique({
      where: { id: swapId },
    });

    if (!swap) return res.status(404).json({ error: "Swap not found" });
    if (swap.fromUserId !== req.userId && swap.toUserId !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const messages = await prisma.message.findMany({
      where: { swapId },
      include: {
        sender: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    res.json({ swap, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /chat/my — Get all accepted swaps (conversations) for the current user
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const swaps = await prisma.swapRequest.findMany({
      where: {
        status: "accepted",
        OR: [
          { fromUserId: req.userId },
          { toUserId: req.userId },
        ],
      },
      include: {
        fromUser: { select: { id: true, name: true } },
        toUser: { select: { id: true, name: true } },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1, // Last message preview
          include: { sender: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(swaps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
