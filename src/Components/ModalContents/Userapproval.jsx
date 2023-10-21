import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  Dialog,
  IconButton,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grow,
  Alert,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ButtonComponent from "../ButtonComponent";
import { useController } from "../../Context/DataContext";
import { GetRequest, PostRequest } from "../../API/Api";

import { Close } from "@mui/icons-material";
export const Userapproval = ({
  onClose,
  selectedIDS,
  selectedRows,
  divider,
  setSeverity,
  setShow,
  setAlertmessage,
}) => {
  const theme = useTheme();
  const color = theme.palette;

  const [role, setRole] = useState();
  const [showError, setShowError] = useState(false);
  const { setTabClick } = useController();
  const [rolesData, setRolesData] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  useEffect(() => {
    GetRequest({ url: "api/role" }).then((res) => {
      setRolesData(res.data.data);
      console.log(res);
    });
  }, []);
  const handleShowError = () => {
    setShowError(true);
  };

  const Prompts = () => {
    if (divider == "approve") {
      return (
        <Box>
          <h4 style={{ color: "#E74646" }}>
            Would you like to proceed with approving{" "}
            {selectedIDS.length >= 2 ? "all selected users" : "this user"} ?
            Please note that this action cannot be undone.
          </h4>

          {showError ? (
            <Grow in={handleShowError}>
              <Alert
                onClose={handleClose}
                // variant="filled"
                severity={"error"}
                sx={{
                  width: "100%",
                  fontWeight: 600,
                  fontSize: 14,
                }}
                onClick={() => {
                  setShowError(false);
                }}
              >
                Please set User Role.
              </Alert>
            </Grow>
          ) : (
            ""
          )}
          <FormControl
            fullWidth
            style={{ marginBottom: "10px" }}
            error={showError}
          >
            <InputLabel id="demo-simple-select-label">Set User Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Set User Role"
              onChange={(e) => {
                setRole(e.target.value);
                console.log(e.target.value);
              }}
            >
              {rolesData.map((row) => {
                const { name, id } = row;
                return <MenuItem value={id}>{name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      );
    }
    if (divider == "decline") {
      return (
        <Box>
          <h4 style={{ color: "#E74646" }}>
            Would you like to proceed with declining{" "}
            {selectedIDS.length >= 2 ? "all selected users" : "this user"} ?
            Please note that this action cannot be undone.
          </h4>
        </Box>
      );
    }
    if (divider == "block") {
      return (
        <Box>
          <h4 style={{ color: "#E74646" }}>
            Would you like to proceed with blocking{" "}
            {selectedIDS.length >= 2 ? "all selected users" : "this user"} ?
            Please note that this action cannot be undone.
          </h4>
        </Box>
      );
    }
  };

  const ButtonAction = () => {
    switch (divider) {
      case "approve":
        return "Approve";

      case "decline":
        return "Decline";

      case "block":
        return "Block";
    }
  };

  function Action(actionType, successMessage) {
    if (!role) {
      setShowError(true);
    }
    let form = new FormData();
    form.append("selectedIDS", selectedIDS);
    form.append("role", role);
    form.append("action", actionType);

    PostRequest({ url: "/api/useraction" }, form)
      .then((res) => {
        const {
          statusText,
          data: { message, data },
        } = res;

        if (res.data.message == "success") {
          setShow(true);
          setSeverity("success");
          setAlertmessage(successMessage);
          setTimeout(() => {
            setTabClick(true);
          }, 2000);
          onClose();
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setShowError(true);
      });
  }

  const handleAction = () => {
    if (divider == "approve") {
      Action("approve", "User has been successfully approved.");
    }

    if (divider == "decline") {
      Action("decline", "User has been successfully declined.");
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {Prompts()}
      <Box p={5} sx={{ overflowY: "scroll", height: "300px" }}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {selectedRows.map((row) => {
            /* Below are sample data only */
            const { Name, email, department, userAddress, created_at } = row;
            return (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={Name} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <>
                        <h5 style={{ float: "right", fontWeight: "normal" }}>
                          {created_at}
                        </h5>
                        {Name}
                      </>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {email} | {department}
                        </Typography>{" "}
                        <br />
                        {userAddress}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </>
            );
          })}

          <Divider variant="inset" component="li" />
        </List>
      </Box>

      <ButtonComponent
        name={ButtonAction()}
        variant="contained"
        color={color.tertiary.main}
        width="100%"
        action={handleAction}
      />
    </div>
  );
};
