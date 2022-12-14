import "./Layout.scss";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../../config";
import useMediaQuery from "../../lib/hooks";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";

export default function Layout() {
  const [selectedSport, setSelectedSport] = useState("All");
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");

  const { ethereum } = window;

  const connectWallet = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccountAddress(accounts[0]);
      setIsConnected(true);
      await axios
        .post(`${API_URL}/user-stats/address`, {
          address: accounts[0],
        })
        .catch((err) => console.log(err.response.data));
    } catch (error) {
      setIsConnected(false);
    }
  };

  const disconnetWallet = () => {
    setIsConnected(false);
    setAccountAddress("");
  };

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
        <Header
          connectWallet={connectWallet}
          disconnetWallet={disconnetWallet}
          isConnected={isConnected}
          selectedSport={selectedSport}
          setter={setSelectedSport}
        />
        <main className="app__main">
          {isDesktop ? (
            <Outlet context={[selectedSport, accountAddress]} />
          ) : (
            <p>Sorry, your screensize is too small to show the dashboard.</p>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
