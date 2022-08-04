import "./MarketList.scss";

import { useState, useEffect } from "react";
import Card from "../Card/Card";
import { SPORTS } from "../../lib/globals";
import axios from "axios";

const timestampToDate = (ts) => {
  const date = new Date(ts * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
};

export default function MarketList({ selectedSport }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/site-stats-by/markets?number=10&sport=${
          selectedSport === "Other" ? SPORTS.join(",") : selectedSport
        }&other=${selectedSport === "Other"}`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [selectedSport]);

  return (
    <Card addClass={"markets__card"}>
      <h2 className="markets__title">Markets with most volume:</h2>
      <div className="markets__list">
        <div className="markets__items">
          <h3 className="markets__item--small">Rank</h3>
          <h3 className="markets__item--small">Date</h3>
          <h3 className="markets__item--small">Sports</h3>
          <h3 className="markets__item">League</h3>
          <h3 className="markets__item--large">Match</h3>
          <h3 className="markets__item--small">Bets</h3>
          <h3 className="markets__item--small">Volume</h3>
        </div>
        {data &&
          data.map((market, idx) => {
            return (
              <div className="markets__items">
                <p className="markets__item--small">{idx + 1}.</p>
                <p className="markets__item--small">
                  {timestampToDate(market.gameTime)}
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
