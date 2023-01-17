import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import OverallStats from "./pages/OverallStats/OverallStats";
import UserStats from "./pages/UserStats/UserStats";
import Tipsters from "./pages/Tipsters/Tipsters";
import ClubHouse from "./pages/ClubHouse/ClubHouse";
import BetFinder from "./pages/BetFinder/BetFinder";
import NoMatch from "./pages/NoMatch/NoMatch";

import { useEffect } from "react";

const titles = {
  "/": "SX Lab",
  "/user": "User stats",
  "/tipsters": "Tipsters",
  "/bet-finder": "Bet Finder",
  "/club-house": "Club House",
};

function App() {
  const location = useLocation();
  useEffect(() => {
    document.title = titles[location.pathname] || "SX Lab";
  }, [location]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<OverallStats title="SX Lab" />} />
        <Route path="/user" element={<UserStats title="User stats" />} />
        <Route
          path="/user/:address"
          element={<UserStats title="User stats" />}
        />
        <Route path="/tipsters" element={<Tipsters title="Tipsters" />} />
        <Route path="/bet-finder" element={<BetFinder title="Bet Finder" />} />
        <Route path="/club-house" element={<ClubHouse title="Clubhouse" />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
