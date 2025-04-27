require("dotenv").config(); 

const express = require("express");
const router = express.Router();
const { Bet } = require("../models"); 
const axios = require("axios");


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


// Helper function to call OpenAI
async function askOpenAI(prompt) {
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.choices[0].message.content.trim();
}

// Inspirational Quote
router.get("/inspirational-quote", async (req, res) => {
  const prompt = "Give me an inspirational quote related to gambling, taking risks, or luck. Make it positive and motivational.";
  
  try {
    const response = await askOpenAI(prompt);
    res.json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate inspirational quote." });
  }
});

// Odds Report
router.get("/odds-report", async (req, res) => {
  try {
    const spins = await Bet.findAll({
      attributes: ["spin_result"],
      limit: 50,
    });

    const spinResults = spins.map(row => row.spin_result);

    const prompt = `Analyze this roulette spin history and give me brief statistics of the spins: ${spinResults.join(", ")}.`;

    const response = await askOpenAI(prompt);
    res.json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate odds report." });
  }
});

module.exports = router;
