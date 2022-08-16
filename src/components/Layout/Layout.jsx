import "./Layout.scss";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../config";
import useMediaQuery from "../../lib/hooks";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";

export default function Layout() {
  const [selectedSport, setSelectedSport] = useState("All");
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [tipstersAll, setTipstersAll] = useState([]);

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

  useEffect(() => {
    axios
      .get(`${API_URL}/tipster/tipsters?sport=All`)
      .then((res) => setTipstersAll(res.data))
      .catch((err) => console.log(err));
  }, []);

  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="app">
      <SideBar selectedSport={selectedSport} setter={setSelectedSport} />
      <div className="app__all">
        <Header
          connectWallet={connectWallet}
          disconnetWallet={disconnetWallet}
          isConnected={isConnected}
        />
        <main className="app__main">
          {isDesktop ? (
            <Outlet context={[selectedSport, tipstersAll, accountAddress]} />
          ) : (
            <p>
              There is no mobile version yet, <br></br>please use a desktop.
            </p>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
