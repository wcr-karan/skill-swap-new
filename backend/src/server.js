const express = require("express");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json()); // must come AFTER app is created
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(5050, () => {
  console.log("Server running on http://localhost:5050");
});
