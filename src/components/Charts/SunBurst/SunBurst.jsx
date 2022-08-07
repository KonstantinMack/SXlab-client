import "./SunBurst.scss";

import Plot from "react-plotly.js";
import Card from "../../Card/Card";

export default function SunBurst({ data, addClass }) {
  const ids = ["Total Volume"];
  const labels = ["Total Volume"];
  const parents = [""];
  const values = [
    Math.round(
      data
        .filter((ele) => ele.sports === "All")
        .reduce((acc, cur) => acc + Number(cur.totalDollarMatched), 0)
    ),
  ];

  for (const obj of data) {
    if (obj.sports === "All") {
      ids.push(obj.token);
      labels.push(obj.token);
      parents.push("Total Volume");
      values.push(Math.ceil(obj.totalDollarMatched));
    } else {
      ids.push(obj.token + " - " + obj.sports);
      labels.push(obj.sports);
      parents.push(obj.token);
      values.push(Math.floor(obj.totalDollarMatched));
    }
  }

  return (
    <Card addClass={addClass}>
      <h2>Betting Volume Distribution:</h2>
      <Plot
        data={[
          {
            type: "sunburst",
            ids: ids,
            labels: labels,
            parents: parents,
            values: values,
            outsidetextfont: { size: 20, color: "white" },
            insidetextfont: { color: "black" },
            leaf: { opacity: 0.5 },
            marker: { line: { width: 3 } },
            branchvalues: "total",
          },
        ]}
        layout={{
          margin: { l: 0, r: 0, b: 0, t: 0 },
          sunburstcolorway: ["#ff8e00", "#00e5ff", "#15ff4f", "#f94144"],
          paper_bgcolor: "#1e1e1e",
          plot_bgcolor: "#1e1e1e",
          autosize: true,
        }}
        config={{
          displayModeBar: false,
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "400px" }}
      />
    </Card>
  );
}
