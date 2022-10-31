import "./BetsList.scss";

import { convertOdds, convertSportName, convertStake } from "../../lib/helpers";
import { SPORTS } from "../../lib/globals";
import { DateTime } from "luxon";
import Card from "../Card/Card";
import LoadingScreenWide from "../LoadingScreen/LoadingScreenWide";

export default function BetsList({ data, selectedSport, title }) {
  let betsBySport;
  if (data) {
    if (selectedSport === "All") {
      betsBySport = data;
    } else if (selectedSport === "Other") {
      betsBySport = data.filter(
        (bet) => !SPORTS.includes(bet.market.sportLabel)
      );
    } else {
      betsBySport = data.filter(
        (bet) => bet.market.sportLabel === selectedSport
      );
    }
  }

  return (
    <Card addClass={"bets-list"}>
      <h2>{title}</h2>
      <div className="bets-list__container">
        <div className="bets-list__header">
          <h3>Date</h3>
          <h3>Sport</h3>
          <h3>League</h3>
          <h3>Match</h3>
          <h3>Bet</h3>
          <h3>Odds</h3>
          <h3>Stake</h3>
          <h3>Maker</h3>
        </div>
        {betsBySport ? (
          betsBySport.map((bet, idx) => {
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
                key={idx}
              >
                <p className="bets-list__item-text">
                  {DateTime.fromSeconds(bet.market.gameTime).toFormat(
                    "dd-LL-yy T"
                  )}
                </p>
                <p className="bets-list__item-text">{bet.market.sportLabel}</p>
                <p className="bets-list__item-text">{bet.market.leagueLabel}</p>
                <p className="bets-list__item-text">
                  {bet.market.teamOneName} vs. {bet.market.teamTwoName}
                </p>
                <p className="bets-list__item-text">
                  {bet.bettingOutcomeOne
                    ? bet.market.outcomeOneName
                    : bet.market.outcomeTwoName}
                </p>
                <p className="bets-list__item-text">{convertOdds(bet.odds)}</p>
                <p className="bets-list__item-text">
                  {convertStake(bet.stake, bet.baseToken)}
                </p>
                <p className="bets-list__item-text">{Number(bet.maker)}</p>
              </a>
            );
          })
        ) : (
          <LoadingScreenWide count={5} />
        )}
      </div>
    </Card>
  );
}
