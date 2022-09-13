import "./UserStatsTable.scss";
import Card from "../Card/Card";
import { compactFormatter, percentFormatter } from "../../lib/helpers";

export default function UserStatsTable({ data, stat, label }) {
  return (
    <Card addClass={"stats-table__card"}>
      <h2 className="stats-table__title">Stats by {label.toLowerCase()}:</h2>
      <div className="stats-table__table">
        <div className="stats-table__table-row">
          <h3>{label}</h3>
          <h3>Num bets</h3>
          <h3>Avg odds</h3>
          <h3>Stake</h3>
          <h3>Yield</h3>
          <h3>Win percentage</h3>
        </div>
        {data.map((stats) => {
          return (
            <div className="stats-table__table-row">
              <p>{stats[stat]}</p>
              <p>{stats.betsWon + stats.betsPushed + stats.betsLost}</p>
              <p>{stats.avgOdds}</p>
              <p>$ {compactFormatter.format(stats.dollarStake)}</p>
              <p>{stats.yield} %</p>
              <p>
                {percentFormatter.format(
                  stats.betsWon / (stats.betsWon + stats.betsLost)
                )}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
