// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { Box } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const PieChart = ({
  data /* see data tab */,
  margin = { top: 20, right: 60, bottom: 60, left: 60 },
  height = "400px",
}) => (
  <Box width={"100%"} height={height}>
    <ResponsivePie
      data={data}
      margin={margin}
      sortByValue={true}
      innerRadius={0.3}
      cornerRadius={6}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "set2" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabel="value"
      padAngle={0.8}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={3}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 3]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 50,
          translateY: 70,
          itemWidth: 100,
          itemHeight: 30,
          itemsSpacing: 4,
          symbolSize: 15,
          itemDirection: "left-to-right",
        },
      ]}
    />
  </Box>
);

export default PieChart;
