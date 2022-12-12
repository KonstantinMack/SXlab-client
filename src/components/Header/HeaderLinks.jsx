import { NavLink } from "react-router-dom";

export default function HeaderLinks({ addClass, modalSetter }) {
  return (
    <nav className={`header__nav ${addClass}`}>
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
  );
}
