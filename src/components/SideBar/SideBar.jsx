import "./SideBar.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import SXLogo from "../../assets/logos/sx-lab-logo.svg";
import SideBarItem from "./SideBarItem/SideBarItem";
import { SPORTS } from "../../lib/globals";
import { API_URL } from "../../config";

export default function SideBar({ selectedSport, setter }) {
  const [lastUpdated, setLastUpdated] = useState();

  useEffect(() => {
    axios
      .get(`${API_URL}/site-stats-by/update-time`)
      .then((res) => setLastUpdated(res.data[0].updatedAt));
  }, [selectedSport]);

  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <Link to="/">
          <img
            src={SXLogo}
            alt="SX logo"
            className="sidebar__logo"
            onClick={() => setter("All")}
          />
        </Link>
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
        {lastUpdated && (
          <div
            className="sidebar__updateTime"
            data-tip="Data gets updated every 6 hours"
            data-place="top"
          >
            <p>Data last updated at:</p>
            <p>{DateTime.fromSeconds(lastUpdated).toFormat("dd-LL-yy T")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
