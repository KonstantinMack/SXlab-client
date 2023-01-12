import "./BetFinder.scss";

import { useState } from "react";

import { API_URL } from "../../config";
import AddressSearchBar from "../../components/AddressSearchBar/AddressSearchBar";
import BetsListShort from "../../components/BetsListShort/BetsListShort";
import Card from "../../components/Card/Card";

import MagnifyingGlass from "../../assets/icons/magnifying-glass.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function BetFinder() {
  const [searchEventId, setSearchEventId] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    setSearchTrigger(searchEventId);
    betsQuery.refetch();
  }

  const betsQuery = useQuery(
    ["bet-finder", searchTrigger],
    () => {
      return axios
        .get(`${API_URL}/user-stats/bet-finder/bets?eventId=${searchTrigger}`)
        .then((res) => res.data);
    },
    {
      staleTime: 1000 * 5,
      enabled: !!searchTrigger,
      manual: true,
    }
  );

  return (
    <div className="bet-finder">
      <Card addClass={"user__form-card"}>
        <div className="user__description">
          <img
            src={MagnifyingGlass}
            alt="magnifying glass"
            className="user__description-icon"
          />
          <div>
            <h1>Bet Finder:</h1>
            <p>
              Want to find out which address placed a specific bet? No problem,
              just enter the event id here and find all bets and their
              corresponding addresses.
            </p>
            <p>
              The event id can be found in the URL when looking at an event on
              sx.bet, e.g. sx.bet/basketball/nba/game-lines/
              <span className="bet-finder__eventId">L9897375</span>
            </p>
          </div>
        </div>

        <AddressSearchBar
          submitHandler={submitHandler}
          searchAddress={searchEventId}
          setSearchAddress={setSearchEventId}
          name="eventId"
          buttonText="Find bets!"
          placeholder="Event id e.g. L9897375"
        />
      </Card>

      <BetsListShort data={betsQuery} title="Open bets" />
    </div>
  );
}
