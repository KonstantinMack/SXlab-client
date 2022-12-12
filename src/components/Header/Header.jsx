import "./Header.scss";
import { NavLink, Link, useLocation } from "react-router-dom";
import HeaderLinks from "./HeaderLinks";
import SideBarModal from "../SideBar/SideBarModal/SideBarModal";
import MetaMaskButton from "../MetaMaskButton/MetaMaskButton";
import SXLogo from "../../assets/logos/sx-lab-logo-side.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useState, useEffect } from "react";

export default function Header({
  connectWallet,
  disconnetWallet,
  isConnected,
  selectedSport,
  setter,
}) {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowModal(false);
  }, [location, selectedSport]);

  return (
    <header className="header">
      <div className="header__phone">
        <Link to="/" onClick={() => setter("All")}>
          <img src={SXLogo} alt="SX logo" className="header__phone-logo" />
        </Link>

        {showModal ? (
          <CloseIcon
            className="header__icon header__icon-close"
            onClick={() => setShowModal((val) => !val)}
          />
        ) : (
          <MenuIcon
            className="header__icon header__icon-burger"
            onClick={() => setShowModal((val) => !val)}
          />
        )}
      </div>
      <HeaderLinks addClass={"header__nav-main"} />
      {isConnected ? (
        <div className="header__nav-login">
          <NavLink to="/club-house" className="header__nav-link">
            Club House
          </NavLink>
          <MetaMaskButton clickHandler={disconnetWallet} text="Log Out" />
        </div>
      ) : (
        <div className="header__nav-login">
          <MetaMaskButton clickHandler={connectWallet} text="Connect wallet" />
        </div>
      )}
      {showModal && (
        <SideBarModal selectedSport={selectedSport} setter={setter} />
      )}
    </header>
  );
}
