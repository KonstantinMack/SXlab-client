import "./ClubHouse.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { API_URL } from "../config";
import Card from "../../components/Card/Card";
import BetsList from "../../components/BetsList/BetsList";

import TrophyIcon from "../../assets/icons/trophy.svg";

export default function ClubHouse() {
  const [selectedSport, , accountAddress] = useOutletContext();
  const [myOpenBets, setMyOpenBets] = useState();
  const [theirOpenBets, setTheirOpenBets] = useState();
  const [favourites, setFavourites] = useState([]);
  const [selectedFavourites, setSelectedFavourites] = useState([]);

  useEffect(() => {
    if (accountAddress) {
      axios
        .get(`${API_URL}/user-stats/address/bets?address=${accountAddress}`)
        .then((res) => setMyOpenBets(res.data))
        .catch((err) => console.log(err));

      axios
        .get(`${API_URL}/tipster/favourites?address=${accountAddress}`)
        .then((favs) => {
          setFavourites(favs.data);
          setSelectedFavourites(favs.data);
        })
        .catch((err) => console.log(err));
    }
  }, [accountAddress]);

  useEffect(() => {
    if (favourites.length) {
      const promises = favourites.map((fav) =>
        axios
          .get(`${API_URL}/user-stats/address/bets?address=${fav}`)
          .then((res) => res.data)
      );
      Promise.all(promises).then((values) => setTheirOpenBets(values.flat()));
    }
  }, [favourites]);

  if (!accountAddress) {
    return (
      <Card>
        <h2>Sorry we can't find your Club House</h2>
        <p>Please connect your MetaMask wallet</p>
      </Card>
    );
  }

  return (
    <div className="club-house">
      <Card addClass={"club-house__overview"}>
        <img src={TrophyIcon} alt="trophy" className="club-house__icon" />
        <div>
          <h1>Welcome to your Club House</h1>
          <p>
            Here you can find currently open bets from yourself and any of the
            tipsters you follow.
          </p>
        </div>
      </Card>
      <BetsList
        data={
          myOpenBets
            ? myOpenBets.sort((a, b) => a.market.gameTime - b.market.gameTime)
            : myOpenBets
        }
        selectedSport={selectedSport}
        title="My Bets"
      />
      <Card addClass={"club-house__tipsters"}>
        <div>
          <h2>My Tipsters</h2>
          <p>
            Select or deselect your tipsters to filter their currently open
            bets.
          </p>
        </div>
        <div className="club-house__tipsters-list">
          {favourites.map((fav) => (
            <p
              onClick={() =>
                setSelectedFavourites((state) =>
                  state.includes(fav)
                    ? state.filter((oldFav) => oldFav !== fav)
                    : [...state, fav]
                )
              }
              className={`club-house__tipster
              ${
                selectedFavourites.includes(fav)
                  ? "club-house__tipster--selected"
                  : "club-house__tipster--unselected"
              }`}
            >
              {fav}
            </p>
          ))}
        </div>
      </Card>
      <BetsList
        data={
          theirOpenBets
            ? theirOpenBets
                .filter((bet) => selectedFavourites.includes(bet.bettor))
                .sort((a, b) => a.market.gameTime - b.market.gameTime)
            : theirOpenBets
        }
        selectedSport={selectedSport}
        title="Tipster Bets"
      />
    </div>
  );
}
