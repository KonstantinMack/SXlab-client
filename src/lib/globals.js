const SPORTS = [
  "All",
  "Baseball",
  "Basketball",
  "Crypto",
  "E Sports",
  "Football",
  "Hockey",
  "Mixed Martial Arts",
  "Racing",
  "Soccer",
  "Tennis",
  "Other",
];

const SPORTS_MAPPING = {
  "Mixed Martial Arts": "MMA",
  "E Sports": "ESports",
  "Rugby Union": "Rugby-Union",
  "Rugby League": "Rugby-League",
  "Horse Racing": "Horse-Racing",
  "Daily Parlays": "Daily-Parleys",
};

const TOKENS = ["DAI", "USDC", "ETH", "SX"];

const BASE_TOKEN_NAMES = {
  "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174": "USDC",
  "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619": "ETH",
  "0x840195888Db4D6A99ED9F73FcD3B225Bb3cB1A79": "SX",
  "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063": "DAI",
};

const BASE_TOKEN_DECIMALS = {
  "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174": 6,
  "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619": 18,
  "0x840195888Db4D6A99ED9F73FcD3B225Bb3cB1A79": 18,
  "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063": 18,
};

export {
  SPORTS,
  TOKENS,
  BASE_TOKEN_NAMES,
  BASE_TOKEN_DECIMALS,
  SPORTS_MAPPING,
};
