import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ChecklistIcon from "@mui/icons-material/Checklist";

import { Container, Box, Grid, Typography, Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { E_preview } from "./E_preview";
import { useNavigate } from "react-router-dom";

export const E_Management = ({
  edata,
  selectedPreview,
  handleDelete,
  handleEPReview,
  setOpenModal,
}) => {
  const [dense, setDense] = useState(false);
  const navigate = useNavigate();

  const handleEdit = async (row) => {
    navigate("/manage/edit/evalutionForm", { state: { data: row } });
  };

  return (
    <div>
      {" "}
      <br />
      <Box>
        <Button
          size="small"
          onClick={() => {
            navigate("/evalutionForm");
          }}
        >
          Back
        </Button>
        <Button
          color="info"
          variant="contained"
          size="small"
          sx={{ textTransform: "capitalize", marginLeft: "5px" }}
          onClick={() => setOpenModal(true)}
        >
          New
          <AddCircleOutlineIcon
            sx={{ fontSize: "medium", marginLeft: "5px" }}
          />
        </Button>
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={4}>
          <Typography
            style={{ fontSize: "15px", fontWeight: "bold" }}
            gutterBottom
          >
            All Forms
          </Typography>

          <List dense={dense}>
            {edata.length >= 1 ? (
              edata.map((row) => {
                return (
                  <ListItem
                    secondaryAction={
                      <Box display="flex" sx={{ mx: 0 }}>
                        <IconButton
                          edge="start"
                          aria-label="delete"
                          onClick={() => {
                            handleEdit(row);
                          }}
                        >
                          <DriveFileRenameOutlineIcon
                            sx={{ color: "#146C94" }}
                          />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          data-id={row.id}
                          onClick={handleDelete}
                        >
                          <HighlightOffIcon sx={{ color: "#65647C" }} />
                        </IconButton>
                      </Box>
                    }
                    style={{
                      backgroundColor: "#FFFBF5",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginBottom: "5px", // add margin bottom
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                    onClick={() => {
                      handleEPReview({
                        formID: row.id,
                      });
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <ChecklistIcon />
                      </Avatar>
                    </ListItemAvatar>{" "}
                    <ListItemText
                      secondary={
                        <span style={{ color: "#0A4D68" }}>{row.title}</span>
                      }
                    />
                  </ListItem>
                );
              })
            ) : (
              <Box textAlign={"center"} p={5}>
                <h4 style={{ color: "#088395" }}>No Evaluation Form Yet..</h4>
              </Box>
            )}
          </List>
        </Grid>
        <Grid item xs={8}>
          <Box
            p={5}
            height={"70vh"}
            sx={{ OverflowY: "scroll" }}
            borderRadius={"10px"}
            backgroundColor="#ECF9FF"
          >
            <Typography
              gutterBottom
              style={{ fontSize: "15px", fontWeight: "bold" }}
            >
              FORM PREVIEW
            </Typography>
            {selectedPreview.length >= 1 ? (
              <E_preview selectedPreview={selectedPreview} />
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
