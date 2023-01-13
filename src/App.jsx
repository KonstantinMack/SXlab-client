import "./App.scss";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import OverallStats from "./pages/OverallStats/OverallStats";
import UserStats from "./pages/UserStats/UserStats";
import Tipsters from "./pages/Tipsters/Tipsters";
import ClubHouse from "./pages/ClubHouse/ClubHouse";
import BetFinder from "./pages/BetFinder/BetFinder";
import NoMatch from "./pages/NoMatch/NoMatch";

import usePageTracking from "./lib/usePageTracking";

function App() {
  usePageTracking();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<OverallStats />} />
        <Route path="/user" element={<UserStats />} />
        <Route path="/user/:address" element={<UserStats />} />
        <Route path="/tipsters" element={<Tipsters />} />
        <Route path="/bet-finder" element={<BetFinder />} />
        <Route path="/club-house" element={<ClubHouse />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
