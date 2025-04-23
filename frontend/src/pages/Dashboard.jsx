import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import BalanceDisplay from "../components/BalanceDisplay";
import SpinHistory from "../components/SpinHistory";
import SpinResult from "../components/SpinResult";
import BetControls from "../components/BetControls";
import PlacedBets from "../components/PlacedBets";
import BettingGrid from "../components/BettingGrid";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const PAYOUTS = {
  number: 35,
  dozen: 2,
  column: 2,
  evenOdd: 1,
  redBlack: 1,
  highLow: 1,
};

export default function Dashboard() {
  const { user, setUser } = useUser();
  console.log("Current user from context:", user);
  const navigate = useNavigate();

// Redirect to login if not authenticated
useEffect(() => {
  if (!user) {
    navigate("/login");
  }
}, [user, navigate]);

if (!user) return null;


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

  if (!user) return <div className="text-white p-4">Loading user...</div>;

  const updateBalance = async (newBalance) => {
    setUser((prev) => ({ ...prev, balance: newBalance }));
    await fetch(`http://localhost:5001/api/users/${user.user_id}/balance`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ balance: newBalance }),
    });
  };

  const getNumberColor = (num) => {
    if (num === 0) return "green";
    const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return reds.includes(num) ? "red" : "black";
  };

  const isBetWinner = (bet, { number: num, color }) => {
    if (bet === num.toString()) return true;
    if (bet === "red" && color === "red") return true;
    if (bet === "black" && color === "black") return true;
    if (bet === "even" && num !== 0 && num % 2 === 0) return true;
    if (bet === "odd" && num !== 0 && num % 2 !== 0) return true;
    if (bet === "1to18" && num >= 1 && num <= 18) return true;
    if (bet === "19to36" && num >= 19 && num <= 36) return true;
    if (bet === "1st12" && num >= 1 && num <= 12) return true;
    if (bet === "2nd12" && num >= 13 && num <= 24) return true;
    if (bet === "3rd12" && num >= 25 && num <= 36) return true;
    if (bet === "col1" && num % 3 === 1) return true;
    if (bet === "col2" && num % 3 === 2) return true;
    if (bet === "col3" && num !== 0 && num % 3 === 0) return true;
    return false;
  };

  const getPayoutMultiplier = (bet) => {
    if (!isNaN(Number(bet))) return PAYOUTS.number;
    if (["1st12", "2nd12", "3rd12"].includes(bet)) return PAYOUTS.dozen;
    if (["col1", "col2", "col3"].includes(bet)) return PAYOUTS.column;
    if (["even", "odd"].includes(bet)) return PAYOUTS.evenOdd;
    if (["red", "black"].includes(bet)) return PAYOUTS.redBlack;
    if (["1to18", "19to36"].includes(bet)) return PAYOUTS.highLow;
    return 0;
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

      fetch("http://localhost:5001/api/spins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result: `${num}` }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ Spin saved:", data))
        .catch((err) => console.error("❌ Error saving spin:", err));

      let win = 0;
      const winners = [];

      placedBets.forEach((pb) => {
        if (isBetWinner(pb.bet, result)) {
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

        <BalanceDisplay
          balance={user.balance}
          showHistory={showHistory}
          toggleHistory={() => setShowHistory((s) => !s)}
        />

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
