import React, { useState } from "react";
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  TextField,
} from "@mui/material";
import moment from "moment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TitleHeader from "../Components/TitleHeader";
import { useLocation } from "react-router-dom";
export const EuserFeedbacks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { Efeedbacks, eform, Pagetitle } = location.state || {};
  const [data, setData] = useState(Efeedbacks);
  const [dense, setDense] = useState(false);
  const [search, setSearch] = useState("");

  const searchContent = data.filter(
    (x) =>
      x.fname.toLowerCase().includes(search.toLowerCase()) ||
      x.mname.toLowerCase().includes(search.toLowerCase()) ||
      x.lname.toLowerCase().includes(search.toLowerCase()) ||
      x.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Container maxWidth="xl" sx={{ padding: "40px" }}>
        <Box paddingBottom="1px">
          <TitleHeader title={Pagetitle} icon={""} />
        </Box>
        <Box>
          <Button
            onClick={() => {
              navigate("/evalutionForm");
            }}
            style={{ marginTop: "5px" }}
            size="small"
          >
            <ArrowBackIcon sx={{ fontSize: "small" }} /> BACK
          </Button>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", float: "right" }}
          >
            <SearchIcon
              fontSize="medium"
              sx={{ marginTop: "10px", marginRight: "5px", color: "#9BA4B5" }}
            />
            <TextField
              placeholder="Search.."
              size="medium"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Box>
        </Box>

        <List dense={dense} sx={{ marginTop: "20px" }}>
          {searchContent.length >= 1 ? (
            searchContent.map((row) => {
              return (
                <ListItem
                  secondaryAction={
                    <Box display="flex" sx={{ mx: 0 }}>
                      <Button
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                          navigate("/view/feedback/evalutionForm", {
                            state: {
                              data: row,
                            },
                          });
                        }}
                        size="small"
                        variant="contained"
                      >
                        View
                      </Button>
                    </Box>
                  }
                  style={{
                    backgroundColor: "#FFFBF5",
                    borderRadius: "5px",
                    marginBottom: "2px", // add margin bottom
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    padding: "20px",
                  }}
                >
                  {" "}
                  <ListItemAvatar>
                    <Avatar>{/*   <ChecklistIcon /> */}</Avatar>
                  </ListItemAvatar>{" "}
                  <ListItemText
                    secondary={
                      <span style={{ color: "#0A4D68" }}>
                        <span
                          style={{
                            fontSize: "11px",
                            textTransform: "uppercase",
                            color: "#146C94",
                            fontWeight: "bold",
                          }}
                        >
                          {eform
                            .filter((f) => f.id == row.FK_EFormID)
                            .map((ef) => {
                              return ef.title;
                            })}
                        </span>
                        <br />
                        {`${row.fname} ${row.mname} ${row.lname}`}
                        <br />
                        <span style={{ fontSize: "10px" }}>EVALUATOR</span>
                        <br />
                        {moment(row.submitted).format("MMMM Do YYYY, h:mma")}
                      </span>
                    }
                  />
                </ListItem>
              );
            })
          ) : (
            <Box textAlign={"center"} p={5}>
              <h4 style={{ color: "#088395" }}>
                No evaluation form found for :{" "}
                <span style={{ color: "#E74646" }}>{search}</span>
              </h4>
            </Box>
          )}
        </List>
      </Container>
    </div>
  );
};
