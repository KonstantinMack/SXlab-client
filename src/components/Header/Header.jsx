import "./Header.scss";
import { NavLink } from "react-router-dom";

export default function Header() {
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
      <button className="header__button">Connect wallet</button>
    </header>
  );
}
