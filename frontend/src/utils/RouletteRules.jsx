
// Payout multipliers based on bet type
export const PAYOUTS = {
    number: 35,
    dozen: 2,
    column: 2,
    evenOdd: 1,
    redBlack: 1,
    highLow: 1,
  };
  
  // Get the color of a roulette number
  export const getNumberColor = (num) => {
    if (num === 0) return "green";
    const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return reds.includes(num) ? "red" : "black";
  };
  
  // Get the payout multiplier for a given bet
  export const getPayoutMultiplier = (bet) => {
    if (!isNaN(Number(bet))) return PAYOUTS.number;
    if (["1st12", "2nd12", "3rd12"].includes(bet)) return PAYOUTS.dozen;
    if (["col1", "col2", "col3"].includes(bet)) return PAYOUTS.column;
    if (["even", "odd"].includes(bet)) return PAYOUTS.evenOdd;
    if (["red", "black"].includes(bet)) return PAYOUTS.redBlack;
    if (["1to18", "19to36"].includes(bet)) return PAYOUTS.highLow;
    return 0;
  };
  
  // Check if a bet is a winner given the spin result
  export const didWin = (bet, spinResult) => {
    const num = parseInt(spinResult, 10);
    const color = getNumberColor(num);
  
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
  