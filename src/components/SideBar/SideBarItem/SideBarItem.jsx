import "./SideBarItem.scss";
import SideBarIcon from "../SideBarIcon/SideBarIcon";

export default function SideBarItem({ sport, setter, selected }) {
  return (
    <div className="sidebar__item" onClick={() => setter(sport)}>
      <SideBarIcon sport={sport} selected={selected} />
      <h3
        className={
          selected ? "sidebar__item-title--selected" : "sidebar__item-title"
        }
      >
        {sport}
      </h3>
    </div>
  );
}
