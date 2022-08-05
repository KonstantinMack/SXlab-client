import "./MetaMaskButton.scss";

import MetaMaskIcon from "../../assets/icons/metamask-icon.svg";

export default function MetaMaskButton({ clickHandler, text }) {
  return (
    <button className="header__button" onClick={clickHandler}>
      <img
        src={MetaMaskIcon}
        alt="meta mask icon"
        className="header__button-icon"
      />
      <p className="header__button-text">{text}</p>
    </button>
  );
}
