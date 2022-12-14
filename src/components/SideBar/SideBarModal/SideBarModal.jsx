import "./SideBarModal.scss";
import SideBar from "../SideBar";
import HeaderLinks from "../../Header/HeaderLinks";

export default function SideBarModal({ selectedSport, setter }) {
  return (
    <div className="nav__modal">
      <HeaderLinks addClass={"header__nav-modal"} />
      <SideBar selectedSport={selectedSport} setter={setter} />;
    </div>
  );
}
