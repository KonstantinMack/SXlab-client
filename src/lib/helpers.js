import {
  BASE_TOKEN_NAMES,
  BASE_TOKEN_DECIMALS,
  SPORTS_MAPPING,
} from "./globals";

const convertOdds = (odds) => {
  return Number.parseFloat(1 / (odds / 10 ** 20)).toFixed(2);
};

const convertStake = (stake, baseToken) => {
  return `${BASE_TOKEN_NAMES[baseToken]} ${Number.parseFloat(
    stake / 10 ** BASE_TOKEN_DECIMALS[baseToken]
  ).toFixed(2)}`;
};

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
});

const convertSportName = (sport) => {
  if (sport in SPORTS_MAPPING) {
    return SPORTS_MAPPING[sport].toLowerCase();
  }
  return sport.toLowerCase();
};

const shortenAddress = (address, numChars = 4) => {
  return address.slice(0, numChars) + "..." + address.slice(-numChars);
};

export {
  convertOdds,
  convertStake,
  convertSportName,
  shortenAddress,
  compactFormatter,
  compactCurrencyFormatter,
  percentFormatter,
};
