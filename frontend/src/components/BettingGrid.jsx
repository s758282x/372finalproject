import React from 'react';

export default function BettingGrid({ toggleBet, selectedBets, getNumberColor }) {
  const rows = [
    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36], // Top row
    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35], // Middle row
    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34], // Bottom row
  ];

  const columnBets = ['col3', 'col2', 'col1'];
  const columnLabels = ['3rd Column', '2nd Column', '1st Column'];

  return (
    <div className="p-6 bg-green-900 rounded  overflow-auto">
      {/* Zero + Number Grid + Column Bets */}
      <div className="grid grid-cols-[auto_1fr_auto] gap-1 mb-4">
        {/* 0 */}
        <div className="grid grid-rows-3 gap-1">
          <div className="row-span-3">
            <button
              onClick={() => toggleBet('0')}
              className={`bg-green-600 text-white font-bold p-4 h-full w-full rounded ${
                selectedBets.includes('0') ? 'ring-4 ring-yellow-400' : ''
              }`}
            >
              0
            </button>
          </div>
        </div>

        {/* Main number grid */}
        <div className="grid grid-rows-3 grid-cols-12 gap-1">
          {rows.map((row, rowIndex) =>
            row.map((number) => (
              <button
                key={number}
                onClick={() => toggleBet(number.toString())}
                className={`text-white font-semibold p-4 rounded ${
                  getNumberColor(number) === 'red' ? 'bg-red-500' : 'bg-black'
                } ${
                  selectedBets.includes(number.toString()) ? 'ring-4 ring-yellow-400' : ''
                }`}
              >
                {number}
              </button>
            ))
          )}
        </div>

        {/* Column Bets on the right */}
        <div className="grid grid-rows-3 gap-1">
          {columnBets.map((bet, idx) => (
            <button
              key={bet}
              onClick={() => toggleBet(bet)}
              className={`bg-gray-700 text-white font-bold p-2 rounded h-full ${
                selectedBets.includes(bet) ? 'ring-4 ring-yellow-400' : ''
              }`}
            >
              {columnLabels[idx]}
            </button>
          ))}
        </div>
      </div>

      {/* Dozen Bets */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          onClick={() => toggleBet('1st12')}
          className={`bg-gray-700 text-white font-bold p-2 rounded ${
            selectedBets.includes('1st12') ? 'ring-4 ring-yellow-400' : ''
          }`}
        >
          1st 12
        </button>
        <button
          onClick={() => toggleBet('2nd12')}
          className={`bg-gray-700 text-white font-bold p-2 rounded ${
            selectedBets.includes('2nd12') ? 'ring-4 ring-yellow-400' : ''
          }`}
        >
          2nd 12
        </button>
        <button
          onClick={() => toggleBet('3rd12')}
          className={`bg-gray-700 text-white font-bold p-2 rounded ${
            selectedBets.includes('3rd12') ? 'ring-4 ring-yellow-400' : ''
          }`}
        >
          3rd 12
        </button>
      </div>

      {/* Outside Bets */}
      <div className="grid grid-cols-6 gap-2 mb-4">
        <button
          onClick={() => toggleBet('1to18')}
          className={`bg-gray-700 text-white font-bold p-2 rounded ${
            selectedBets.includes('1to18') ? 'ring-4 ring-yellow-400' : ''
          }`}
        >
          1 to 18
        </button>
        <button
          onClick={() => toggleBet('even')}
          className={`bg-gray-700 text-white font-bold p-2 rounded ${
            selectedBets.includes('even') ? 'ring-4 ring-yellow-400' : ''
          }`}
        >
          Even
        </button>
        <button
          onClick={() => toggleBet('red')}
          className={`bg-red-500 text-white font-bold p-2 rounded ${
            selectedBets.includes('red') ? 'ring-4 ring-yellow-400' : ''
          }`}
        >
          Red
        </button>
        <button
          onClick={() => toggleBet('black')}
          className={`bg-black text-white font-bold p-2 rounded ${
            selectedBets.includes('black') ? 'ring-4 ring-yellow-400' : ''
          }`}
        >
          Black
        </button>
        <button
          onClick={() => toggleBet('odd')}
          className={`bg-gray-700 text-white font-bold p-2 rounded ${
            selectedBets.includes('odd') ? 'ring-4 ring-yellow-400' : ''
          }`}
        >
          Odd
        </button>
        <button
          onClick={() => toggleBet('19to36')}
          className={`bg-gray-700 text-white font-bold p-2 rounded ${
            selectedBets.includes('19to36') ? 'ring-4 ring-yellow-400' : ''
          }`}
        >
          19 to 36
        </button>
      </div>
    </div>
  );
}
