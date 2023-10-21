import { Box, Typography } from "@mui/material";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import ErrorIcon from "@mui/icons-material/Error";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import GavelIcon from "@mui/icons-material/Gavel";
import CancelIcon from "@mui/icons-material/Cancel";
import moment from "moment";
import Lottie from "react-lottie";
export const ReturnedORiginUI = () => {
  return (
    <>
      <Box>
        <Typography
          sx={{
            fontSize: 13,
            textAlign: "center",
            pt: 2,
          }}
        >
          <FolderOffIcon sx={{ fontSize: "50px", color: "grey" }} />
          <br />
          <h3>
            PR was returned to its origin
            <br />
            <span style={{ fontWeight: "normal", fontSize: "12px" }}>
              ( Kindly check below for reasons and remarks for more Information.
              )
            </span>
          </h3>
        </Typography>
      </Box>
    </>
  );
};

export const CancelledUI = (prTrans) => {
  return (
    <Typography
      sx={{
        fontSize: 13,
        textAlign: "center",
        pt: 2,
      }}
    >
      <Box>
        <ErrorIcon sx={{ fontSize: "50px", color: "grey" }} />
        <br />
        <h3>
          PR was <span style={{ color: "#E76161" }}> CANCELLED</span>
          <br />
          <span style={{ fontWeight: "normal", fontSize: "12px" }}>
            ( Kindly check below for reasons and remarks for more Information. )
            <br />
            {moment(prTrans[prTrans.length - 1].trans_created).format("LLL")}
          </span>
        </h3>
      </Box>
    </Typography>
  );
};

export const CompletedUI = (animationApprove, prTrans) => {
  return (
    <>
      <Lottie options={animationApprove} height={100} width={100} />

      <Typography
        sx={{
          fontSize: 13,
          textAlign: "center",
          pt: 2,
        }}
      >
        <Box>
          <h3>
            <span
              style={{
                fontWeight: "normal",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              REGISTERED
            </span>
            <br />
            PURCHASE ORDER
            <br />
            <span
              style={{
                fontWeight: "normal",
                fontSize: "12px",
              }}
            >
              {" "}
              {moment(prTrans[prTrans.length - 1].trans_created).format(
                "LLL"
              )}{" "}
            </span>
          </h3>
        </Box>
      </Typography>
    </>
  );
};

export const ApprovedlastUI = (animationApprove, prTrans) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: 13,
          textAlign: "center",
          pt: 2,
        }}
      >
        <Lottie options={animationApprove} height={100} width={100} />
        Approved last{" "}
        <strong>
          {moment(prTrans[prTrans.length - 1].trans_created).format("LLL")}
        </strong>{" "}
        <br />
        by {prTrans[prTrans.length - 1].userprofile}.
      </Typography>
    </>
  );
};

export const ReceivedLastUI = (prTrans) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: 13,
          textAlign: "center",
          pt: 2,
        }}
      >
        <MarkAsUnreadIcon sx={{ fontSize: "80px", color: "grey" }} />
        <br />
        Received last{" "}
        <strong>
          {moment(prTrans[prTrans.length - 1].trans_created).format("LLL")}
        </strong>{" "}
        <br />
        by {prTrans[prTrans.length - 1].userprofile}.
      </Typography>
    </>
  );
};

export const onBiddingUI = () => {
  return (
    <>
      <Typography
        sx={{
          fontSize: 13,
          textAlign: "center",
          pt: 2,
        }}
      >
        <GavelIcon sx={{ fontSize: "80px", color: "grey" }} />
        <br />
        <h3>
          PR is On-
          <span style={{ color: "#567189" }}>BIDDING</span>
          <br />
          <span style={{ fontWeight: "normal", fontSize: "12px" }}>
            ( The timeframe for completion may vary depending on the
            availability of suppliers, so dates and times provided may not be
            accurate )
          </span>
        </h3>
      </Typography>
    </>
  );
};
