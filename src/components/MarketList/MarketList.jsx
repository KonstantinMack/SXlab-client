import "./MarketList.scss";

import axios from "axios";
import { DateTime } from "luxon";

import { API_URL } from "../../config";
import { SPORTS } from "../../lib/globals";
import Card from "../Card/Card";
import LoadingScreenWide from "../LoadingScreen/LoadingScreenWide";
import { useQuery } from "@tanstack/react-query";

export default function MarketList({ selectedSport, addClass }) {
  const marketQuery = useQuery(["markets", selectedSport], () => {
    return axios
      .get(
        `${API_URL}/site-stats-by/markets?number=10&sport=${
          selectedSport === "Other" ? SPORTS.join(",") : selectedSport
        }&other=${selectedSport === "Other"}`
      )
      .then((res) => res.data);
  });

  if (marketQuery.isLoading) return <LoadingScreenWide count={10} />;

  return (
    <Card addClass={addClass}>
      <h2
        className="markets__title"
        data-tip="Money line, spread and totals markets combined"
      >
        All-time most popular markets:
      </h2>
      <div className="markets__list">
        <div className="markets__headers">
          <h3 className="markets__item--small">Rank</h3>
          <h3 className="markets__item--small">Date</h3>
          <h3 className="markets__item--small">Sports</h3>
          <h3 className="markets__item">League</h3>
          <h3 className="markets__item--large">Match</h3>
          <h3 className="markets__item--small">Bets</h3>
          <h3 className="markets__item--small">Volume</h3>
        </div>
        {marketQuery.data.map((market, idx) => {
          return (
            <div className="markets__items" key={idx}>
              <p className="markets__item--small">{idx + 1}.</p>
              <p className="markets__item--small">
                {DateTime.fromSeconds(market.gameTime).toFormat("dd-LL-yy")}
              </p>
              <p className="markets__item--small">{market.sports}</p>
              <p className="markets__item">{market.league}</p>
              <p className="markets__item--large">
                {market.teamOneName} - {market.teamTwoName}
              </p>
              <p className="markets__item--small">{market.numberOfBets}</p>
              <p className="markets__item--small">
                $ {Math.round(market.totalVolumeMatched).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
