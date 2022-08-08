import "./UserStats.scss";

import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import UserStatsCard from "../../components/UserStatsCard/UserStatsCard";
import ProfitChart from "../../components/Charts/ProfitChart/ProfitChart";
import UserDonutCharts from "../../components/Charts/UserDonutCharts/UserDonutCharts";
import SportsTreeMap from "../../components/Charts/SportsTreeMap/SportsTreeMap";
import BetsList from "../../components/BetsList/BetsList";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";
import axios from "axios";

export default function UserStats() {
  const [selectedSport, , accountAddress] = useOutletContext();
  const [searchAddress, setSearchAddress] = useState("");
  const [userStats, setUserStats] = useState();
  const [userStatsByDate, setUserStatsByDate] = useState([]);
  const [userStatsBySport, setUserStatsBySport] = useState([]);
  const [userBets, setUserBets] = useState([]);

  const { address } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (address) setSearchAddress(address);
    else if (accountAddress) setSearchAddress(accountAddress);
  }, [address, accountAddress]);

  useEffect(() => {
    if (address) {
      axios
        .get(
          `http://localhost:8080/api/user-stats/address/stats?sport=${selectedSport}&address=${address}`
        )
        .then((res) => setUserStats(res.data[0]));

      axios
        .get(
          `http://localhost:8080/api/user-stats/address/stats-by-date?sport=${selectedSport}&address=${address}`
        )
        .then((res) => setUserStatsByDate(res.data));
    }
  }, [address, selectedSport]);

  useEffect(() => {
    if (address) {
      axios
        .get(
          `http://localhost:8080/api/user-stats/address/stats-by-sport?address=${address}`
        )
        .then((res) => setUserStatsBySport(res.data));
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      axios
        .get(
          `http://localhost:8080/api/user-stats/address/bets?address=${address}`
        )
        .then((res) => setUserBets(res.data));
    }
  }, [address]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/user/${e.target.address.value}`);
  };

  return (
    <div className="user__container">
      <Card>
        <h1>Find bets by address:</h1>
        <form onSubmit={submitHandler} className="user__form">
          <input
            type="text"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            name="address"
            className="user__search"
          />
          <button className="user__search-button">
            <ArrowIcon className="user__search-button-icon" />
            Analyse wallet!
          </button>
        </form>
      </Card>
      {address && userStats && userStatsBySport && (
        <>
          <div className="user-stats__combined">
            <UserStatsCard data={userStats} address={address} />
            <UserDonutCharts
              values={[
                userStats.betsWon,
                userStats.betsPushed,
                userStats.betsLost,
              ]}
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
          <BetsList
            data={userBets}
            selectedSport={selectedSport}
            title={"Open Bets"}
          />
        </>
      )}
    </div>
  );
}
