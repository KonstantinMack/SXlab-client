import Plot from "react-plotly.js";
import Card from "../../Card/Card";

export default function SportsTreeMap({ data, addClass }) {
  const values = [];
  const labels = [];
  const parents = [];

  for (const obj of data) {
    values.push(obj.dollarStake);
    labels.push(obj.sports);
    parents.push("Sports");
  }
  return (
    <Card addClass={addClass}>
      <h2>Betting Volume by Sports:</h2>
      <Plot
        data={[
          {
            values,
            labels,
            parents,
            type: "treemap",
            textinfo: "label+value",
            hoverinfo: "label+percent root",
            insidetextfont: { size: 14, color: "black" },
            outsidetextfont: { size: 1, color: "transparent" },
            marker: {
              colors: ["#00e5ff", "#06db3c", "#ff8e00"],
            },
          },
        ]}
        layout={{
          margin: { l: 0, r: 0, b: 0, t: 0 },
          paper_bgcolor: "#1e1e1e",
          plot_bgcolor: "#1e1e1e",
          font: {
            family: "Roboto",
          },
          autosize: true,
        }}
        config={{
          displayModeBar: false,
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "85%" }}
      />
    </Card>
  );
}
