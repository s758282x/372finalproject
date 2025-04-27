const express = require("express");
const cors = require("cors");
const spinsRouter = require("./routes/spins");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const betsRouter = require("./routes/bets");
const aiRouter = require("./routes/ai");
const blogsRouter = require("./routes/blogs");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/spins", spinsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/bets", betsRouter);
app.use("/api/ai", aiRouter);
app.use("/api/blogs", blogsRouter);

// Test route
app.get("/", (req, res) => res.send("Roulette backend is live!"));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
