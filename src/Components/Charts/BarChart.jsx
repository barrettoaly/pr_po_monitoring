// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { Box } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const BarChart = ({ data, direction = "horizontal", keys }) => (
  <Box width={"100%"} height={"430px"}>
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy="department"
      layout={direction}
      margin={{ top: 0, right: 30, bottom: 40, left: 30 }}
      padding={0.2}
      borderRadius={4}
      axisLeft={false}
      // valueScale={{ type: "linear" }}
      // indexScale={{ type: "band", round: true }}
      colors={{ scheme: "set2" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.5]],
      }}
      enableGridY={false}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "VALUE",
        legendPosition: "middle",
        legendOffset: 50,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["brighter", 3]],
      }}
      label={(d) => `${d.indexValue}: ${d.value}`}
      // legends={[
      //   {
      //     anchor: "bottom",
      //     direction: "row",
      //     justify: false,
      //     translateX: 0,
      //     translateY: 87,
      //     itemWidth: 100,
      //     itemHeight: 30,
      //     itemsSpacing: 4,
      //     symbolSize: 15,
      //     itemDirection: "left-to-right",
      //   },
      // ]}
      role="application"
      ariaLabel="Users per department"
      // barAriaLabel={function (e) {
      //   return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      // }}
      theme={{
        labels: {
          text: {
            fontSize: 10,
            fontWeight: 600,
            // Adjust the font size here
          },
        },
      }}
    />
  </Box>
);

export default BarChart;
