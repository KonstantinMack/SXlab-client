import "./Layout.scss";

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";

export default function Layout() {
  const [selectedSport, setSelectedSport] = useState("All");
  return (
    <div className="app">
      <SideBar selectedSport={selectedSport} setter={setSelectedSport} />
      <div className="app__all">
        <Header />
        <main className="app__main">
          <Outlet context={selectedSport} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
