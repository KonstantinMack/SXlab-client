import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";

export default function AddressSearchBar({
  submitHandler,
  searchAddress,
  setSearchAddress,
  buttonText,
  placeholder,
  name,
}) {
  return (
    <form onSubmit={submitHandler} className="user__form">
      <input
        type="text"
        value={searchAddress}
        onChange={(e) => setSearchAddress(e.target.value)}
        name={name}
        placeholder={placeholder}
        className="user__search"
      />
      <button className="user__search-button">
        <ArrowIcon className="user__search-button-icon" />
        <p>{buttonText}</p>
      </button>
    </form>
  );
}
