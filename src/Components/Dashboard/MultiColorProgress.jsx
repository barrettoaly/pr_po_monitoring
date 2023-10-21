import {
  Box,
  Button,
  Collapse,
  Container,
  Link,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

function MultiColorProgress({ data, dataG, ConvertToPercentage }) {
  const [showLegend, setShowLegend] = useState(false);

  const colors = [
    "#40A0FF",
    "#FFA8A7",
    "#28639D",
    "#7BBDFF",
    "red",
    "blue",
    "purple",
    "grey",
    " yellow",
  ];

  const stats = [
    {
      label: "MMS Pending Approval",
      value: dataG.mmsPending && dataG.mmsPending.length,
      percent: ConvertToPercentage(
        dataG.mmsPending && dataG.mmsPending.length,
        dataG.totalRequest && dataG.totalRequest
      ),
    },
    {
      label: "Procurement Pending",
      value: dataG.procPending && dataG.procPending.length,
      percent: ConvertToPercentage(
        dataG.procPending && dataG.procPending.length,
        dataG.totalRequest && dataG.totalRequest
      ),
    },
    {
      label: "Budget Pending",
      value: dataG.budgetPending && dataG.budgetPending.length,
      percent: ConvertToPercentage(
        dataG.budgetPending && dataG.budgetPending.length,
        dataG.totalRequest && dataG.totalRequest
      ),
    },
    {
      label: "Accounting Pending",
      value: dataG.accountingPending && dataG.accountingPending.length,
      percent: ConvertToPercentage(
        dataG.accountingPending && dataG.accountingPending.length,
        dataG.totalRequest && dataG.totalRequest
      ),
    },
    {
      label: "Finance Pending",
      value: dataG.financePending && dataG.financePending.length,
      percent: ConvertToPercentage(
        dataG.financePending && dataG.financePending.length,
        dataG.totalRequest && dataG.totalRequest
      ),
    },
    {
      label: "PO Pending",
      value: dataG.poPending && dataG.poPending.length,
      percent: ConvertToPercentage(
        dataG.poPending && dataG.poPending.length,
        dataG.totalRequest && dataG.totalRequest
      ),
    },
  ];

  return (
    <>
      <Box
        width={{ lg: "90%", md: "90%", sm: "85%", xs: "85%" }}
        display="flex"
        sx={{
          height: { lg: 18, md: 15, sm: 10, xs: 10 },
          borderRadius: 10,
        }}
      >
        {stats.map((el, key) => {
          return (
            <Tooltip title={el.label + ": " + el.value}>
              <Link
                backgroundColor={colors[key]}
                width={el.percent + "%"}
                sx={{
                  position: "relative",
                  borderTopLeftRadius: key == 0 ? 10 : 0,
                  borderBottomLeftRadius: key == 0 ? 10 : 0,
                  borderTopRightRadius: data.length - 1 == key ? 10 : 0,
                  borderBottomRightRadius: data.length - 1 == key ? 10 : 0,
                  transition: " 0.25s ease",
                  "&:hover": {
                    mt: -0.4,
                    mb: -0.4,
                    mx: 0.4,
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  handleClick();
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: { lg: 18, md: 15, sm: 10, xs: 10 },
                    left: "50%",
                  }}
                >
                  {/* <Typography
                    color={colors[key]}
                    fontWeight={600}
                    fontSize={{ lg: 17, md: 15, sm: 14, xs: 10 }}
                  >
                    {el.percent + "%"}
                  </Typography> */}
                  {/* <Box
                    width={2}
                    sx={{ backgroundColor: colors[key] }}
                    height={15}
                  /> */}
                </Box>
              </Link>
            </Tooltip>
          );
        })}
      </Box>
      <Box
        display={{ xs: "none", sm: "flex" }}
        mt={5}
        gap={5}
        justifyContent="center"
      >
        {stats.map((el, key) => {
          return (
            <Link
              display="flex"
              alignItems={"center"}
              sx={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  backgroundColor: colors[key],
                  height: 14,
                  width: 14,
                  borderRadius: 50,
                }}
              />
              <Typography ml={1} fontSize={15}>
                {el.label}
              </Typography>
            </Link>
          );
        })}
      </Box>
      <Box display={{ sx: "block", sm: "none" }} mt={3}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            if (showLegend) {
              setShowLegend(false);
            } else {
              setShowLegend(true);
            }
          }}
        >
          {showLegend ? "Close" : "View Legend"}
        </Button>

        {showLegend ? (
          <Collapse orientation="horizontal" in={showLegend} direction="up">
            <Box mt={1} px={3.5}>
              {data.map((el) => {
                return (
                  <Link
                    display="flex"
                    alignItems={"center"}
                    sx={{ textDecoration: "none" }}
                    mb={0.4}
                  >
                    <Box
                      sx={{
                        backgroundColor: colors[key],
                        height: 14,
                        width: 14,
                        borderRadius: 50,
                      }}
                    />
                    <Typography ml={1} fontSize={15}>
                      {el.label}
                    </Typography>
                  </Link>
                );
              })}
            </Box>
          </Collapse>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

export default MultiColorProgress;
