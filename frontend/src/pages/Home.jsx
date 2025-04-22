import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar spans full width */}
      <Navbar />

      {/* Page Content */}
      <div className="flex-grow bg-gray-100 text-gray-900">
        <div className="p-8 max-w-screen-md mx-auto">
        <h1 className="title-h1">Welcome to Ant's Roulette Game </h1>

          <div className="text-center mb-8">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
              onClick={() => navigate('/login')}
            >
              Signup/Login to Play
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-4">How to Play:</h2>
          <ul className="list-disc list-inside mb-6">
            <li>This is a simplified American Roulette game: numbers 1–36, plus 0 and 00</li>
            <li>You can bet on single numbers, colors, odds/evens, dozens, and more</li>
            <li>Click Spin to play after placing your bet</li>
            <li>If your bet wins, you receive a payout based on the type of bet</li>
            <li>Accounts will start at $1000. Try to run it up! You can restart at any time.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Payouts:</h2>
          <ul className="list-disc list-inside">
            <li><strong>Single Number (Straight Up):</strong> 35 to 1</li>
            <li><strong>Column (12 numbers):</strong> 2 to 1</li>
            <li><strong>Dozen (1–12, 13–24, 25–36):</strong> 2 to 1</li>
            <li><strong>Red or Black:</strong> 1 to 1</li>
            <li><strong>Odd or Even:</strong> 1 to 1</li>
            <li><strong>Low (1–18) or High (19–36):</strong> 1 to 1</li>
          </ul>
        </div>
      </div>
    </div>
  );
}