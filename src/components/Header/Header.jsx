import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import HeaderLinks from "./HeaderLinks";
import SideBarModal from "../SideBar/SideBarModal/SideBarModal";
import SXLogo from "../../assets/logos/sx-lab-logo-side.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useState, useEffect } from "react";

export default function Header({ selectedSport, setter }) {
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

      {showModal && (
        <SideBarModal selectedSport={selectedSport} setter={setter} />
      )}
    </header>
  );
}
