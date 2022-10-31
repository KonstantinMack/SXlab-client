import "./Tipsters.scss";

import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";

import { API_URL } from "../../config";
import Card from "../../components/Card/Card";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import LoadingScreenWide from "../../components/LoadingScreen/LoadingScreenWide";
import { ReactComponent as StarIcon } from "../../assets/icons/star.svg";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { shortenAddress } from "../../lib/helpers";

import SortIcon from "../../assets/icons/sort.svg";
import MoneyIcon from "../../assets/icons/money.svg";

export default function Tipsters() {
  const [selectedSport, accountAddress] = useOutletContext();
  const [favourites, setFavourites] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState("dollarProfitLoss");
  const [sortAsc, setSortAsc] = useState(true);

  const [numBetsFilter, setNumBetsFilter] = useState(100);
  const [yieldFilter, setYieldFilter] = useState(-100);
  const [makerFilter, setMakerFilter] = useState(101);

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

  const tipsterQuery = useQuery(["tipsters", selectedSport], () => {
    return axios
      .get(`${API_URL}/tipster/tipsters?sport=${selectedSport}`)
      .then((res) => res.data);
  });

  const sortHandler = (column) => {
    column === sortColumn ? setSortAsc((state) => !state) : setSortAsc(true);
    setSortColumn(column);
  };

  const clickHandler = (bettor) => {
    if (!accountAddress) {
      setModalIsOpen(true);
      return;
    }

    if (favourites.includes(bettor)) {
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
            <div className="tipsters__item">
              <h3 className="tipsters__item-header">Rank</h3>
            </div>
            <div className="tipsters__item">
              <h3 className="tipsters__item-header">Address</h3>
            </div>
            <div
              className="tipsters__item tipsters__item--sort"
              onClick={() => sortHandler("numBets")}
            >
              <h3 className="tipsters__item-header">Num. Bets</h3>
              <img src={SortIcon} alt="sort" />
            </div>
            <div
              className="tipsters__item tipsters__item--sort"
              onClick={() => sortHandler("dollarStake")}
            >
              <h3 className="tipsters__item-header">Volume</h3>
              <img src={SortIcon} alt="sort" />
            </div>
            <div
              className="tipsters__item tipsters__item--sort"
              onClick={() => sortHandler("dollarProfitLoss")}
            >
              <h3 className="tipsters__item-header">Profit/Loss</h3>
              <img src={SortIcon} alt="sort" />
            </div>
            <div
              className="tipsters__item tipsters__item--sort"
              onClick={() => sortHandler("yield")}
            >
              <h3 className="tipsters__item-header">Yield</h3>
              <img src={SortIcon} alt="sort" />
            </div>
            <div
              className="tipsters__item tipsters__item--sort"
              onClick={() => sortHandler("avgOdds")}
            >
              <h3 className="tipsters__item-header">Avg. Odds</h3>
              <img src={SortIcon} alt="sort" />
            </div>
            <div
              className="tipsters__item tipsters__item--sort"
              onClick={() => sortHandler("winningPerc")}
            >
              <h3 className="tipsters__item-header">Win %</h3>
              <img src={SortIcon} alt="sort" />
            </div>
            <div
              className="tipsters__item tipsters__item--sort"
              onClick={() => sortHandler("isMaker")}
            >
              <h3 className="tipsters__item-header">Maker %</h3>
              <img src={SortIcon} alt="sort" />
            </div>
          </div>
        </div>

        {tipsterQuery.isLoading ? (
          <LoadingScreenWide count={25} />
        ) : (
          tipsterQuery.data
            .filter((tipster) => {
              return (
                tipster.numBets >= numBetsFilter &&
                tipster.yield >= yieldFilter &&
                tipster.isMaker <= makerFilter / 100
              );
            })
            .sort((a, b) =>
              sortAsc
                ? b[sortColumn] - a[sortColumn]
                : a[sortColumn] - b[sortColumn]
            )
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
            })
        )}
      </div>
    </Card>
  );
}
