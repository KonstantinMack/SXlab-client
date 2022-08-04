import "./DonutChart.scss";

import Plot from "react-plotly.js";
import Card from "../../Card/Card";

export default function LineChart({ data }) {
  const values = [];
  const labels = [];

  for (const obj of data) {
    values.push(obj.totalDollarMatched);
    labels.push(obj.betType);
  }

  return (
    <Card>
      <h2>Betting volume by bet-type:</h2>
      <Plot
        data={[
          {
            values,
            labels,
            name: "Bet Type",
            hole: 0.5,
            type: "pie",
            textinfo: "label+percent",
            opacity: 0.8,
            marker: {
              colors: ["#00e5ff", "#15ff4f", "#ff8e00"],
            },
          },
        ]}
        layout={{
          margin: { l: 10, r: 10, b: 10, t: 10 },
          width: 300,
          height: 300,
          paper_bgcolor: "#1e1e1e",
          plot_bgcolor: "#1e1e1e",
          autosize: true,
          showlegend: false,
          // legend: {
          //   x: 0.6,
          //   xanchor: "right",
          //   y: 0.5,
          //   bgcolor: "rgba(0,0,0,0)",
          //   font: {
          //     family: "Roboto",
          //     size: 12,
          //     color: "white",
          //   },
          // },
        }}
        config={{
          displayModeBar: false,
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
    </Card>
  );
}
