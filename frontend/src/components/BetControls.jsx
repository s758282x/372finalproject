import React from 'react';

export default function BetControls({
  betAmount,
  setBetAmount,
  selectedBets,
  placeBets,
  clearSelectedBets,
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center text-white">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <label>Bet Amount:</label>
        <input
          type="number"
          min="1"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className="border px-2 py-1 w-20"
        />
        {[5, 10, 25, 100].map((a) => (
          <button
            key={a}
            onClick={() => setBetAmount(a.toString())}
            className="px-3 py-1 bg-blue-400 rounded"
          >
            ${a}
          </button>
        ))}
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={placeBets}
          disabled={!selectedBets.length}
          className="px-4 py-2 bg-green-400 rounded disabled:opacity-50"
        >
          Place Bet
        </button>
        <button
          onClick={clearSelectedBets}
          disabled={!selectedBets.length}
          className="px-4 py-2 bg-gray-500 rounded disabled:opacity-50"
        >
          Clear
        </button>
      </div>
      <div className="w-full mt-2 text-sm">
        Selected: {selectedBets.join(', ') || 'None'}
      </div>
    </div>
  );
}