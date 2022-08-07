import "./BetsList.scss";

import { convertOdds, convertSportName, convertStake } from "../../lib/helpers";
import { SPORTS } from "../../lib/globals";
import { DateTime } from "luxon";
import Card from "../Card/Card";

export default function BetsList({ data, selectedSport }) {
  let betsBySport;
  if (selectedSport === "All") {
    betsBySport = data;
  } else if (betsBySport === "Other") {
    betsBySport = data.filter((bet) => SPORTS.includes(bet.market.sportLabel));
  } else {
    betsBySport = data.filter((bet) => bet.market.sportLabel === selectedSport);
  }

  return (
    <Card addClass={"bets-list"}>
      <h2>Current bets:</h2>
      <div className="bets-list__container">
        <div className="bets-list__header">
          <h3>Date</h3>
          <h3>Sport</h3>
          <h3>League</h3>
          <h3>Match</h3>
          <h3>Bet</h3>
          <h3>Odds</h3>
          <h3>Stake</h3>
        </div>
        {betsBySport.map((bet) => {
          return (
            <a
              href={`https://sx.bet/${convertSportName(
                bet.market.sportLabel
              )}/${bet.market.leagueLabel
                .toLowerCase()
                .split(" ")
                .join("-")}/game-lines/${bet.market.sportXeventId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bets-list__item"
            >
              <p>
                {DateTime.fromSeconds(bet.market.gameTime).toFormat(
                  "dd-LL-yy T"
                )}
              </p>
              <p>{bet.market.sportLabel}</p>
              <p>{bet.market.leagueLabel}</p>
              <p>
                {bet.market.teamOneName} vs. {bet.market.teamTwoName}
              </p>
              <p>
                {bet.bettingOutcomeOne
                  ? bet.market.outcomeOneName
                  : bet.market.outcomeTwoName}
              </p>
              <p>{convertOdds(bet.odds)}</p>
              <p>{convertStake(bet.stake, bet.baseToken)}</p>
            </a>
          );
        })}
      </div>
    </Card>
  );
}
