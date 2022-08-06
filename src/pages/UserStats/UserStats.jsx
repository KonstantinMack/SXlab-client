import "./UserStats.scss";

import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import UserStatsCard from "../../components/UserStatsCard/UserStatsCard";
import ProfitChart from "../../components/Charts/ProfitChart/ProfitChart";
import UserDonutCharts from "../../components/Charts/UserDonutCharts/UserDonutCharts";
import axios from "axios";

export default function UserStats() {
  const [selectedSport, , accountAddress] = useOutletContext();
  const [searchAddress, setSearchAddress] = useState("");
  const [userStats, setUserStats] = useState({});
  const [userStatsByDate, setUserStatsByDate] = useState([]);
  const [userStatsBySport, setUserStatsBySport] = useState([]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/user/${e.target.address.value}`);
  };

  return (
    <div className="user__container">
      <Card>
        <h1>Find bets by address:</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            name="address"
          />
          <button>Analyse wallet!</button>
        </form>
      </Card>
      {address && userStats && userStatsBySport && (
        <>
          <UserStatsCard data={userStats} address={address} />
          <ProfitChart data={userStatsByDate} />
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
          <UserDonutCharts
            values={userStatsBySport.map((obj) => obj.dollarStake)}
            labels={userStatsBySport.map((obj) => obj.sports)}
            title={"Betting volume by sport"}
            showLegend={false}
          />
        </>
      )}
    </div>
  );
}
