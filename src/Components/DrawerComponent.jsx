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

import { Box, Typography } from "@mui/material";
import { left } from "@cloudinary/url-gen/qualifiers/textAlignment";

const DrawerComponent = ({ open, action, anchor, data, activeStep }) => {
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
            <Typography fontSize={20} fontWeight={600} pb={1}>
              Transaction Logs
            </Typography>
            {data.map((log, index) => (
              <TimelineItem key={log.id} sx={{ paddingLeft: 0 }}>
                <TimelineSeparator>
                  <Box sx={{ py: 1 }}>
                    <TimelineDot sx={{ bgcolor: "#91D8E4" }} />
                  </Box>
                  {/* <TimelineConnector></TimelineConnector> */}
                  {index !== data.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    sx={{
                      bgcolor: "#DAF5FF",
                      p: 1,
                      borderLeft: 2,
                      borderColor: "#B0DAFF",
                      borderRadius: 1.5,
                    }}
                  >
                    <Typography fontSize={15} fontWeight={600} pb={1}>
                      {log.department}
                    </Typography>

                    {/* From */}
                    <Typography fontSize={14} component="span">
                      From: <strong>{log.from}</strong>
                    </Typography>
                    <br />

                    {/* to */}
                    <Typography fontSize={14} component="span">
                      to: <strong>{log.to}</strong>
                    </Typography>
                    <br />

                    {/* Receive Data */}
                    <Typography fontSize={14} component="span">
                      Receive Date and Time:
                      <strong style={{ marginLeft: "5px" }}>
                        {log.receiveDateTime}
                      </strong>
                    </Typography>
                    <br />

                    {/* Delays */}
                    <Typography fontSize={14} component="span">
                      Delays:
                      <strong style={{ marginLeft: "5px" }}>
                        {!log.delays.length || !log.delays
                          ? "No Delays"
                          : log.delays}
                      </strong>
                    </Typography>
                    <br />

                    {/* Elapse Time */}
                    <Typography fontSize={14} component="span">
                      Elapsed Time:
                      <strong style={{ marginLeft: "5px" }}>
                        {log.elapsedTime === "" ? "-" : log.elapsedTime}
                      </strong>
                    </Typography>
                    <br />

                    {/* Data Completed */}
                    <Typography fontSize={14} pb={1}>
                      Date Completed:
                      <strong style={{ marginLeft: "5px" }}>
                        {log.elapsedTime === "" ? "No Data" : log.dateCompleted}
                      </strong>
                    </Typography>
                    <br />

                    {/* Approved By */}
                    <Typography fontSize={14}>
                      Approved By:
                      <strong style={{ marginLeft: "5px" }}>
                        - {log.approvedBy === "" ? "No Data" : log.approvedBy}
                      </strong>
                    </Typography>
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
