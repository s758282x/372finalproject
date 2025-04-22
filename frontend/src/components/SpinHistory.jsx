import React from 'react';

export default function SpinHistory({ spinHistory }) {
  return (
    <div className="mb-4 p-2 bg-zinc-800 rounded shadow text-white">
      <h2 className="font-semibold">Last Spins:</h2>
      <div className="flex gap-2 overflow-x-auto mt-2">
        {spinHistory.length ? spinHistory.map((r, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              r.color === 'red' ? 'bg-red-500' : r.color === 'black' ? 'bg-black' : 'bg-green-600'
            }`}
          >
            {r.number}
          </div>
        )) : <div>No spins yet</div>}
      </div>
    </div>
  );
}