import { ReactComponent as AllSportsLogo } from "../../../assets/icons/all-sports.svg";
import { ReactComponent as FootballLogo } from "../../../assets/icons/american-football.svg";
import { ReactComponent as BaseballLogo } from "../../../assets/icons/baseball.svg";
import { ReactComponent as TennisLogo } from "../../../assets/icons/tennis.svg";
import { ReactComponent as SoccerLogo } from "../../../assets/icons/soccer.svg";
import { ReactComponent as BasketballLogo } from "../../../assets/icons/basketball.svg";
import { ReactComponent as EsportsLogo } from "../../../assets/icons/esports.svg";
import { ReactComponent as CryptoLogo } from "../../../assets/icons/crypto.svg";
import { ReactComponent as RacingLogo } from "../../../assets/icons/racing.svg";
import { ReactComponent as MMALogo } from "../../../assets/icons/mma.svg";
import "./SideBarIcon.scss";

export default function SideBarIcon({ sport, selected }) {
  const classes = selected
    ? "sidebar__icon sidebar__icon--selected"
    : "sidebar__icon";

  const renderSwitch = (sport) => {
    switch (sport) {
      case "All":
        return <AllSportsLogo className={classes} />;
      case "Baseball":
        return <BaseballLogo className={classes} />;
      case "Basketball":
        return <BasketballLogo className={classes} />;
      case "Crypto":
        return <CryptoLogo className={classes} />;
      case "E Sports":
        return <EsportsLogo className={classes} />;
      case "Football":
        return <FootballLogo className={classes} />;
      case "Mixed Martial Arts":
        return <MMALogo className={classes} />;
      case "Racing":
        return <RacingLogo className={classes} />;
      case "Soccer":
        return <SoccerLogo className={classes} />;
      case "Tennis":
        return <TennisLogo className={classes} />;
      default:
        return <BaseballLogo className={classes} />;
    }
  };
  return renderSwitch(sport);
}
