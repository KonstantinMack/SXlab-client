import "./StatsCard.scss";
import Card from "../Card/Card";

export default function StatsCard({ image, data, text, attribute, addClass }) {
  return (
    <Card addClass={`stats-card ${addClass || ""}`}>
      <img src={image} alt="icon" className="stats-card__image" />
      <div className="stats-card__content">
        <p className="stats-card__stat">
          {attribute.includes("Dollar") && "$ "}
          {data.length &&
            Math.round(
              data.reduce((acc, ele) => {
                return acc + Number(ele[attribute]);
              }, 0)
            ).toLocaleString()}
        </p>
        <p className="stats-card__text">{text}</p>
      </div>
    </Card>
  );
}
