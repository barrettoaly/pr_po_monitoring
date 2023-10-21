import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import React from "react";
import ButtonComponent from "../ButtonComponent";
import { Close } from "@mui/icons-material";
import Lottie from "react-lottie";

const useStyles = makeStyles({
  dialogPaper: {
    borderRadius: 30,
    // background: "linear-gradient(to bottom, #e6e9fb, #FFFF, #FFFF)",
    padding: 10 /* Adjust the value as per your preference */,
  },
});

function DialogComponent({
  usedType,
  open,
  onClose,
  message,
  alert,
  iconColor,
  buttonColor,
  textColor,
  actionProceed,
  icon,
  image,
  title,
  iframe,
  imgWidth,
  imgHeight,
  animation,
  boxColor = "#ECF1FF",
}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        {/* <div
          style={{
            width: "100%",
            // opacity: 0.3,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={onClose} sx={{ color: "black", px: 2, py: 1 }}>
            <Close />
          </IconButton>
        </div> */}
        <Box align="center" sx={{ py: 2 }}>
          {animation ? (
            <Lottie options={animation} height={imgHeight} width={imgWidth} />
          ) : (
            icon
          )}
        </Box>
        <DialogTitle
          id="alert-dialog-title"
          align="center"
          sx={{ fontWeight: 600, py: 1 }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontWeight: 600 }}
          >
            {message}
            {alert}
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ py: 2, display: "flex", width: "100%" }}>
          {usedType === "prAction" ? (
            <>
              <Button
                variant="contained"
                // name="Approve"
                onClick={actionProceed}
                width="100%"
                style={{
                  flex: 1,
                  backgroundColor: buttonColor,
                  textTransform: "capitalize",
                  color: textColor,
                  borderRadius: 20,
                }}
              >
                Proceed
              </Button>
              <Button
                variant="outlined"
                onClick={onClose}
                // name="Delete"
                width="100%"
                style={{
                  flex: 1,
                  borderColor: "gray",
                  textTransform: "capitalize",
                  color: "gray",
                  borderRadius: 20,
                }}
              >
                Cancel
              </Button>
            </>
          ) : usedType === "submitMessage" ? (
            <Button
              variant="contained"
              // name="Approve"
              onClick={actionProceed}
              width="100%"
              style={{
                flex: 1,
                backgroundColor: buttonColor,
                textTransform: "capitalize",
                color: textColor,
                borderRadius: 20,
              }}
            >
              OK
            </Button>
          ) : (
            ""
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogComponent;
