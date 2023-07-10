import "./App.scss";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import Layout from "./components/Layout/Layout";
import OverallStats from "./pages/OverallStats/OverallStats";
import UserStats from "./pages/UserStats/UserStats";
import Tipsters from "./pages/Tipsters/Tipsters";
import ClubHouse from "./pages/ClubHouse/ClubHouse";
import BetFinder from "./pages/BetFinder/BetFinder";
import NoMatch from "./pages/NoMatch/NoMatch";

import { useEffect } from "react";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const titles = {
  "/": "SX Lab",
  "/user": "User stats",
  "/tipsters": "Tipsters",
  "/bet-finder": "Bet Finder",
  "/club-house": "Club House",
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    document.title = titles[location.pathname] || "SX Lab";
  }, [location]);

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<OverallStats title="SX Lab" />} />
          <Route path="/user" element={<UserStats title="User stats" />} />
          <Route
            path="/user/:address"
            element={<UserStats title="User stats" />}
          />
          <Route path="/tipsters" element={<Tipsters title="Tipsters" />} />
          <Route
            path="/bet-finder"
            element={<BetFinder title="Bet Finder" />}
          />
          <Route path="/club-house" element={<ClubHouse title="Clubhouse" />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </ClerkProvider>
  );
}

export default App;
