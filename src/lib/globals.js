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
  "0xe2aa35C2039Bd0Ff196A6Ef99523CC0D3972ae3e": "USDC",
  "0xA173954Cc4b1810C0dBdb007522ADbC182DaB380": "ETH",
  "0xaa99bE3356a11eE92c3f099BD7a038399633566f": "SX",
  "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063": "DAI",
};

const BASE_TOKEN_DECIMALS = {
  "0xe2aa35C2039Bd0Ff196A6Ef99523CC0D3972ae3e": 6,
  "0xA173954Cc4b1810C0dBdb007522ADbC182DaB380": 18,
  "0xaa99bE3356a11eE92c3f099BD7a038399633566f": 18,
  "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063": 18,
};

export {
  SPORTS,
  TOKENS,
  BASE_TOKEN_NAMES,
  BASE_TOKEN_DECIMALS,
  SPORTS_MAPPING,
};
