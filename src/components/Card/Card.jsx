import "./Card.scss";

export default function Card({ children, addClass }) {
  return <div className={`card ${addClass}`}>{children}</div>;
}
