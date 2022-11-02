import "./OverallStats.scss";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import StatsCard from "../../components/StatsCard/StatsCard";
import SunBurst from "../../components/Charts/SunBurst/SunBurst";
import BarChart from "../../components/Charts/BarChart/BarChart";
import BetTypeBarChart from "../../components/Charts/BetTypeBarChart/BetTypeBarChart";
import AvgBetCard from "../../components/AvgBetCard/AvgBetCard";
import MarketList from "../../components/MarketList/MarketList";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { API_URL } from "../../config";
import { SPORTS } from "../../lib/globals";

import BetsIcon from "../../assets/icons/bets.svg";
import VolumeIcon from "../../assets/icons/volume.svg";
import AddressIcon from "../../assets/icons/address-book.svg";
import MarketsIcon from "../../assets/icons/markets.svg";
import { useQuery } from "@tanstack/react-query";

export default function OverallStats() {
  const [selectedSport] = useOutletContext();

  const findSport = (obj, sport) => {
    if (sport === "Other") {
      return !SPORTS.includes(obj.sports);
    } else {
      return obj.sports === sport;
    }
  };

  function getDataIndependent() {
    return Promise.all([
      axios
        .get(`${API_URL}/site-stats-by/token-sports`)
        .then((res) => res.data),
      axios.get(`${API_URL}/site-stats-by/sports`).then((res) => res.data),
      axios
        .get(`${API_URL}/site-stats-by/bet-type?sports=${SPORTS.join(",")}`)
        .then((res) => res.data),
    ]);
  }

  const dataIndQuery = useQuery(
    ["overall-stats", "independent"],
    getDataIndependent,
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const dataDepQuery = useQuery(
    ["overall-stats", selectedSport],
    () => {
      return axios
        .get(
          `${API_URL}/site-stats-by/time?timeframe=month&sport=${selectedSport}`
        )
        .then((res) => res.data);
    },
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  if (dataIndQuery.isLoading || dataDepQuery.isLoading) {
    return <LoadingScreen />;
  }

  const [dataByToken, dataBySport, dataByBetType] = dataIndQuery.data;
  const dataByMonth = dataDepQuery.data;

  return (
    <div>
      <div className="card__container">
        <StatsCard
          image={VolumeIcon}
          data={dataByToken.filter((ele) => findSport(ele, selectedSport))}
          attribute={"totalDollarMatched"}
          text={"Total volume matched"}
          tooltip="Total volume in $ using exchange rates <br> from the time of the bets "
          addClass="card__volume"
        />
        <StatsCard
          image={BetsIcon}
          data={dataByToken.filter((ele) => findSport(ele, selectedSport))}
          attribute={"numberOfBets"}
          text={"Number of bets placed"}
          tooltip="Each bet counts, so if an order gets filled it counts as two bets, <br> one from the maker and one from the taker."
          addClass="card__num-bets"
        />
        <StatsCard
          image={AddressIcon}
          data={dataBySport.filter((ele) => findSport(ele, selectedSport))}
          attribute={"numUniqAddresses"}
          text={"Unique addresses"}
          tooltip="Number of unique addresses <br> that have places at least one bet"
          addClass="card__num-addresses"
        />
        <StatsCard
          image={MarketsIcon}
          data={dataBySport.filter((ele) => findSport(ele, selectedSport))}
          attribute={"numMarkets"}
          text={"Number of betting markets"}
          tooltip="A single game can have up to <br> three markets (i.e. ML, Spread, Totals)"
          addClass="card__num-markets"
        />
        <AvgBetCard
          data={dataByToken.filter((ele) => findSport(ele, selectedSport))}
          other={selectedSport === "Other"}
          addClass={"card__avg-betsize"}
        />
        <SunBurst data={dataByToken} addClass="card__sunburst" />
        <BarChart data={dataByMonth} addClass="card__barchart" />
        <MarketList
          selectedSport={selectedSport}
          addClass="card__market-list"
        />
        <BetTypeBarChart
          data={dataByBetType.filter((ele) => ele.sports === selectedSport)}
          addClass={"card__treemap"}
          height="95%"
        />
      </div>
    </div>
  );
}
