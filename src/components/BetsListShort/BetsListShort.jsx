import "./BetsListShort.scss";

import { convertOdds, convertSportName, convertStake } from "../../lib/helpers";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import LoadingScreenWide from "../LoadingScreen/LoadingScreenWide";

export default function BetsListShort({ data }) {
  return (
    <>
      {data.fetchStatus === "idle" && data.isLoading ? null : data.isLoading ? (
        <LoadingScreenWide count={3} />
      ) : data.data.length ? (
        <Card addClass={"bets-list-short"}>
          <a
            href={`https://sx.bet/${convertSportName(
              data.data[0]?.market.sportLabel
            )}/${data.data[0]?.market.leagueLabel
              .toLowerCase()
              .split(" ")
              .join("-")}/game-lines/${data.data[0]?.market.sportXeventId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.data.length ? (
              <h2>
                {`${data.data[0]?.market.teamOneName} vs. ${data.data[0]?.market.teamTwoName}`}
              </h2>
            ) : (
              "No open bets"
            )}
          </a>
          <div className="bets-list-short__container">
            <div className="bets-list-short__header">
              <h3>Bet</h3>
              <h3>Odds</h3>
              <h3>Stake</h3>
              <h3>Address</h3>
              <h3>Maker</h3>
            </div>

            {data.data.map((bet, idx) => {
              return (
                <Link
                  to={`/user/${bet.bettor}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={idx}
                  className="bets-list-short__item"
                >
                  <div>
                    <h4 className="bets-list-short__item--phone">Bet</h4>
                    <p className="bets-list__item-text">
                      {bet.bettingOutcomeOne
                        ? bet.market.outcomeOneName
                        : bet.market.outcomeTwoName}
                    </p>
                  </div>
                  <div>
                    <h4 className="bets-list-short__item--phone">Odds</h4>
                    <p className="bets-list__item-text">
                      {convertOdds(bet.odds)}
                    </p>
                  </div>
                  <div>
                    <h4 className="bets-list-short__item--phone">Stake</h4>
                    <p className="bets-list__item-text">
                      {convertStake(bet.stake, bet.baseToken)}
                    </p>
                  </div>
                  <div>
                    <h4 className="bets-list-short__item--phone">Address</h4>
                    <p className="bets-list__item-text bets-list-short__item-ellipsis">
                      {bet.bettor.slice(0, 10)}...{bet.bettor.slice(-5)}
                    </p>
                  </div>
                  <div>
                    <h4 className="bets-list-short__item--phone">Maker</h4>
                    <p className="bets-list__item-text bets-list-short__item-ellipsis">
                      {Number(bet.maker)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>
      ) : (
        <Card addClass={"bets-list-short"}>
          <p>There are no open bets for this event</p>
        </Card>
      )}
    </>
  );
}
