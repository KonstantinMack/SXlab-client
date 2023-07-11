import "./Layout.scss";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useFavourites, useMediaQuery } from "../../lib/hooks";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import { useAuth } from "@clerk/clerk-react";

export default function Layout() {
  const { userId } = useAuth();
  const [selectedSport, setSelectedSport] = useState("All");
  const [favourites, setFavourites] = useFavourites(userId);

  const isDesktop = useMediaQuery("(min-width: 350px)");

  return (
    <div className="app">
      <div className="app__sidebar">
        <SideBar
          selectedSport={selectedSport}
          setter={setSelectedSport}
          withLogo={true}
        />
      </div>
      <div className="app__all">
        <Header selectedSport={selectedSport} setter={setSelectedSport} />
        <main className="app__main">
          {isDesktop ? (
            <Outlet
              context={[selectedSport, userId, favourites, setFavourites]}
            />
          ) : (
            <p>Sorry, your screensize is too small to show the dashboard.</p>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
