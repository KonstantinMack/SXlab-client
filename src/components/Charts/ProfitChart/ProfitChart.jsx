import "./ProfitChart.scss";

import Card from "../../Card/Card";
import Plot from "react-plotly.js";

export default function ProfitChart({ data }) {
  let profitCounter = 0;

  const x = [];
  const yProfit = [];
  const yBets = [];

  for (const obj of data) {
    x.push(obj.betDate);
    profitCounter += obj.dollarProfitLoss;
    yProfit.push(profitCounter);
    yBets.push(obj.numBets);
  }

  return (
    <Card>
      <h2>Profit/Loss over time:</h2>
      <Plot
        data={[
          {
            x: x,
            y: yProfit,
            type: "scatter",
            mode: "lines",
            marker: { color: "#00e5ff" },
            name: "Profit/Loss",
            fill: "tozeroy",
          },
          {
            type: "bar",
            x: x,
            y: yBets,
            yaxis: "y2",
            name: "Number of bets",
            marker: {
              color: "#ff8e00",
              opacity: 0.6,
            },
          },
        ]}
        layout={{
          margin: { l: 75, r: 50, b: 75, t: 50 },
          paper_bgcolor: "#1e1e1e",
          plot_bgcolor: "#1e1e1e",
          autosize: true,
          font: {
            family: "Roboto",
          },
          xaxis: {
            title: "Date",
            titlefont: {
              size: 16,
              color: "white",
            },
            tickfont: {
              size: 14,
              color: "white",
            },
            type: "date",
            tickangle: -30,
          },
          yaxis: {
            title: "Cumulative Profit/Loss $",
            titlefont: {
              size: 18,
              color: "#00e5ff",
            },
            tickfont: {
              size: 14,
              color: "#00e5ff",
            },
          },
          yaxis2: {
            title: "Number of bets",
            overlaying: "y",
            side: "right",
            titlefont: {
              size: 18,
              color: "#ff8e00",
            },
            tickfont: {
              size: 14,
              color: "#ff8e00",
            },
          },
          legend: {
            x: 0,
            y: 1,
            font: {
              family: "Roboto",
              size: 14,
              color: "white",
            },
          },
        }}
        config={{
          displayModeBar: false,
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "500px" }}
      />
    </Card>
  );
}
