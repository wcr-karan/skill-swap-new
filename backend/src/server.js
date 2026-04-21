const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const skillRoutes = require("./routes/skills");
const swapRoutes = require("./routes/swap");
const matchRoutes = require("./routes/matches");
const chatRoutes = require("./routes/chat");
const prisma = require("./prisma");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/skills", skillRoutes);
app.use("/swap", swapRoutes);
app.use("/matches", matchRoutes);
app.use("/chat", chatRoutes);
app.use("/notifications", require("./routes/notifications"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ─────────────────────────────────────────
// Socket.io Real-time Chat
// ─────────────────────────────────────────
const onlineUsers = new Map(); // userId → socketId

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // Register user
  socket.on("register", (userId) => {
    onlineUsers.set(String(userId), socket.id);
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  // Join a chat room (by swapId)
  socket.on("joinRoom", (swapId) => {
    socket.join(`swap_${swapId}`);
    console.log(`Socket ${socket.id} joined room swap_${swapId}`);
  });

  // Send message
  socket.on("sendMessage", async ({ swapId, senderId, content }) => {
    try {
      // Persist to database
      const message = await prisma.message.create({
        data: {
          content,
          senderId: parseInt(senderId),
          swapId: parseInt(swapId),
        },
        include: {
          sender: { select: { id: true, name: true } },
        },
      });

      // Broadcast to room
      io.to(`swap_${swapId}`).emit("receiveMessage", message);
    } catch (error) {
      console.error("Message save error:", error);
      socket.emit("messageError", { error: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => {
    // Clean up online users map
    for (const [userId, sid] of onlineUsers.entries()) {
      if (sid === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    console.log("Socket disconnected:", socket.id);
  });
});

const port = process.env.PORT || 5050;

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
