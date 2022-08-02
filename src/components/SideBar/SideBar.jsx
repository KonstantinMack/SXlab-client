import "./SideBar.scss";
import SXLogo from "../../assets/logos/sx-lab-logo.svg";
import SideBarItem from "./SideBarItem/SideBarItem";
import { useState } from "react";

const sports = ["All", "Football", "Baseball", "Tennis", "Soccer"];

export default function SideBar() {
  const [selectedSport, setSelectedSport] = useState("All");

  return (
    <div className="sidebar">
      <img src={SXLogo} alt="SX logo" className="sidebar__logo" />
      <div className="sidebar__icons">
        {sports.map((sport, idx) => (
          <SideBarItem
            sport={sport}
            setter={setSelectedSport}
            selected={sport === selectedSport}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}
