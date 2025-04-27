import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BalanceDisplay from "../components/BalanceDisplay";
import SpinHistory from "../components/SpinHistory";
import SpinResult from "../components/SpinResult";
import BetControls from "../components/BetControls";
import PlacedBets from "../components/PlacedBets";
import BettingGrid from "../components/BettingGrid";
import { PAYOUTS, getPayoutMultiplier, getNumberColor, didWin } from "../utils/RouletteRules";
import { Button } from "@mui/material";
import axios from "axios";

// ✅ Define API_URL locally at the top
const API_URL = process.env.NODE_ENV === "production"
  ? "https://finalback-ejdffjg2fjgedkde.centralus-01.azurewebsites.net/api"
  : "http://localhost:5001/api";

export default function Dashboard() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [betAmount, setBetAmount] = useState("10");
  const [selectedBets, setSelectedBets] = useState([]);
  const [placedBets, setPlacedBets] = useState([]);
  const [gameStage, setGameStage] = useState("selecting");
  const [spinResult, setSpinResult] = useState({ number: 0, color: "green" });
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningBets, setWinningBets] = useState([]);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [spinHistory, setSpinHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [quote, setQuote] = useState("");
  const [loadingQuote, setLoadingQuote] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return <div className="text-white p-4">Loading user...</div>;

  const updateBalance = async (newBalance) => {
    setUser((prev) => ({ ...prev, balance: newBalance }));
    await fetch(`${API_URL}/users/${user.user_id}/balance`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ balance: newBalance }),
    });
  };

  const getInspirationalQuote = async () => {
    try {
      setLoadingQuote(true);
      const res = await axios.get(`${API_URL}/ai/inspirational-quote`);
      console.log(res.data.response);
      setQuote(res.data.response);
    } catch (err) {
      console.error("Error fetching inspirational quote:", err);
    } finally {
      setLoadingQuote(false);
    }
  };

  const toggleBet = (bet) => {
    if (gameStage !== "selecting") return;
    setSelectedBets((curr) =>
      curr.includes(bet) ? curr.filter((b) => b !== bet) : [...curr, bet]
    );
  };

  const placeBets = () => {
    if (!selectedBets.length) return;
    const amt = parseInt(betAmount, 10);
    const total = amt * selectedBets.length;

    if (total > user.balance) {
      alert("Not enough balance");
      return;
    }

    updateBalance(user.balance - total);
    setPlacedBets((prev) => [
      ...prev,
      ...selectedBets.map((b) => ({ bet: b, amount: amt })),
    ]);
    setSelectedBets([]);
  };

  const clearBets = () => {
    const refund = placedBets.reduce((sum, b) => sum + b.amount, 0);
    updateBalance(user.balance + refund);
    setPlacedBets([]);
    setSelectedBets([]);
    setGameStage("selecting");
  };

  const editBetAmount = (index, newAmount) => {
    const oldAmount = placedBets[index].amount;
    const updated = [...placedBets];
    updated[index].amount = newAmount;
    updateBalance(user.balance + (oldAmount - newAmount));
    setPlacedBets(updated);
  };

  const removeBet = (index) => {
    const refund = placedBets[index].amount;
    const updated = [...placedBets];
    updated.splice(index, 1);
    updateBalance(user.balance + refund);
    setPlacedBets(updated);
  };

  const spinWheel = () => {
    if (!placedBets.length || isSpinning) return;

    setGameStage("spinning");
    setIsSpinning(true);

    setTimeout(() => {
      const num = Math.floor(Math.random() * 37);
      const color = getNumberColor(num);
      const result = { number: num, color };
      setSpinResult(result);
      setSpinHistory((h) => [result, ...h].slice(0, 10));
      setIsSpinning(false);
      setGameStage("result");

      fetch(`${API_URL}/spins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result: num }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ Spin saved:", data))
        .catch((err) => console.error("❌ Error saving spin:", err));

      fetch(`${API_URL}/bets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          bets: placedBets,
          spin_result: num,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ Bets saved:", data))
        .catch((err) => console.error("❌ Error saving bets:", err));

      let win = 0;
      const winners = [];

      placedBets.forEach((pb) => {
        if (didWin(pb.bet, result.number)) {
          winners.push(pb.bet);
          win += pb.amount * (getPayoutMultiplier(pb.bet) + 1);
        }
      });

      setWinningBets(winners);
      setTotalWinnings(win);
      updateBalance(user.balance + win);
      setPlacedBets([]);
      setSelectedBets([]);
      setBetAmount("10");

      setTimeout(() => {
        setGameStage("selecting");
      }, 2000);
    }, 1000);
  };

  const numbers = Array.from({ length: 36 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-800">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600 tracking-wide">
          Roulette Dashboard
        </h1>

        <div className="text-3xl text-green-600 font-bold text-center mb-4">
          Balance: ${parseFloat(user?.balance ?? 0).toFixed(2)}
        </div>

        <div className="text-center mb-8">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setShowHistory((s) => !s)}
          >
            {showHistory ? "Hide Spin History" : "Show Spin History"}
          </Button>
        </div>

        {/* Inspirational Quote Button */}
        <div className="text-center mb-8">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={getInspirationalQuote}
          >
            Get Inspirational Gambling Advice
          </Button>
        </div>

        {quote && (
          <div className="text-center text-white mt-4 px-4">
            <h3 className="text-lg font-semibold mb-2">Your Inspirational Quote:</h3>
            <p>"{quote}"</p>
          </div>
        )}

        {showHistory && <SpinHistory spinHistory={spinHistory} />}

        <div className="mb-8">
          <SpinResult
            isSpinning={isSpinning}
            gameStage={gameStage}
            spinResult={spinResult}
            totalWinnings={totalWinnings}
          />
        </div>

        <BettingGrid
          numbers={numbers}
          toggleBet={toggleBet}
          selectedBets={selectedBets}
          getNumberColor={getNumberColor}
        />

        <BetControls
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          selectedBets={selectedBets}
          placeBets={placeBets}
          clearSelectedBets={() => setSelectedBets([])}
        />

        {placedBets.length > 0 && (
          <div className="mb-8">
            <PlacedBets
              placedBets={placedBets}
              editBetAmount={editBetAmount}
              removeBet={removeBet}
              spinWheel={spinWheel}
              clearBets={clearBets}
              isSpinning={isSpinning}
            />
          </div>
        )}
      </div>
    </div>
  );
}
