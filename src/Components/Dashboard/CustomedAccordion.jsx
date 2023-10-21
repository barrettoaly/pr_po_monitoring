import {
  CalendarMonth,
  Circle,
  KeyboardArrowDown,
  ProductionQuantityLimits,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";

const CustomedAccordion = ({ PR, items }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function renderRow(props) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItem>
    );
  }

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          //   boxShadow: "rgba(136, 165, 191, 0.48)  -6px -2px 16px 0px",
          border: 1,
          borderColor: `${theme.palette.grey[200]} !important`,
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel1bh-content"
          sx={{ backgroundColor: theme.palette.secondary.lightPurple }}
        >
          <Box display="flex" alignItems={"center"}>
            <Box color={theme.palette.tertiary.main}>
              <Typography fontWeight={700} fontSize={16}>
                PR #: {PR.pr_no}
              </Typography>
              <Typography fontSize={"small"}>{PR.department}</Typography>
            </Box>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            ml={20}
            color={theme.palette.tertiary.main}
          >
            <ShoppingCartCheckout sx={{ fontSize: 16 }} />
            <Typography sx={{ ml: 0.5 }} fontWeight={900} fontSize={14}>
              {PR.total_items} item{PR.total_items == 1 ? "" : "s"}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            ml={20}
            color={theme.palette.tertiary.main}
          >
            <CalendarMonth sx={{ fontSize: 16 }} />
            <Typography sx={{ ml: 0.5 }} fontWeight={900} fontSize={14}>
              {moment(PR.date).format("ll")}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>ITEMS:</Typography> */}
          <Box
            sx={{
              height: 100,

              overflowY: "scroll",
              backgroundColor: "background.paper",
            }}
          >
            <List py={2}>
              {items.map((el) => {
                return (
                  <Typography fontWeight={500} fontSize={15}>
                    {el.description}
                  </Typography>
                );
              })}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CustomedAccordion;
