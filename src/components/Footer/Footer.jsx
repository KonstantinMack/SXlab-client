import "./Footer.scss";

import DiscordIcon from "../../assets/icons/discord.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__header">Contact:</h3>
      <img src={DiscordIcon} alt="discord" className="footer__icon" />
      {/* <h3 className="footer__header">Disclaimer:</h3>
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
      </p> */}
    </footer>
  );
}
