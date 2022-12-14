import "./AvgBetCard.scss";

import { TOKENS } from "../../lib/globals";
import Card from "../Card/Card";

import EthLogo from "../../assets/icons/eth-logo.svg";
import DaiLogo from "../../assets/icons/dai-logo.svg";
import UsdcLogo from "../../assets/icons/usdc-logo.svg";
import SXLogo from "../../assets/icons/sx-logo.webp";

import ReactTooltip from "react-tooltip";

const logos = {
  USDC: UsdcLogo,
  ETH: EthLogo,
  DAI: DaiLogo,
  SX: SXLogo,
};

export default function AvgBetCard({ data, other, addClass }) {
  const dataOther = [];

  if (other) {
    for (const token of TOKENS) {
      let totalMatched = 0;
      let totalBets = 0;
      for (const obj of data) {
        if (obj.token === token) {
          totalMatched += obj.totalDollarMatched;
          totalBets += +obj.numberOfBets;
        }
      }
      if (totalBets) {
        dataOther.push({
          token: token,
          avgDollarBetSize: totalMatched / totalBets,
        });
      }
    }
    data = dataOther;
  }

  return (
    <Card addClass={`betsize__card ${addClass || ""}`}>
      <h2 data-tip="Average bet size in $ using exchange <br> rates from the time of the bet.">
        Avg. Bet Size
      </h2>
      <ReactTooltip
        type="dark"
        backgroundColor="#161616"
        multiline={true}
        effect="float"
      />
      {data &&
        data
          .sort((a, b) => b.avgDollarBetSize - a.avgDollarBetSize)
          .map((obj, idx) => {
            return (
              <div className="betsize__content" key={idx}>
                <picture className="betsize__picture">
                  <source srcSet={logos[obj.token]} type="image/webp" />
                  <img
                    src={logos[obj.token]}
                    alt=""
                    className="betsize__icon"
                  />
                </picture>
                <p className="betsize__text">
                  $ {Math.round(obj.avgDollarBetSize).toLocaleString()}
                </p>
              </div>
            );
          })}
    </Card>
  );
}
