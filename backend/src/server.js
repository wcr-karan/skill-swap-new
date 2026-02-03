const express = require("express");
const authRoutes = require("./routes/auth");
const skillRoutes = require("./routes/skills");
const swapRoutes = require("./routes/swap");
const matchRoutes = require("./routes/matches");
const cors = require("cors");



const app = express();

app.use(express.json()); // must come AFTER app is created
app.use(cors());
app.use("/auth", authRoutes);
app.use("/skills", skillRoutes);
app.use("/swap", swapRoutes);
app.use("/matches", matchRoutes);


app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(5050, () => {
  console.log("Server running on http://localhost:5050");
});
