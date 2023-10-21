import * as React from "react";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext, TabList } from "@mui/lab";
import { Tabs } from "@mui/material";

const StyledTabs = styled((props) => <Tabs {...props} />)({
  borderBottom: "none",
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.tertiary.main,
    minHeight: 30,
    textTransform: "uppercase",
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.tertiary.main,
      color: theme.palette.myPrimary.main,
      borderRadius: 50,
      width: 120,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

export default function CustomedTabs({ labels, contents }) {
  const [active, setActive] = React.useState(1);

  const handleChange = (event, newValue) => {
    setActive(newValue);
  };

  return (
    <Box>
      <StyledTabs
        value={active}
        onChange={handleChange}
        sx={{ position: "fixed", backgroundColor: "#f5f5f5", width: "100%" }}
      >
        {labels.map((e) => {
          return <StyledTab label={e.label} value={e.value} />;
        })}
      </StyledTabs>

      <TabContext value={active}>
        {contents.map((e) => {
          return (
            <TabPanel
              sx={{ px: 0, mt: 10, pt: 8 }}
              value={e.value}
              backgroundColor="#f5f5f5"
            >
              {e.content}
            </TabPanel>
          );
        })}
      </TabContext>

      {/* <Box>
        <AntTabs value={value}></AntTabs>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </Box> */}
    </Box>
  );
}
