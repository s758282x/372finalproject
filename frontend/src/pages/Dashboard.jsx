import React, { useState } from "react";
import BalanceDisplay from "../components/BalanceDisplay";
import SpinHistory from "../components/SpinHistory";
import SpinResult from "../components/SpinResult";
import BetControls from "../components/BetControls";
import PlacedBets from "../components/PlacedBets";
import BettingGrid from "../components/BettingGrid";
import Navbar from "../components/Navbar";

// Define payout multipliers for different bet types
const PAYOUTS = {
  number: 35,
  dozen: 2,
  column: 2,
  evenOdd: 1,
  redBlack: 1,
  highLow: 1,
};

export default function Dashboard() {
  // Game state variables
  const [balance, setBalance] = useState(1000); // User's current balance
  const [betAmount, setBetAmount] = useState("10"); // Default bet amount per selection
  const [selectedBets, setSelectedBets] = useState([]); // Currently selected bets (before placement)
  const [placedBets, setPlacedBets] = useState([]); // Bets that have been placed
  const [gameStage, setGameStage] = useState("selecting"); // "selecting", "spinning", or "result"
  const [spinResult, setSpinResult] = useState({ number: 0, color: "green" }); // Result of the last spin
  const [isSpinning, setIsSpinning] = useState(false); // Whether the wheel is currently spinning
  const [winningBets, setWinningBets] = useState([]); // Bets that won on the last spin (not used right now)
  const [totalWinnings, setTotalWinnings] = useState(0); // Winnings from the last spin
  const [spinHistory, setSpinHistory] = useState([]); // Last 10 spin results
  const [showHistory, setShowHistory] = useState(false); // Toggle spin history visibility

  // Helper to determine the color of a roulette number
  const getNumberColor = (num) => {
    if (num === 0) return "green";
    const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return reds.includes(num) ? "red" : "black";
  };

  // Determine if a placed bet matches the spin result
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

  // Return payout multiplier for a given bet
  const getPayoutMultiplier = (bet) => {
    if (!isNaN(Number(bet))) return PAYOUTS.number;
    if (["1st12", "2nd12", "3rd12"].includes(bet)) return PAYOUTS.dozen;
    if (["col1", "col2", "col3"].includes(bet)) return PAYOUTS.column;
    if (["even", "odd"].includes(bet)) return PAYOUTS.evenOdd;
    if (["red", "black"].includes(bet)) return PAYOUTS.redBlack;
    if (["1to18", "19to36"].includes(bet)) return PAYOUTS.highLow;
    return 0;
  };

  // Add or remove a bet from selectedBets
  const toggleBet = (bet) => {
    if (gameStage !== "selecting") return;
    setSelectedBets((curr) =>
      curr.includes(bet) ? curr.filter((b) => b !== bet) : [...curr, bet]
    );
  };

  // Confirm selected bets and deduct balance
  const placeBets = () => {
    if (!selectedBets.length) return;
    const amt = parseInt(betAmount, 10);
    const total = amt * selectedBets.length;

    if (total > balance) {
      alert("Not enough balance");
      return;
    }

    // Deduct and lock in the bets
    setBalance((b) => b - total);
    setPlacedBets((prev) => [
      ...prev,
      ...selectedBets.map((b) => ({ bet: b, amount: amt })),
    ]);
    setSelectedBets([]);
  };

  // Cancel all placed bets and refund
  const clearBets = () => {
    const refund = placedBets.reduce((sum, b) => sum + b.amount, 0);
    setBalance((b) => b + refund);
    setPlacedBets([]);
    setSelectedBets([]);
    setGameStage("selecting");
  };

  // Edit bet amount and adjust balance accordingly
  const editBetAmount = (index, newAmount) => {
    const oldAmount = placedBets[index].amount;
    const updated = [...placedBets];
    updated[index].amount = newAmount;
    setBalance((b) => b + (oldAmount - newAmount));
    setPlacedBets(updated);
  };

  // Remove an individual bet and refund amount
  const removeBet = (index) => {
    const refund = placedBets[index].amount;
    const updated = [...placedBets];
    updated.splice(index, 1);
    setBalance((b) => b + refund);
    setPlacedBets(updated);
  };

  // Main spin logic: simulate a wheel spin, evaluate winnings, update state
  const spinWheel = () => {
    if (!placedBets.length || isSpinning) return;

    setGameStage("spinning");
    setIsSpinning(true);

    const totalBetAmount = placedBets.reduce((sum, bet) => sum + bet.amount, 0);

    setTimeout(() => {
      const num = Math.floor(Math.random() * 37); // 0 to 36
      const color = getNumberColor(num);
      const result = { number: num, color };
      setSpinResult(result);
      setSpinHistory((h) => [result, ...h].slice(0, 10));
      setIsSpinning(false);
      setGameStage("result");

      let win = 0;
      const winners = [];

      // Calculate winnings
      placedBets.forEach((pb) => {
        if (isBetWinner(pb.bet, result)) {
          winners.push(pb.bet);
          win += pb.amount * (getPayoutMultiplier(pb.bet) + 1); // +1 to include the original bet
        }
      });

      setWinningBets(winners);
      setTotalWinnings(win);

      // Update final balance
      setBalance((b) => b + win);
      setPlacedBets([]);
      setSelectedBets([]);
      setBetAmount("10");
      
      setTimeout(() => { // Reset game stage after 2s to allow for a new spin
        setGameStage("selecting");
      }, 2000);
    }, 1000);


  };

  const numbers = Array.from({ length: 36 }, (_, i) => i + 1); // 1 to 36

  return (
    <div className="flex flex-col min-h-screen bg-zinc-800">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600 tracking-wide">
          Roulette Dashboard
        </h1>

        {/* Balance and toggleable spin history */}
        <BalanceDisplay
          balance={balance}
          showHistory={showHistory}
          toggleHistory={() => setShowHistory((s) => !s)}
        />

        {showHistory && <SpinHistory spinHistory={spinHistory} />}

        <div className="mb-8">
          {/* Shows current spin result and winnings */}
          <SpinResult
            isSpinning={isSpinning}
            gameStage={gameStage}
            spinResult={spinResult}
            totalWinnings={totalWinnings}
          />
        </div>

        
          {/* Main roulette number board */}
          <BettingGrid
            numbers={numbers}
            toggleBet={toggleBet}
            selectedBets={selectedBets}
            getNumberColor={getNumberColor}
          />

          {/* Bet input and selection controls */}
          <BetControls
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            selectedBets={selectedBets}
            placeBets={placeBets}
            clearSelectedBets={() => setSelectedBets([])}
          />
        

        {/* Placed bets and actions (spin, remove, edit) */}
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
