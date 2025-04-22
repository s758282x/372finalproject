// This function takes a number as input and returns a color based on the number.
export const getNumberColor = (num) => {
  if (num === 0) return "green";
  const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  return reds.includes(num) ? "red" : "black";
};
