import React from "react";
import { Drawer } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineConnector,
} from "@mui/lab";

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { left } from "@cloudinary/url-gen/qualifiers/textAlignment";
import moment from "moment";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EastIcon from "@mui/icons-material/East";
import { TransactionLog_Details } from "../Components/TransactionLog_Details";
const DrawerComponent = ({
  open,
  action,
  anchor,
  data,
  activeStep,
  prdetails,
  allTransLogs,
}) => {
  const CurrentStage = (log, index) => {
    if (log.status == 3) {
      const count = index + 1;

      if (allTransLogs[count] && allTransLogs[count].status == 5) {
        return log.CurrentStage;
      }

      return log.ToStage;
    } else {
      return log.CurrentStage;
    }
  };
  return (
    <>
      <Drawer anchor={anchor} open={open} onClose={action}>
        <Box>
          {/* Timeline Component */}

          <Timeline
            sx={{
              "& .MuiTimelineItem-root:before": {
                flex: 0,
              },
            }}
          >
            <Typography fontSize={16} fontWeight={600} pb={1}>
              Transaction Logs
            </Typography>
            {allTransLogs.map((log, index) => (
              <TimelineItem key={log.id} sx={{ paddingLeft: 0 }}>
                <TimelineSeparator>
                  <Box sx={{ py: 1 }}>
                    <TimelineDot sx={{ bgcolor: "#91D8E4" }} />
                  </Box>
                  {/* <TimelineConnector></TimelineConnector> */}
                  {allTransLogs.length >= 2 && (
                    <>
                      {index !== allTransLogs && allTransLogs.length - 1 && (
                        <TimelineConnector />
                      )}{" "}
                    </>
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    sx={{
                      bgcolor: "#F5F5F5",
                      p: 1,
                      borderLeft: 5,
                      borderColor: "#B0DAFF",
                      borderRadius: 1.5,
                    }}
                  >
                    <Typography
                      fontSize={9}
                      sx={{ float: "right", textTransform: "uppercase" }}
                    >
                      {log.prStatus}
                    </Typography>

                    <Typography
                      fontSize={13}
                      fontWeight={600}
                      pb={1}
                      sx={{ color: "#4A55A2" }}
                    >
                      {CurrentStage(log, index)}
                    </Typography>

                    {log.prStatus == "returned" ? (
                      <Box sx={{ display: "flex" }}>
                        <Typography fontSize={13} component="span">
                          <strong>{log.ToStage}</strong>
                        </Typography>

                        <Typography
                          sx={{ marginLeft: "5px", marginTop: "-2px" }}
                        >
                          <KeyboardBackspaceIcon />
                        </Typography>

                        <Typography
                          fontSize={13}
                          component="span"
                          sx={{ marginLeft: "2px" }}
                        >
                          <strong>{log.FromStage}</strong>
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex" }}>
                        <Typography fontSize={13} component="span">
                          <strong>{log.FromStage}</strong>
                        </Typography>

                        <Typography
                          sx={{ marginLeft: "5px", marginTop: "-2px" }}
                        >
                          <EastIcon />
                        </Typography>

                        <Typography
                          fontSize={13}
                          component="span"
                          sx={{ marginLeft: "2px" }}
                        >
                          <strong>{log.ToStage}</strong>
                        </Typography>
                      </Box>
                    )}
                    <TransactionLog_Details />

                    {/* <Typography fontSize={13} component="span">
                      Working Hours:
                      <strong
                        style={{
                          marginLeft: "5px",
                        }}
                      >
                        {log.WorkHours}
                      </strong>
                    </Typography>
                    <br />

                    <Typography fontSize={13} component="span">
                      Delays:
                      <strong
                        style={{
                          marginLeft: "5px",
                          color: log.delay != "No Delay" ? "#FF6666" : "",
                        }}
                      >
                        {log.delay}
                      </strong>
                    </Typography>
                    <br />

                    <Typography fontSize={13} component="span">
                      Elapsed Time:
                      <strong style={{ marginLeft: "5px" }}>
                        {log.elapsed === "" ? "-" : log.elapsed}
                      </strong>
                      <br />
                      <span style={{ fontSize: "10px" }}>
                        ( Taking Action After Receiving )
                      </span>
                    </Typography>

                    <br />

                    <br />

                    <Typography fontSize={13} pb={1}>
                      Date{" "}
                      {log.prstats == "returned" ? "Returned" : "Completed"} :
                      <strong style={{ marginLeft: "5px" }}>
                        {moment(log.created_at).format("MMMM D YYYY, h:mma")}
                      </strong>
                    </Typography>
                    <br />

                    <Typography fontSize={13}>
                      Approved By:
                      <strong style={{ marginLeft: "5px" }}>
                        - {log.ApprovedBy === "" ? "No Data" : log.ApprovedBy}
                      </strong>
                    </Typography> */}
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
