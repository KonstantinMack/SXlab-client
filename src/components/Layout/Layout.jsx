import "./Layout.scss";

import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";

export default function Layout() {
  return (
    <div className="app">
      <SideBar />
      <div className="app__all">
        <Header />
        <main className="app__main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
