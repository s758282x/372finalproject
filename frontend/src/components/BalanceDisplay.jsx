import React from 'react';

export default function BalanceDisplay({ balance, showHistory, toggleHistory }) {
  return (
    <div className="flex flex-col items-center mb-6 text-white">
      <div className="text-4xl font-bold mb-2">
        Balance:{" "}
        <span className="text-green-700">
          {Number(balance).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          })}
        </span>
      </div>
      <button
        onClick={toggleHistory}
        className="text-blue-500 underline text-sm hover:text-blue-700"
      >
        {showHistory ? "Hide History" : "Show History"}
      </button>
    </div>
  );
}
