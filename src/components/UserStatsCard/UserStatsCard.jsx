import "./UserStatsCard.scss";

import Card from "../Card/Card";

export default function UserStatsCard({ data, address }) {
  return (
    <Card addClass={"user-stats-card"}>
      <h2>
        Bets Analysis for wallet{" "}
        <a
          href={`https://polygonscan.com/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {address}
        </a>
      </h2>
      <div className="user-stats-card__container">
        <div className="user-stats-card__item">
          <h3>Number of bets:</h3>
          <p className="user-stats-card__stat">{data.numBets}</p>
        </div>
        <div className="user-stats-card__item">
          <h3>Average Odds:</h3>
          <p className="user-stats-card__stat">{data.avgOdds}</p>
        </div>
        <div className="user-stats-card__item">
          <h3>Average Stake:</h3>
          <p className="user-stats-card__stat">$ {data.avgDollarStake}</p>
        </div>
        <div className="user-stats-card__item">
          <h3>Total Stake:</h3>
          <p className="user-stats-card__stat">$ {data.dollarStake}</p>
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
            $ {data.dollarProfitLoss}
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
