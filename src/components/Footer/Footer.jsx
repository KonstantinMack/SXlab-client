import "./Footer.scss";

import DiscordIcon from "../../assets/icons/discord.svg";
import EmailIcon from "../../assets/icons/email.svg";

import { useState } from "react";

export default function Footer() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <footer className="footer">
      <h3 className="footer__header">Contact:</h3>
      <div className="footer__email">
        <img
          src={EmailIcon}
          alt="email"
          className="footer__icon"
          onClick={() => {
            navigator.clipboard.writeText("admin@sx-lab.bet");
            setShowEmail(true);
            setTimeout(() => setShowEmail(false), 2000);
          }}
        />
        {showEmail && (
          <p className="footer__email-text">
            Email address copied to clipboard!
          </p>
        )}
      </div>
      <a
        href="https://discord.gg/xfv4mdNMTp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={DiscordIcon} alt="discord" className="footer__icon" />
      </a>
      <h3 className="footer__header">Disclaimer:</h3>
      <p className="footer__text">
        The material and information contained on this website is for general
        information purposes only. You are responsible for your own decisions.
        You should not rely upon the material or information on this website as
        a basis for making any business, investment, or any other decisions.
        Whilst we endeavour to keep the information up to date and correct, SX
        Lab makes no representations or warranties of any kind, express or
        implied about the completeness, accuracy, reliability, suitability or
        availability with respect to the website or the information, services or
        related graphics contained on the website for any purpose. Any reliance
        you place on such material is therefore strictly at your own risk. SX
        Lab will not be liable for any false, inaccurate, inappropriate or
        incomplete information presented on the website. SX Lab will not be
        liable for any loss or damage caused by a reader's reliance on
        information obtained in our assets. If you don't accept this
        responsibility for yourself, then you should not use SX Lab.
      </p>
    </footer>
  );
}
