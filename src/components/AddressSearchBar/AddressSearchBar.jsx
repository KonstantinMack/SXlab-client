import Card from "../Card/Card";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";
import MicroscopeIcon from "../../assets/icons/microscope.svg";

export default function AddressSearchBar({
  submitHandler,
  searchAddress,
  setSearchAddress,
}) {
  return (
    <Card addClass={"user__form-card"}>
      <div className="user__description">
        <img
          src={MicroscopeIcon}
          alt="microscope"
          className="user__description-icon"
        />
        <div>
          <h1>Wallet Analyzer:</h1>
          <p>Take a deep dive into the nitty-gritty bits of any wallet.</p>
        </div>
      </div>
      <form onSubmit={submitHandler} className="user__form">
        <input
          type="text"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          name="address"
          className="user__search"
        />
        <button className="user__search-button">
          <ArrowIcon className="user__search-button-icon" />
          <p>Analyse wallet!</p>
        </button>
      </form>
    </Card>
  );
}
