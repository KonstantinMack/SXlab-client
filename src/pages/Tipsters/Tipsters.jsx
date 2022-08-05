import "./Tipsters.scss";

import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import axios from "axios";

export default function Tipsters() {
  const [selectedSport, setSelectedSport] = useOutletContext();
  const [tipsters, setTipsters] = useState([]);
  const [ascNumBets, setAscNumBets] = useState(true);
  const [ascVolume, setAscVolume] = useState(true);
  const [ascPL, setAscPL] = useState(true);
  const [ascYield, setAscYield] = useState(true);
  const [ascOdds, setAscOdds] = useState(true);
  const [ascWinPerc, setAscWinPerc] = useState(true);
  const [ascMaker, setAscMaker] = useState(true);

  const sortTipsters = (sortBy, asc, ascSetter) => {
    if (asc) {
      ascSetter((state) => !state);
      setTipsters(tipsters.sort((a, b) => b[sortBy] - a[sortBy]));
    } else {
      ascSetter((state) => !state);
      setTipsters(tipsters.sort((a, b) => a[sortBy] - b[sortBy]));
    }
  };

  useEffect(() => {
    setSelectedSport("All");
  }, []);

  useEffect(() => {
    setTipsters([]);

    axios
      .get(
        `http://localhost:8080/api/user-stats/tipsters?sport=${selectedSport}`
      )
      .then((res) => setTipsters(res.data))
      .catch((err) => console.log(err));
  }, [selectedSport]);

  if (!tipsters.length) return <LoadingScreen />;

  return (
    <Card addClass="tipsters__card">
      <h1 className="tipsters__title">Tipsters</h1>
      <div className="tipsters__list">
        <div className="tipsters__items">
          <h3 className="tipsters__item">Rank</h3>
          <h3
            className="tipsters__item tipsters__item--sort"
            onClick={() => sortTipsters("numBets", ascNumBets, setAscNumBets)}
          >
            Num. Bets
          </h3>
          <h3
            className="tipsters__item tipsters__item--sort"
            onClick={() => sortTipsters("dollarStake", ascVolume, setAscVolume)}
          >
            Volume
          </h3>
          <h3
            className="tipsters__item tipsters__item--sort"
            onClick={() => sortTipsters("dollarProfitLoss", ascPL, setAscPL)}
          >
            Profit/Loss
          </h3>
          <h3
            className="tipsters__item tipsters__item--sort"
            onClick={() => sortTipsters("yield", ascYield, setAscYield)}
          >
            Yield
          </h3>
          <h3
            className="tipsters__item tipsters__item--sort"
            onClick={() => sortTipsters("avgOdds", ascOdds, setAscOdds)}
          >
            Avg. Odds
          </h3>
          <h3
            className="tipsters__item tipsters__item--sort"
            onClick={() =>
              sortTipsters("winningPerc", ascWinPerc, setAscWinPerc)
            }
          >
            Win %
          </h3>
          <h3
            className="tipsters__item tipsters__item--sort"
            onClick={() => sortTipsters("isMaker", ascMaker, setAscMaker)}
          >
            Maker %
          </h3>
        </div>
        {tipsters.slice(0, 25).map((tipster, idx) => {
          return (
            <Link to={`/user/${tipster.bettor}`}>
              <div className="tipsters__items" key={tipster.bettor}>
                <p className="tipsters__item">{idx + 1}.</p>
                <p className="tipsters__item">{tipster.numBets}</p>
                <p className="tipsters__item">
                  $ {tipster.dollarStake.toLocaleString()}
                </p>
                <p
                  className={`tipsters__item ${
                    tipster.dollarProfitLoss >= 0
                      ? "tipsters__item--profit"
                      : "tipsters__item--loss"
                  }`}
                >
                  $ {tipster.dollarProfitLoss.toLocaleString()}
                </p>
                <p
                  className={`tipsters__item ${
                    tipster.yield >= 0
                      ? "tipsters__item--profit"
                      : "tipsters__item--loss"
                  }`}
                >
                  {tipster.yield}%
                </p>
                <p className="tipsters__item">{tipster.avgOdds}</p>
                <p className="tipsters__item">{tipster.winningPerc}%</p>
                <p className="tipsters__item">{tipster.isMaker * 100}%</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
