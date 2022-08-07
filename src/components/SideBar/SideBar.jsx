import "./SideBar.scss";
import SXLogo from "../../assets/logos/sx-lab-logo.svg";
import SideBarItem from "./SideBarItem/SideBarItem";
import { SPORTS } from "../../lib/globals";

export default function SideBar({ selectedSport, setter }) {
  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <img src={SXLogo} alt="SX logo" className="sidebar__logo" />
        <div className="sidebar__icons">
          {SPORTS.map((sport, idx) => (
            <SideBarItem
              sport={sport}
              setter={setter}
              selected={sport === selectedSport}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
