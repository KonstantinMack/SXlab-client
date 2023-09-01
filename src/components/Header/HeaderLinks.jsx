import { NavLink } from "react-router-dom";
import { SignInButton, SignOutButton, useAuth } from "@clerk/clerk-react";

export default function HeaderLinks({ addClass, modalSetter }) {
  const { isLoaded, userId } = useAuth();
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
      <NavLink to="/bet-finder" className="header__nav-link">
        Bet Finder
      </NavLink>
      <NavLink
        to="/club-house"
        className="header__nav-link header__nav-link--separator"
      >
        Club House
      </NavLink>
      {!isLoaded || !userId ? (
        <SignInButton redirectUrl="/club-house" className="header__button" />
      ) : (
        <SignOutButton className="header__button" />
      )}
    </nav>
  );
}
