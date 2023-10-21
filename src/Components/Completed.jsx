import React, { useState } from "react";
import { Box, Button, Divider } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import moment from "moment";
export const Completed = ({ step, trans }) => {
  const [active, setActive] = useState(true);
  const { timecap } = trans;

  let formattedTimecap;

  if (timecap < 60) {
    formattedTimecap = `${timecap} minutes`;
  } else if (timecap == 60) {
    formattedTimecap = "1 hour";
  } else if (timecap < 1440) {
    const hours = Math.floor(timecap / 60);
    formattedTimecap = `${hours} hours`;
  } else if (timecap === 1440) {
    formattedTimecap = "1 day";
  } else {
    const days = Math.floor(timecap / 1440);
    formattedTimecap = `${days} days`;
  }
  return (
    <div>
      <>
        {/* <Button
          size="small"
          variant="outlined"
          color="success"
          sx={{ fontSize: "10px" }}
          onClick={() => {
            if (active) {
              setActive(false);
              return;
            }
            setActive(true);
          }}
        >
          {active ? "Close" : "view details"}
        </Button> */}
        {active && (
          <>
            <Box sx={{ textAlign: "left", padding: "5px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "normal",
                }}
              >
                Alloted TimeFrame:
                <br />
                <span style={{ fontWeight: "bold" }}> {formattedTimecap}</span>
                <Divider />
                Delays :
                <br />
                <span style={{ fontWeight: "bold" }}>
                  {trans.delay ? (
                    <>
                      <span style={{ color: "#E76161" }}>{trans.delay}</span>
                    </>
                  ) : (
                    "0"
                  )}
                </span>
                <Divider />
                Elapsed time:
                <br />
                <span style={{ fontWeight: "bold", color: "#539165" }}>
                  {" "}
                  {trans.elapsed ? trans.elapsed : "-- calculating --"}
                </span>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <div>
                    From :
                    <br />
                    <span style={{ fontWeight: "bold" }}> {trans.from}</span>
                  </div>
                  <div>
                    To :
                    <br />
                    <span style={{ fontWeight: "bold" }}> {trans.to}</span>
                  </div>
                </Box>
                <Divider />
                Date Completed:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {moment(trans.created_at).format("L")}
                </span>
                {trans.message ? (
                  <>
                    <Divider />
                    Remarks :
                    <br />
                    <span style={{ fontWeight: "bold" }}>{trans.message}</span>
                  </>
                ) : (
                  ""
                )}
              </span>
            </Box>
          </>
        )}
      </>
    </div>
  );
};
