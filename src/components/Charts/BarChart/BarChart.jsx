import Plot from "react-plotly.js";
import Card from "../../Card/Card";

import "./BarChart.scss";

import { useState } from "react";

import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

export default function BarChart({ data, addClass }) {
  const [metric, setMetric] = useState("totalDollarMatched");

  const titles = {
    totalDollarMatched: "Total volume matched (in $)",
    totalDollarFees: "Total fees generated (in $)",
    numberOfBets: "Total number of bets placed",
  };

  const x = {
    DAI: [],
    USDC: [],
    ETH: [],
    SX: [],
  };
  const y = {
    DAI: [],
    USDC: [],
    ETH: [],
    SX: [],
  };
  const customData = {
    DAI: [],
    USDC: [],
    ETH: [],
    SX: [],
  };

  for (const obj of data) {
    x[obj.token].push(new Date(obj.year + "/" + obj.month));
    y[obj.token].push(obj[metric]);
    customData[obj.token].push(obj.month + "/" + obj.year);
  }

  const hoverTemplate = `%{customdata}, ${
    metric.includes("Dollar") ? "$" : ""
  }%{y}`;

  return (
    <Card addClass={addClass}>
      <div className="barchart__header">
        <h2 data-tip="Development over time for different metrics <br> like total volume, fees generated, and number of bets">
          Monthly breakdown
        </h2>
        <Select.Root
          defaultValue="totalDollarMatched"
          onValueChange={(val) => setMetric((state) => val)}
          className="select__root"
        >
          <Select.Trigger aria-label="Metric" className="select__trigger">
            <Select.Value
              placeholder="Select a metric..."
              className="select__value"
            />
            <Select.Icon className="select__icon">
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal className="select__portal">
            <Select.Content className="select__content">
              <Select.ScrollUpButton className="select__scrollup-button">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="select__viewport">
                <Select.Group className="select__group">
                  <Select.Label className="select__label">Metrics</Select.Label>
                  <Select.Item
                    value="totalDollarMatched"
                    className="select__item"
                  >
                    <Select.ItemText className="select__text">
                      <p>Total Volume</p>
                    </Select.ItemText>
                    <Select.ItemIndicator className="select__indicator">
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item value="totalDollarFees" className="select__item">
                    <Select.ItemText className="select__text">
                      <p>Total Fees</p>
                    </Select.ItemText>
                    <Select.ItemIndicator className="select__indicator">
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item value="numberOfBets" className="select__item">
                    <Select.ItemText className="select__text">
                      <p>Total Bets</p>
                    </Select.ItemText>
                    <Select.ItemIndicator className="select__indicator">
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <Plot
        data={[
          {
            x: x.USDC,
            y: y.USDC,
            customdata: customData.USDC,
            name: "USDC",
            type: "bar",
            hovertemplate: hoverTemplate,
            marker: {
              color: "#ff8e00",
              // opacity: 0.8,
              line: {
                color: "rgb(8,48,107)",
                width: 1.5,
              },
            },
          },
          {
            type: "bar",
            x: x.DAI,
            y: y.DAI,
            customdata: customData.DAI,
            hovertemplate: hoverTemplate,
            name: "DAI",
            marker: {
              color: "#15ff4f",
              // opacity: 0.8,
              line: {
                color: "rgb(8,48,107)",
                width: 1.5,
              },
            },
          },
          {
            x: x.ETH,
            y: y.ETH,
            customdata: customData.ETH,
            hovertemplate: hoverTemplate,
            name: "ETH",
            type: "bar",
            marker: {
              color: "#00e5ff",
              // opacity: 0.8,
              line: {
                color: "rgb(8,48,107)",
                width: 1.5,
              },
            },
          },
          {
            x: x.SX,
            y: y.SX,
            customdata: customData.SX,
            hovertemplate: hoverTemplate,
            name: "SX",
            type: "bar",
            marker: {
              color: "#f94144",
              // opacity: 0.8,
              line: {
                color: "rgb(8,48,107)",
                width: 1.5,
              },
            },
          },
        ]}
        layout={{
          margin: { l: 75, r: 50, b: 100, t: 50 },
          barmode: "stack",
          paper_bgcolor: "#1e1e1e",
          plot_bgcolor: "#1e1e1e",
          autosize: true,
          font: {
            family: "Roboto",
          },
          title: {
            text: titles[metric],
            font: {
              family: "Roboto",
              size: 22,
              color: "white",
            },
          },
          xaxis: {
            title: "Date",
            titlefont: {
              size: 18,
              color: "white",
            },
            tickfont: {
              size: 16,
              color: "white",
            },
            type: "date",
            tickangle: 45,
          },
          yaxis: {
            title: metric,
            titlefont: {
              size: 18,
              color: "white",
            },
            tickfont: {
              size: 16,
              color: "white",
            },
          },
          legend: {
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
        style={{ width: "100%", height: "500px" }}
      />
    </Card>
  );
}
