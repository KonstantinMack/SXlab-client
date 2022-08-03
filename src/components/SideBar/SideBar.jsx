import "./SideBar.scss";
import SXLogo from "../../assets/logos/sx-lab-logo.svg";
import SideBarItem from "./SideBarItem/SideBarItem";
import { useState } from "react";

const sports = [
  "All",
  "Baseball",
  "Basketball",
  "Crypto",
  "E Sports",
  "Football",
  "Mixed Martial Arts",
  "Racing",
  "Soccer",
  "Tennis",
];

export default function SideBar({ selectedSport, setter }) {
  return (
    <div className="sidebar">
      <img src={SXLogo} alt="SX logo" className="sidebar__logo" />
      <div className="sidebar__icons">
        {sports.map((sport, idx) => (
          <SideBarItem
            sport={sport}
            setter={setter}
            selected={sport === selectedSport}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}
