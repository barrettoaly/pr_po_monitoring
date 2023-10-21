import React, { useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { Box, Typography, useTheme, Chip } from "@mui/material";
import moment from "moment";
import norows from "../../Assets/norows.png";
import { GridOverlay } from "@mui/x-data-grid";
function RemarksTimeline({ RemarksContent }) {
  const theme = useTheme();
  const color = theme.palette;
  const [states, setStates] = useState(null);

  const contents = states
    ? RemarksContent.filter((x) => x.typeofAction === states)
    : RemarksContent;
  return (
    <div>
      <Box p={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <span
          style={{
            fontWeight: "bold",
            fontSize: "12px",
            textTransform: "uppercase",
            marginRight: "5px",
          }}
        >
          Sort :
        </span>

        <Chip
          label="ALL"
          size="small"
          style={{ fontSize: "9px" }}
          onClick={() => {
            setStates(null);
          }}
        />
        <Chip
          label="ATTACHED"
          size="small"
          style={{ fontSize: "9px", backgroundColor: "#B9EDDD" }}
          onClick={() => {
            setStates(3);
          }}
        />
        <Chip
          label="RETURNED"
          size="small"
          style={{ fontSize: "9px", backgroundColor: "#F3E99F" }}
          onClick={() => {
            setStates(1);
          }}
        />

        <Chip
          label="CANCELLED"
          size="small"
          style={{ fontSize: "9px", backgroundColor: "#FFABAB" }}
          onClick={() => {
            setStates(2);
          }}
        />
      </Box>

      <Box sx={{ height: "500px", overflowY: "scroll" }}>
        <Timeline
          sx={{
            "& .MuiTimelineItem-root:before": {
              flex: 0,
            },
          }}
        >
          {contents.length >= 1 ? (
            contents.map((item, index) => {
              /* 
              {}
              */
              const bgColor =
                item.typeofAction == 1
                  ? "#F3E99F"
                  : item.typeofAction == 2
                  ? "#FFABAB"
                  : item.typeofAction == 3
                  ? "#B9EDDD"
                  : "#DAF5FF";
              return (
                <TimelineItem key={index} sx={{ paddingLeft: 0 }}>
                  <TimelineSeparator>
                    <Box sx={{ py: 1 }}>
                      <TimelineDot sx={{ bgcolor: "#91D8E4" }} />
                    </Box>
                    {index !== contents.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box
                      sx={{
                        bgcolor: bgColor,
                        p: 1,
                        borderLeft: 2,
                        borderColor: "#B0DAFF",
                        borderRadius: 1.5,
                      }}
                    >
                      <Typography fontSize={13} fontWeight={600} pb={1}>
                        {item.userName}
                        <br />
                        <span
                          style={{
                            fontSize: "9px",
                            textTransform: "uppercase",
                          }}
                        >
                          ( {item.userDepartment} ){" "}
                        </span>
                      </Typography>
                      <Typography fontSize={12}>{item.content}</Typography>
                      <Typography align="right" fontSize={10}>
                        {moment(item.created_at).calendar()}
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "150px",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={norows}
                alt="No rows"
                style={{ width: 70, boxShadow: 50 }}
              />

              <Typography
                fontSize={14}
                fontWeight={600}
                sx={{ mb: 10, mt: 1, color: "#969696" }}
              >
                No remarks yet..
              </Typography>
            </div>
          )}
        </Timeline>
      </Box>
    </div>
  );
}

export default RemarksTimeline;
