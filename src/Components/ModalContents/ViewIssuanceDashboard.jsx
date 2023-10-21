import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Snackbar,
  Alert,
  Button,
  Modal,
  Fade,
} from "@mui/material";
import IssuanceBody from "../../Pages/IssuanceBody";
import { Close } from "@mui/icons-material";

function ViewIssuanceDashboard({ onClose, id }) {
  const theme = useTheme();
  const color = theme.palette;

  const Header = () => {
    return (
      <div
        style={{
          width: "100%",
          height: 50,
          backgroundColor: color.secondary.lightGray,
          // opacity: 0.3,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: 5,
        }}
      >
        <IconButton onClick={onClose} sx={{ color: "black" }}>
          <Close />
        </IconButton>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div
        style={{
          width: "100%",
          height: 60,
          backgroundColor: color.grey[100],

          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          padding: 30,
        }}
      >
        <Button variant="contained" color="info" onClick={onClose}>
          Close
        </Button>
      </div>
    );
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Fade in={open}>
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              width: "auto",
              height: "80%",
            }}
          >
            <Header />
            <Box
              sx={{
                flexGrow: 1,
                p: 5,
                overflow: "auto",
              }}
            >
              <IssuanceBody id={id} />
            </Box>
            <Footer />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ViewIssuanceDashboard;
