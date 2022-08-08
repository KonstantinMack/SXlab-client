import "./App.scss";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import OverallStats from "./pages/OverallStats/OverallStats";
import UserStats from "./pages/UserStats/UserStats";
import Tipsters from "./pages/Tipsters/Tipsters";
import ClubHouse from "./pages/ClubHouse/ClubHouse";
import NoMatch from "./pages/NoMatch/NoMatch";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<OverallStats />} />
        <Route path="/user" element={<UserStats />} />
        <Route
          path="/user/:address"
          element={<UserStats showLoadingScreen={true} />}
        />
        <Route path="/tipsters" element={<Tipsters />} />
        <Route path="/club-house" element={<ClubHouse />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
