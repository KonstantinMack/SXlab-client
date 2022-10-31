import "./ClubHouse.scss";

import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { API_URL } from "../../config";
import Card from "../../components/Card/Card";
import BetsList from "../../components/BetsList/BetsList";

import TrophyIcon from "../../assets/icons/trophy.svg";
import { useQuery } from "@tanstack/react-query";

export default function ClubHouse() {
  const [selectedSport, accountAddress] = useOutletContext();
  const [selectedFavourites, setSelectedFavourites] = useState([]);

  const ownBetsQuery = useQuery(
    ["club-house", "own-bets", accountAddress],
    () => {
      return axios
        .get(`${API_URL}/user-stats/address/bets?address=${accountAddress}`)
        .then((res) => res.data);
    },
    {
      enabled: !!accountAddress,
    }
  );

  const favouritesQuery = useQuery(
    ["club-house", "favourites", accountAddress],
    () => {
      return axios
        .get(`${API_URL}/tipster/favourites?address=${accountAddress}`)
        .then((favs) => favs.data);
    },
    {
      enabled: !!accountAddress,
    }
  );

  const favourites = favouritesQuery.data;

  const favBetsQuery = useQuery(
    ["club-house", "fav-bets", favourites],
    () => {
      const promises = favourites.map((fav) =>
        axios
          .get(`${API_URL}/user-stats/address/bets?address=${fav}`)
          .then((res) => res.data)
      );
      return Promise.all(promises).then((values) => values.flat());
    },
    {
      enabled: !!favourites,
    }
  );

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
      {ownBetsQuery.fetchStatus === "idle" &&
      ownBetsQuery.isLoading ? null : ownBetsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <BetsList
          data={ownBetsQuery.data.sort(
            (a, b) => a.market.gameTime - b.market.gameTime
          )}
          selectedSport={selectedSport}
          title="My Bets"
        />
      )}
      <Card addClass={"club-house__tipsters"}>
        <div>
          <h2>My Tipsters</h2>
          <p>
            Select or deselect your tipsters to filter their currently open
            bets.
          </p>
        </div>
        <div className="club-house__tipsters-list">
          {favouritesQuery.fetchStatus === "idle" &&
          favouritesQuery.isLoading ? null : favouritesQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            favouritesQuery.data.map((fav) => (
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
                !selectedFavourites.includes(fav)
                  ? "club-house__tipster--selected"
                  : "club-house__tipster--unselected"
              }`}
              >
                {fav}
              </p>
            ))
          )}
        </div>
      </Card>
      {favBetsQuery.fetchStatus === "idle" &&
      favBetsQuery.isLoading ? null : favBetsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <BetsList
          data={favBetsQuery.data
            .filter((bet) => !selectedFavourites.includes(bet.bettor))
            .sort((a, b) => a.market.gameTime - b.market.gameTime)}
          selectedSport={selectedSport}
          title="Tipster Bets"
        />
      )}
    </div>
  );
}
