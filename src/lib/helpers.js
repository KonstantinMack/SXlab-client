import {
  BASE_TOKEN_NAMES,
  BASE_TOKEN_DECIMALS,
  SPORTS_MAPPING,
} from "./globals";

const timestampToDate = (ts, format = "short") => {
  const date = new Date(ts * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (format === "short") return `${year}-${month}-${day}`;
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const convertOdds = (odds) => {
  return Number.parseFloat(1 / (odds / 10 ** 20)).toFixed(2);
};

const convertStake = (stake, baseToken) => {
  return `${BASE_TOKEN_NAMES[baseToken]} ${Number.parseFloat(
    stake / 10 ** BASE_TOKEN_DECIMALS[baseToken]
  ).toFixed(2)}`;
};

const convertSportName = (sport) => {
  if (sport in SPORTS_MAPPING) {
    return SPORTS_MAPPING[sport].toLowerCase();
  }
  return sport.toLowerCase();
};

export { timestampToDate, convertOdds, convertStake, convertSportName };
