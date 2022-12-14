import "./UserDonutCharts.scss";

import Card from "../../Card/Card";
import Plot from "react-plotly.js";

export default function UserDonutCharts({ values, labels, title, showLegend }) {
  return (
    <Card addClass={"user-stats__donut-chart"}>
      <h2>{title}</h2>
      <Plot
        data={[
          {
            values,
            labels,
            name: "Win Percentage",
            hole: 0.4,
            type: "pie",
            text: {
              font: {
                family: "Roboto",
                size: 12,
                color: "white",
              },
            },
            textinfo: "label+percent",
            marker: {
              colors: ["#06db3c", "#00e5ff", "#f94144", "#ff8e00"],
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
          showlegend: showLegend,
          font: {
            family: "Roboto",
          },
          legend: {
            x: 0.6,
            xanchor: "right",
            y: 0.5,
            bgcolor: "rgba(0,0,0,0)",
            font: {
              family: "Roboto",
              size: 12,
              color: "white",
            },
          },
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
