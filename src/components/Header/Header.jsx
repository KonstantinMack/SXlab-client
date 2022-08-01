import "./Header.scss";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink to="/">Stats</NavLink>
        <NavLink to="/user">Analyser</NavLink>
        <NavLink to="/tipsters">Tipsters</NavLink>
      </nav>
      <button className="header__button">Connect wallet</button>
    </header>
  );
}
