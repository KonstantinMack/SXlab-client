import { ReactComponent as AllSportsLogo } from "../../../assets/icons/all-sports.svg";
import { ReactComponent as FootballLogo } from "../../../assets/icons/american-football.svg";
import { ReactComponent as BaseballLogo } from "../../../assets/icons/baseball.svg";
import { ReactComponent as TennisLogo } from "../../../assets/icons/tennis.svg";
import { ReactComponent as SoccerLogo } from "../../../assets/icons/soccer.svg";
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
      case "Football":
        return <FootballLogo className={classes} />;
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
