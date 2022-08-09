import "./NoMatch.scss";
import OffsideIcon from "../../assets/icons/offside.svg";

export default function NoMatch() {
  return (
    <div className="nomatch">
      <img src={OffsideIcon} alt="offside" className="nomatch__icon" />
      <h1>Offside!</h1>
    </div>
  );
}
