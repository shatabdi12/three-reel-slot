// symbols.js

export const SYMBOL_NAMES = [
  "Coin.png",
  "High1.png",
  "High2.png",
  "High3.png",
  "Low1.png",
  "Low2.png",
  "Low3.png",
];

export function randomSymbol() {
  const idx = Math.floor(Math.random() * SYMBOL_NAMES.length);
  return SYMBOL_NAMES[idx];
}
