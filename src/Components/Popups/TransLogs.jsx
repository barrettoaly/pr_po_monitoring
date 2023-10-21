import React from "react";
import {
  Button,
  Drawer,
  Box,
  List,
  ListItem,
  Divider,
  Typography,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { TList } from "../TList";
import searchnotfound from "../../Assets/searchnotfound.gif";
export const TransLogs = ({ translogs }) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 400,
        padding: "15px",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h6" component="h2">
        Transaction Logs
      </Typography>
      {translogs.length >= 1 ? (
        <TList translogs={translogs} />
      ) : (
        <>
          <Box sx={{ textAlign: "center", marginTop: "20vh" }}>
            <img style={{ width: "180px" }} src={searchnotfound} alt="" />
            <br />
            <span>No Data Found.</span>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <div>
      <Button
        variant="standard"
        size="small"
        sx={{
          marginBottom: "20px",
          display: "flex",
          fontSize: "13px",
          color: "#2E8A99",
        }}
        onClick={toggleDrawer("right", true)}
      >
        Transaction Logs{" "}
        <ListAltIcon
          fontSize="small"
          sx={{ marginLeft: "2px", marginTop: "-2px" }}
        />
      </Button>

      <React.Fragment key={"right"}>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
