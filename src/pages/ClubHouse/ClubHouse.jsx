import "./ClubHouse.scss";

import axios from "axios";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useAuth, useUser, SignedIn, SignedOut } from "@clerk/clerk-react";

import { API_URL } from "../../config";
import { shortenAddress } from "../../lib/helpers";
import Card from "../../components/Card/Card";
import BetsList from "../../components/BetsList/BetsList";
import LoadingScreenWide from "../../components/LoadingScreen/LoadingScreenWide";
import TelegramNotifications from "../../components/TelegramNotifications/TelegramNotifications";

import TrophyIcon from "../../assets/icons/trophy.svg";
import { useQuery } from "@tanstack/react-query";

export default function ClubHouse() {
  const [selectedSport] = useOutletContext();
  const [selectedFavourites, setSelectedFavourites] = useState([]);
  const { userId } = useAuth();
  const { user } = useUser();

  const ownBetsQuery = useQuery(
    ["club-house", "own-bets", user?.primaryWeb3Wallet?.web3Wallet],
    () => {
      return axios
        .get(
          `${API_URL}/user-stats/address/bets?address=${user?.primaryWeb3Wallet?.web3Wallet}`
        )
        .then((res) => res.data);
    },
    {
      enabled: !!user?.primaryWeb3Wallet?.web3Wallet,
    }
  );

  const favouritesQuery = useQuery(
    ["favourites", userId],
    () => {
      return axios
        .get(`${API_URL}/tipster/favourites?address=${userId}`)
        .then((favs) => favs.data);
    },
    {
      enabled: !!userId,
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

  return (
    <>
      <SignedOut>
        <Card>
          <h2>Sorry we can't find your Club House</h2>
          <p>Please sign in first</p>
        </Card>
      </SignedOut>
      <SignedIn>
        <div className="club-house">
          <Card addClass={"club-house__overview"}>
            <img src={TrophyIcon} alt="trophy" className="club-house__icon" />
            <div>
              <h1>Welcome to your Club House</h1>
              <p>
                Here you can find currently open bets from yourself (if you've
                signed in through MetaMask) and any of the tipsters you follow.
              </p>
            </div>
          </Card>
          {ownBetsQuery.fetchStatus === "idle" &&
          ownBetsQuery.isLoading ? null : ownBetsQuery.isLoading ? (
            <LoadingScreenWide count={3} />
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

            {favouritesQuery.fetchStatus === "idle" &&
            favouritesQuery.isLoading ? null : favouritesQuery.isLoading ? (
              <LoadingScreenWide count={3} />
            ) : favouritesQuery.data.length === 0 ? (
              <p>
                You don't follow any tipsters yet, head to the{" "}
                <Link to="/tipsters">
                  <u>Tipsters</u>
                </Link>{" "}
                page and find your favourite tipsters.
              </p>
            ) : (
              <div className="club-house__tipsters-list">
                {favouritesQuery.data.map((fav) => (
                  <p
                    key={fav}
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
                    {shortenAddress(fav, 10)}
                  </p>
                ))}
              </div>
            )}
            <TelegramNotifications />
          </Card>
          {favBetsQuery.fetchStatus === "idle" &&
          favBetsQuery.isLoading ? null : favBetsQuery.isLoading ? (
            <LoadingScreenWide count={3} />
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
      </SignedIn>
    </>
  );
}
