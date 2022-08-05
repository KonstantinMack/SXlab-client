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
          Analyser
        </NavLink>
        <NavLink to="/tipsters" className="header__nav-link">
          Tipsters
        </NavLink>
      </nav>
      {isConnected ? (
        <MetaMaskButton clickHandler={disconnetWallet} text="Log Out" />
      ) : (
        <MetaMaskButton clickHandler={connectWallet} text="Connect wallet" />
      )}
    </header>
  );
}
