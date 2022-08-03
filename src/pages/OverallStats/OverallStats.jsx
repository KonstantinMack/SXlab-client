import "./OverallStats.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import StatsCard from "../../components/StatsCard/StatsCard";
import SunBurst from "../../components/Charts/SunBurst/SunBurst";
import BarChart from "../../components/Charts/BarChart/BarChart";

import BetsIcon from "../../assets/icons/bets.svg";
import VolumeIcon from "../../assets/icons/volume.svg";

export default function OverallStats() {
  const selectedSport = useOutletContext();
  const [dataByToken, setDataByToken] = useState([]);
  const [dataBySport, setDataBySport] = useState([]);
  const [dataByMonth, setDataByMonth] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/site-stats-by/token-sports")
      .then((res) => setDataByToken(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/site-stats-by/sports")
      .then((res) => setDataBySport(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/site-stats-by/time?timeframe=month")
      .then((res) => setDataByMonth(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="card__container">
      <StatsCard
        image={BetsIcon}
        data={dataByToken.filter((ele) => ele.sports === selectedSport)}
        attribute={"numberOfBets"}
        text={"Number of bets placed"}
      />
      <StatsCard
        image={VolumeIcon}
        data={dataByToken.filter((ele) => ele.sports === selectedSport)}
        attribute={"totalDollarMatched"}
        text={"Total volume matched"}
      />
      <StatsCard
        image={VolumeIcon}
        data={dataBySport.filter((ele) => ele.sports === selectedSport)}
        attribute={"numUniqAddresses"}
        text={"Number of unique addresses"}
      />
      <StatsCard
        image={VolumeIcon}
        data={dataBySport.filter((ele) => ele.sports === selectedSport)}
        attribute={"numMarkets"}
        text={"Number of betting markets"}
      />
      <SunBurst data={dataByToken} />
      <BarChart data={dataByMonth} />
    </div>
  );
}
