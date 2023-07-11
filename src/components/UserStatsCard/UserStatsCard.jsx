import "./UserStatsCard.scss";
import axios from "axios";
import { API_URL } from "../../config";
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import FavStar from "../FavStar/FavStar";

export default function UserStatsCard({ data, address }) {
  const { userId } = useAuth();

  return (
    <Card addClass={"user-stats-card"}>
      <h2>Bets Analysis for wallet:</h2>
      <div className="user-stats-card__address-wrapper">
        <FavStar userId={userId} bettor={address} />
        <a
          href={`https://explorer.sx.technology/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="user-stats-card__address"
        >
          {`${address.slice(0, 6)}...${address.slice(-6)}`}
        </a>
      </div>

      <div className="user-stats-card__container">
        <div className="user-stats-card__item">
          <h3>Number of bets:</h3>
          <p className="user-stats-card__stat">
            {data.numBets.toLocaleString()}
          </p>
        </div>
        <div className="user-stats-card__item">
          <h3>Average Odds:</h3>
          <p className="user-stats-card__stat">{data.avgOdds}</p>
        </div>
        <div className="user-stats-card__item">
          <h3>Total Stake:</h3>
          <p className="user-stats-card__stat">
            $ {data.dollarStake.toLocaleString()}
          </p>
        </div>
        <div className="user-stats-card__item">
          <h3>Average Stake:</h3>
          <p className="user-stats-card__stat">
            $ {data.avgDollarStake.toLocaleString()}
          </p>
        </div>
        <div className="user-stats-card__item">
          <h3>Profit/Loss:</h3>
          <p
            className={`user-stats-card__stat ${
              data.dollarProfitLoss >= 0
                ? "user-stats-card__stat--profit"
                : "user-stats-card__stat--loss"
            }`}
          >
            $ {data.dollarProfitLoss.toLocaleString()}
          </p>
        </div>
        <div className="user-stats-card__item">
          <h3>Yield:</h3>
          <p
            className={`user-stats-card__stat ${
              data.yield >= 0
                ? "user-stats-card__stat--profit"
                : "user-stats-card__stat--loss"
            }`}
          >
            {data.yield} %
          </p>
        </div>
      </div>
    </Card>
  );
}
