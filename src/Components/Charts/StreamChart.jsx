import React from "react";
import { ResponsiveStream } from "@nivo/stream";
import { Box } from "@mui/material";

const StreamChart = ({ data, keys, scheme, height }) => {
  const values = [
    { key: 0, value: "Jan" },
    { key: 1, value: "Feb" },
    { key: 2, value: "Mar" },
    { key: 3, value: "Apr" },
    { key: 4, value: "May" },
    { key: 5, value: "Jun" },
    { key: 6, value: "Jul" },
    { key: 7, value: "Aug" },
    { key: 8, value: "Sep" },
    { key: 9, value: "Oct" },
    { key: 10, value: "Nov" },
    { key: 11, value: "Dec" },
  ];
  const xValues = values.map((tick) => tick.key);

  const formatTickLabel = (value) => {
    const tick = values.find((label) => label.key === value);
    return tick ? tick.value : "";
  };
  return (
    <Box width={"100%"} height={height}>
      <ResponsiveStream
        data={data}
        keys={keys}
        margin={{ top: 50, right: 40, bottom: 50, left: 50 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 10,
          tickPadding: 20,
          tickRotation: -45,
          legend: "",

          legendOffset: 36,
          legendPosition: "middle",
          // tickValues: xValues,
          renderTick: (tick) => (
            <g key={tick.value}>
              <text
                x={tick.x}
                y={tick.y + 15}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: 10 }}
              >
                {formatTickLabel(tick.value)}
              </text>
            </g>
          ),
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: -40,
        }}
        // indexBy="index"
        enableGridX={true}
        enableGridY={false}
        offsetType="diverging"
        // order="ascending"
        colors={{ scheme: scheme }}
        fillOpacity={0.85}
        borderColor={{ theme: "background" }}
        dotSize={8}
        dotColor={{ from: "color" }}
        dotBorderWidth={2}
        dotBorderColor={{
          from: "color",
          modifiers: [["darker", 0.7]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 50,
            itemWidth: 90,
            itemHeight: 20,
            itemTextColor: "#999999",
            itemDirection: "left-to-right",

            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000000",
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default StreamChart;
