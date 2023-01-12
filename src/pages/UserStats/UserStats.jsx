import "./UserStats.scss";

import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

import { API_URL } from "../../config";
import Card from "../../components/Card/Card";
import UserStatsCard from "../../components/UserStatsCard/UserStatsCard";
import ProfitChart from "../../components/Charts/ProfitChart/ProfitChart";
import UserDonutCharts from "../../components/Charts/UserDonutCharts/UserDonutCharts";
import SportsTreeMap from "../../components/Charts/SportsTreeMap/SportsTreeMap";
import UserStatsTable from "../../components/UserStatsTable/UserStatsTable";
import BetTypeBarChart from "../../components/Charts/BetTypeBarChart/BetTypeBarChart";
import BetsList from "../../components/BetsList/BetsList";
import AddressSearchBar from "../../components/AddressSearchBar/AddressSearchBar";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import MicroscopeIcon from "../../assets/icons/microscope.svg";

import axios from "axios";

import { useQuery } from "@tanstack/react-query";

export default function UserStats() {
  const [selectedSport, accountAddress] = useOutletContext();
  const [searchAddress, setSearchAddress] = useState("");

  const { address } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (address) setSearchAddress(address);
    else if (accountAddress) setSearchAddress(accountAddress);
  }, [address, accountAddress]);

  function getSportAddressQueries(selectedSport, address) {
    return Promise.all([
      axios
        .get(
          `${API_URL}/user-stats/address/stats?sport=${selectedSport}&address=${address}`
        )
        .then((res) => res.data[0]),
      axios
        .get(
          `${API_URL}/user-stats/address/type-stats?sport=${selectedSport}&address=${address}`
        )
        .then((res) => res.data),
      axios
        .get(
          `${API_URL}/user-stats/address/stats-by-date?sport=${selectedSport}&address=${address}`
        )
        .then((res) => res.data),
      axios
        .get(
          `${API_URL}/user-stats/address/stats-by-odds?sport=${selectedSport}&address=${address}`
        )
        .then((res) => res.data),

      axios
        .get(
          `${API_URL}/user-stats/address/stats-by-bet-time?sport=${selectedSport}&address=${address}`
        )
        .then((res) => res.data),
    ]);
  }

  const sportAddressQueries = useQuery(
    ["user-stats", selectedSport, address],
    () => getSportAddressQueries(selectedSport, address),
    {
      enabled: !!address,
      staleTime: 1000 * 60 * 5,
    }
  );

  function getAddressQueries(address) {
    return Promise.all([
      axios
        .get(`${API_URL}/user-stats/address/stats-by-sport?address=${address}`)
        .then((res) => res.data),
      axios
        .get(`${API_URL}/user-stats/address/bets?address=${address}`)
        .then((res) => res.data),
    ]);
  }

  const addressQueries = useQuery(
    ["user-stats", address],
    () => getAddressQueries(address),
    {
      enabled: !!address,
      staleTime: 1000 * 60 * 5,
    }
  );

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/user/${e.target.address.value}`);
  };

  if (
    (sportAddressQueries.fetchStatus === "idle" &&
      sportAddressQueries.isLoading) ||
    (addressQueries.fetchStatus === "idle" && addressQueries.isLoading)
  ) {
    return (
      <div className="user__container">
        <Card addClass={"user__form-card"}>
          <div className="user__description">
            <img
              src={MicroscopeIcon}
              alt="microscope"
              className="user__description-icon"
            />
            <div>
              <h1>Wallet Analyzer:</h1>
              <p>Take a deep dive into the nitty-gritty bits of any wallet.</p>
            </div>
          </div>

          <AddressSearchBar
            submitHandler={submitHandler}
            searchAddress={searchAddress}
            setSearchAddress={setSearchAddress}
            buttonText="Analyse wallet!"
            name="address"
          />
        </Card>
      </div>
    );
  }

  if (sportAddressQueries.isLoading || addressQueries.isLoading) {
    return <LoadingScreen />;
  }

  const [
    userStats,
    userTypeStats,
    userStatsByDate,
    userStatsByOdds,
    userStatsByBetTime,
  ] = sportAddressQueries.data;

  const [userStatsBySport, userBets] = addressQueries.data;

  console.log({ userStats });

  return (
    <div className="user__container">
      <Card addClass={"user__form-card"}>
        <div className="user__description">
          <img
            src={MicroscopeIcon}
            alt="microscope"
            className="user__description-icon"
          />
          <div>
            <h1>Wallet Analyzer:</h1>
            <p>Take a deep dive into the nitty-gritty bits of any wallet.</p>
          </div>
        </div>

        <AddressSearchBar
          submitHandler={submitHandler}
          searchAddress={searchAddress}
          setSearchAddress={setSearchAddress}
          buttonText="Analyse wallet!"
          name="address"
        />
      </Card>
      <div className="user-stats__combined">
        <UserStatsCard data={userStats} address={address} />
        <UserDonutCharts
          values={[userStats.betsWon, userStats.betsPushed, userStats.betsLost]}
          labels={["Win", "Push", "Loss"]}
          title={"Win Percentage"}
          showLegend={true}
        />

        <SportsTreeMap
          data={userStatsBySport}
          addClass={"card__sports-treemap"}
        />
      </div>
      <ProfitChart data={userStatsByDate} />
      <div className="user-stats__combined2">
        <div className="user-stats__combined2--subcontainer">
          <UserStatsTable
            data={userStatsByOdds}
            stat="oddsRange"
            label="Odds range"
          />
          <UserStatsTable
            data={userStatsByBetTime}
            stat="betTiming"
            label="Bet timing"
          />
        </div>
        <BetTypeBarChart
          data={userTypeStats}
          addClass={"user-stats__bettype-treemap"}
          height="92%"
        />
      </div>
      <BetsList
        data={userBets}
        selectedSport={selectedSport}
        title={"Open Bets"}
      />
    </div>
  );
}
