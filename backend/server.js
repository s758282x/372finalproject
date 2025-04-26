const express = require("express");
const cors = require("cors");
const spinsRouter = require("./routes/spins");
const authRouter = require("./routes/auth"); 
const userRouter = require("./routes/users");
const betsRouter = require("./routes/bets"); 





const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/spins", spinsRouter);
app.use("/api/auth", authRouter); 
app.use("/api/users", userRouter);
app.use("/api/bets", betsRouter);


// Test route
app.get("/", (req, res) => res.send("Roulette backend is live!"));

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
