import React from 'react';

export default function SpinResult({ isSpinning, gameStage, spinResult, totalWinnings }) {
  return (
    <div className="text-center mb-4 p-4 bg-zinc-800 text-white rounded shadow relative">
      {/* Spinning Overlay */}
      {isSpinning && (
        <div className="absolute inset-0 bg-zinc-800 text-white bg-opacity-75 flex items-center justify-center">
          Spinning...
        </div>
      )}

      {/* Spin Result */}
      {gameStage === 'result' && !isSpinning && (
        <>
          <div className="mb-4 flex items-center justify-center">
            {/* Styled Circle for Result (Bigger Ball/Number) */}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${
                spinResult.color === 'red'
                  ? 'bg-red-500'
                  : spinResult.color === 'black'
                  ? 'bg-black'
                  : 'bg-green-600'
              }`}
            >
              <span className="text-2xl font-bold">{spinResult.number}</span>
            </div>
          </div>

          {/* Winnings or Loss Message */}
          {totalWinnings > 0 ? (
            <div className="text-green-600 text-lg font-semibold">
              You won ${totalWinnings}!
            </div>
          ) : (
            <div className="text-red-600 text-lg font-semibold">
              No wins this time
            </div>
          )}
        </>
      )}
    </div>
  );
}