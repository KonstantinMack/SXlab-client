import "./Layout.scss";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

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
        .post("http://localhost:8080/api/user-stats/address", {
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
      .get(`http://localhost:8080/api/tipster/tipsters?sport=All`)
      .then((res) => setTipstersAll(res.data))
      .catch((err) => console.log(err));
  }, []);

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
          <Outlet context={[selectedSport, tipstersAll, accountAddress]} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
