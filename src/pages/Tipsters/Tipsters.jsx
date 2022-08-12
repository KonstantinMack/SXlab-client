import "./Tipsters.scss";

import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { ReactComponent as StarIcon } from "../../assets/icons/star.svg";
import axios from "axios";

import SortIcon from "../../assets/icons/sort.svg";
import MoneyIcon from "../../assets/icons/money.svg";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Tipsters() {
  const [selectedSport, tipstersAll, accountAddress] = useOutletContext();
  const [tipsters, setTipsters] = useState([]);
  const [ascNumBets, setAscNumBets] = useState(true);
  const [ascVolume, setAscVolume] = useState(true);
  const [ascPL, setAscPL] = useState(true);
  const [ascYield, setAscYield] = useState(true);
  const [ascOdds, setAscOdds] = useState(true);
  const [ascWinPerc, setAscWinPerc] = useState(true);
  const [ascMaker, setAscMaker] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    setTipsters([]);

    if (selectedSport === "All" && tipstersAll.length) {
      setTipsters(tipstersAll);
      return;
    }

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/tipster/tipsters?sport=${selectedSport}`
      )
      .then((res) => setTipsters(res.data))
      .catch((err) => console.log(err));
  }, [selectedSport]);

  useEffect(() => {
    if (accountAddress) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/tipster/favourites?address=${accountAddress}`
        )
        .then((favs) => setFavourites(favs.data))
        .catch((err) => console.log(err));
    } else {
      setFavourites([]);
    }
  }, [accountAddress]);

  const clickHandler = (bettor) => {
    if (!accountAddress) {
      setModalIsOpen(true);
      return;
    }

    if (favourites.includes(bettor)) {
      console.log({ accountAddress });
      console.log({ bettor });
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tipster/unstar`, {
        data: {
          address: accountAddress,
          bettor,
        },
      });
      setFavourites((state) => state.filter((item) => item !== bettor));
    } else {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/tipster/star`, {
        address: accountAddress,
        bettor,
      });
      setFavourites((state) => [...state, bettor]);
    }
  };

  const LoadingScreen = (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <p>
        <Skeleton count={25} height="3rem" />
      </p>
    </SkeletonTheme>
  );

  return (
    <Card addClass="tipsters__card">
      <div className="tipsters__card-description">
        <img src={MoneyIcon} alt="money" className="tipsters__card-icon" />
        <div>
          <h1 className="tipsters__title">Tipsters</h1>
          <p>
            Can't decide what to bet on? Why not get some inspiration from
            successful wallets? Here's a ranking of the most successful wallets
            with at least 100 bets.
          </p>
        </div>
      </div>
      <ModalComponent
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <div className="tipsters__list">
        <div className="tipsters__items tipsters__items-header">
          <h3></h3>
          <div className="tipsters__items-content">
            <h3 className="tipsters__item">Rank</h3>
            <h3
              className="tipsters__item tipsters__item--sort"
              onClick={() => sortTipsters("numBets", ascNumBets, setAscNumBets)}
            >
              Num. Bets
              <img src={SortIcon} alt="sort" />
            </h3>
            <h3
              className="tipsters__item tipsters__item--sort"
              onClick={() =>
                sortTipsters("dollarStake", ascVolume, setAscVolume)
              }
            >
              Volume
              <img src={SortIcon} alt="sort" />
            </h3>
            <h3
              className="tipsters__item tipsters__item--sort"
              onClick={() => sortTipsters("dollarProfitLoss", ascPL, setAscPL)}
            >
              Profit/Loss
              <img src={SortIcon} alt="sort" />
            </h3>
            <h3
              className="tipsters__item tipsters__item--sort"
              onClick={() => sortTipsters("yield", ascYield, setAscYield)}
            >
              Yield
              <img src={SortIcon} alt="sort" />
            </h3>
            <h3
              className="tipsters__item tipsters__item--sort"
              onClick={() => sortTipsters("avgOdds", ascOdds, setAscOdds)}
            >
              Avg. Odds
              <img src={SortIcon} alt="sort" />
            </h3>
            <h3
              className="tipsters__item tipsters__item--sort"
              onClick={() =>
                sortTipsters("winningPerc", ascWinPerc, setAscWinPerc)
              }
            >
              Win %
              <img src={SortIcon} alt="sort" />
            </h3>
            <h3
              className="tipsters__item tipsters__item--sort"
              onClick={() => sortTipsters("isMaker", ascMaker, setAscMaker)}
            >
              Maker %
              <img src={SortIcon} alt="sort" />
            </h3>
          </div>
        </div>

        {!tipsters || !tipsters.length
          ? LoadingScreen
          : tipsters.slice(0, 25).map((tipster, idx) => {
              return (
                <div className="tipsters__items" key={idx}>
                  <StarIcon
                    className={
                      favourites.includes(tipster.bettor)
                        ? "tipsters__item-icon tipsters__item-icon--selected"
                        : "tipsters__item-icon"
                    }
                    onClick={() => clickHandler(tipster.bettor)}
                  />
                  <Link
                    to={`/user/${tipster.bettor}`}
                    key={tipster.bettor}
                    className="tipsters__items-content"
                  >
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
                    <p className="tipsters__item">
                      {Number.parseFloat(tipster.isMaker * 100).toFixed(0)}%
                    </p>
                  </Link>
                </div>
              );
            })}
      </div>
    </Card>
  );
}
