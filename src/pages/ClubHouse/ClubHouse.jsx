import "./ClubHouse.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import Card from "../../components/Card/Card";
import BetsList from "../../components/BetsList/BetsList";

import TrophyIcon from "../../assets/icons/trophy.svg";

export default function ClubHouse() {
  const [selectedSport, , accountAddress] = useOutletContext();
  const [myOpenBets, setMyOpenBets] = useState();
  const [theirOpenBets, setTheirOpenBets] = useState();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (accountAddress) {
      axios
        .get(
          `http://localhost:8080/api/user-stats/address/bets?address=${accountAddress}`
        )
        .then((res) => setMyOpenBets(res.data))
        .catch((err) => console.log(err));

      axios
        .get(
          `http://localhost:8080/api/tipster/favourites?address=${accountAddress}`
        )
        .then((favs) => setFavourites(favs.data))
        .catch((err) => console.log(err));
    }
  }, [accountAddress]);

  useEffect(() => {
    if (favourites.length) {
      const promises = favourites.map((fav) =>
        axios
          .get(
            `http://localhost:8080/api/user-stats/address/bets?address=${fav}`
          )
          .then((res) => res.data)
      );
      Promise.all(promises).then((values) => setTheirOpenBets(values.flat()));
    }
  }, [favourites]);

  if (!accountAddress) {
    return (
      <Card>
        <h2>Soory we can't find your Club House</h2>
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
      <BetsList
        data={
          theirOpenBets
            ? theirOpenBets.sort(
                (a, b) => a.market.gameTime - b.market.gameTime
              )
            : theirOpenBets
        }
        selectedSport={selectedSport}
        title="Tipster Bets"
      />
    </div>
  );
}
