import "./Tipsters.scss";

import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";

import { API_URL } from "../../config";
import Card from "../../components/Card/Card";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { ReactComponent as StarIcon } from "../../assets/icons/star.svg";
import axios from "axios";
import { shortenAddress } from "../../lib/helpers";

import SortIcon from "../../assets/icons/sort.svg";
import MoneyIcon from "../../assets/icons/money.svg";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Tipsters() {
  const [selectedSport, accountAddress] = useOutletContext();
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

  const [numBetsFilter, setNumBetsFilter] = useState(100);
  const [yieldFilter, setYieldFilter] = useState(-100);
  const [makerFilter, setMakerFilter] = useState(101);

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
    axios
      .get(`${API_URL}/tipster/tipsters?sport=${selectedSport}`)
      .then((res) => setTipsters(res.data))
      .catch((err) => console.log(err));
  }, [selectedSport]);

  useEffect(() => {
    if (accountAddress) {
      axios
        .get(`${API_URL}/tipster/favourites?address=${accountAddress}`)
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
      axios.delete(`${API_URL}/tipster/unstar`, {
        data: {
          address: accountAddress,
          bettor,
        },
      });
      setFavourites((state) => state.filter((item) => item !== bettor));
    } else {
      axios.post(`${API_URL}/tipster/star`, {
        address: accountAddress,
        bettor,
      });
      setFavourites((state) => [...state, bettor]);
    }
  };

  const checkAndSetNumber = (value, setter, defaultValue) => {
    if (!value) {
      setter(defaultValue);
    } else {
      setter(Number(value));
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
          <p>
            Click into a wallet to see a further breakdown of their bets, or
            star them to see a list of all open bets from your starred tipsters
            in your clubhouse section (only visible after you've connected your
            wallet).
          </p>
        </div>
      </div>
      <ModalComponent
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <div className="tipsters__filter">
        <label htmlFor="numBets" className="tipsters__filter-text">
          Min. number of bets:
          <input
            type="text"
            name="numBets"
            placeholder="e.g. 1000"
            className={`tipsters__filter-input ${
              isNaN(numBetsFilter) ? "tipsters__filter-input-error--border" : ""
            }`}
            onChange={(e) =>
              checkAndSetNumber(e.target.value, setNumBetsFilter, 0)
            }
          />
          <p
            className={
              isNaN(numBetsFilter)
                ? "tipsters__filter-input-error"
                : "tipsters__filter-input-error--hidden"
            }
          >
            Only numbers work as input <br /> (has to be greater than 100)
          </p>
        </label>
        <label htmlFor="yield" className="tipsters__filter-text">
          Min. yield %:
          <input
            type="text"
            name="yield"
            placeholder="e.g. 5"
            className={`tipsters__filter-input ${
              isNaN(yieldFilter) ? "tipsters__filter-input-error--border" : ""
            }`}
            onChange={(e) =>
              checkAndSetNumber(e.target.value, setYieldFilter, -100)
            }
          />
          <p
            className={
              isNaN(yieldFilter)
                ? "tipsters__filter-input-error"
                : "tipsters__filter-input-error--hidden"
            }
          >
            Only numbers work as input
          </p>
        </label>
        <label htmlFor="maker" className="tipsters__filter-text">
          Max. maker %:
          <input
            type="text"
            name="maker"
            placeholder="e.g. 20"
            className={`tipsters__filter-input ${
              isNaN(makerFilter) ? "tipsters__filter-input-error--border" : ""
            }`}
            onChange={(e) =>
              checkAndSetNumber(e.target.value, setMakerFilter, 101)
            }
          />
          <p
            className={
              isNaN(makerFilter)
                ? "tipsters__filter-input-error"
                : "tipsters__filter-input-error--hidden"
            }
          >
            Only numbers work as input
          </p>
        </label>
      </div>
      <div className="tipsters__list">
        <div className="tipsters__items tipsters__items-header">
          <div></div>
          <div className="tipsters__items-content">
            <h3 className="tipsters__item">Rank</h3>
            <h3 className="tipsters__item">Address</h3>
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
          : tipsters
              .filter((tipster) => {
                return (
                  tipster.numBets >= numBetsFilter &&
                  tipster.yield >= yieldFilter &&
                  tipster.isMaker <= makerFilter / 100
                );
              })
              .slice(0, 25)
              .map((tipster, idx) => {
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
                      <p className="tipsters__item">
                        {shortenAddress(tipster.bettor)}
                      </p>
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
