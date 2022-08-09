import "./Header.scss";
import { NavLink } from "react-router-dom";
import MetaMaskButton from "../MetaMaskButton/MetaMaskButton";

export default function Header({
  connectWallet,
  disconnetWallet,
  isConnected,
}) {
  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink to="/" className="header__nav-link">
          Stats
        </NavLink>
        <NavLink to="/user" className="header__nav-link">
          Analyzer
        </NavLink>
        <NavLink to="/tipsters" className="header__nav-link">
          Tipsters
        </NavLink>
      </nav>
      {isConnected ? (
        <div className="header__nav-login">
          <NavLink to="/club-house" className="header__nav-link">
            Club House
          </NavLink>
          <MetaMaskButton clickHandler={disconnetWallet} text="Log Out" />
        </div>
      ) : (
        <MetaMaskButton clickHandler={connectWallet} text="Connect wallet" />
      )}
    </header>
  );
}
