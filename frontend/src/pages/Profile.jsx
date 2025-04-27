import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import { PAYOUTS, getPayoutMultiplier, getNumberColor, didWin } from "../utils/RouletteRules";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Alert, Collapse,
} from "@mui/material";
import CountUp from "react-countup";

// ✅ Define API_URL locally at the top
const API_URL = process.env.NODE_ENV === "production"
  ? "https://finalback-ejdffjg2fjgedkde.centralus-01.azurewebsites.net/api"
  : "http://localhost:5001/api";

export default function Profile() {
  const { user, setUser } = useUser();
  const [bets, setBets] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (user) {
      fetch(`${API_URL}/bets/${user.user_id}`)
        .then((res) => res.json())
        .then((data) => {
          setBets(data.bets || []);
        })
        .catch((err) => {
          console.error("Error fetching bets:", err);
        });
    }
  }, [user]);

  const totalWagered = bets.reduce((sum, bet) => sum + bet.amount, 0);
  const totalWinnings = bets.reduce((sum, bet) => {
    if (bet.spin_result && didWin(bet.bet_type, bet.spin_result)) {
      return sum + bet.amount * (getPayoutMultiplier(bet.bet_type) + 1);
    }
    return sum;
  }, 0);
  const netProfit = totalWinnings - totalWagered;

  const resetBalance = async () => {
    try {
      await fetch(`${API_URL}/users/${user.user_id}/balance`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ balance: 1000 }),
      });
      setUser((prev) => ({ ...prev, balance: 1000 }));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Error resetting balance:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <Navbar />
        <div className="flex flex-grow items-center justify-center">
          <h1 className="text-2xl font-bold">Please log in to view your profile.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <Navbar />

      {/* Top centered Alert */}
      <div className="flex justify-center mt-4">
        <Collapse in={showAlert}>
          <Alert severity="success" sx={{ width: "400px", textAlign: "center" }}>
            Balance reset to $1000!
          </Alert>
        </Collapse>
      </div>

      <div className="p-8 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <p className="mb-4">
          Logged in as: <span className="font-mono">{user.username}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* CARD 1 */}
          <div className="p-4 bg-white rounded shadow text-center">
            <h3 className="text-lg font-semibold">Current Balance</h3>
            <p className="text-xl">
              <CountUp end={Number(user.balance) || 0} decimals={2} prefix="$" />
            </p>
          </div>

          {/* CARD 2 */}
          <div className="p-4 bg-white rounded shadow text-center">
            <h3 className="text-lg font-semibold">Total Wagered</h3>
            <p className="text-xl">
              <CountUp end={totalWagered} decimals={2} prefix="$" />
            </p>
          </div>

          {/* CARD 3 */}
          <div className="p-4 bg-white rounded shadow text-center">
            <h3 className="text-lg font-semibold">Total Winnings</h3>
            <p className="text-xl">
              <CountUp end={totalWinnings} decimals={2} prefix="$" />
            </p>
          </div>

          {/* CARD 4 */}
          <div className="p-4 bg-white rounded shadow text-center">
            <h3 className="text-lg font-semibold">Net Profit</h3>
            <p className={`text-xl ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              <CountUp end={netProfit} decimals={2} prefix="$" />
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <Button variant="contained" color="error" onClick={resetBalance}>
            Reset Balance to $1000
          </Button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Your Bets</h2>

        {bets.length === 0 ? (
          <p>No bets found.</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bet ID</TableCell>
                  <TableCell>Bet Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Spin Result</TableCell>
                  <TableCell>Outcome</TableCell>
                  <TableCell>Payout</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bets.slice().reverse().map((bet) => {
                  const won = bet.spin_result ? didWin(bet.bet_type, bet.spin_result) : false;
                  const payout = won
                    ? bet.amount * (getPayoutMultiplier(bet.bet_type) + 1)
                    : 0;

                  return (
                    <TableRow key={bet.bet_id}>
                      <TableCell>{bet.bet_id}</TableCell>
                      <TableCell>{bet.bet_type}</TableCell>
                      <TableCell>${bet.amount}</TableCell>
                      <TableCell>{bet.spin_result || "Pending"}</TableCell>
                      <TableCell style={{ color: won ? "green" : "red", fontWeight: "bold" }}>
                        {won ? "✅ Win" : "❌ Loss"}
                      </TableCell>
                      <TableCell>${payout.toFixed(2)}</TableCell>
                      <TableCell>{new Date(bet.created_at).toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}
