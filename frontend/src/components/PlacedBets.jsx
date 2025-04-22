import React from 'react';

export default function PlacedBets({ placedBets, editBetAmount, removeBet, spinWheel, clearBets, isSpinning }) {
  return (
    <div className="mt-2 bg-zinc-800 p-2 rounded text-sm">
      <div className="mb-2">
        <strong>Placed Bets:</strong>
        <div className="space-y-1 mt-2">
          {placedBets.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span>{b.bet}</span>
              <input
                type="number"
                min="1"
                value={b.amount}
                onChange={(e) => editBetAmount(i, parseInt(e.target.value, 10) || 1)}
                className="w-16 px-1 py-0.5 border rounded"
              />
              <button
                onClick={() => removeBet(i)}
                className="text-red-500 hover:underline text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`px-4 py-2 rounded text-white ${
            isSpinning ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-400 hover:bg-red-500'
          }`}
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>
        <button onClick={clearBets} className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-400">
          Clear All
        </button>
      </div>
    </div>
  );
}
