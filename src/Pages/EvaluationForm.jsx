import React, { useState, useEffect } from "react";
import { Container, Box, Grid, TextField, Button } from "@mui/material";
import TitleHeader from "../Components/TitleHeader";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { ManageEvaluation } from "./ManageEvaluation";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import { Edashboard_card } from "../Components/Edashboard_card";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { GetRequest } from "../API/Api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import InputAdornment from "@mui/material/InputAdornment";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ButtonComponent from "../Components/ButtonComponent";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { LoadingButton } from "@mui/lab";

export const EvaluationForm = () => {
  const [edata, setEdata] = useState([]);
  const [efeedback, setEfeedback] = useState([]);
  const [dense, setDense] = useState(false);
  const [useRs, setuseRs] = useState([]);
  const [search, setSearch] = useState();

  const navigate = useNavigate();

  const handleFetch = () => {
    GetRequest({ url: "api/evaluationList" })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setEdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    GetRequest({ url: "api/evaluationFeedback" })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setEfeedback(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    GetRequest({ url: "api/user" })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setuseRs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const today = new Date();
  today.setDate(today.getDate() - 3);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const USERS = search
    ? useRs.filter(
        (x) =>
          x.Name.toLowerCase().includes(search.toLowerCase()) ||
          x.email.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div>
      {" "}
      <Container maxWidth="xl" sx={{ padding: "40px" }}>
        <Box paddingBottom="1px">
          <TitleHeader
            title="Evaluation Forms"
            icon={<FormatListNumberedIcon sx={{ fontSize: "small" }} />}
          />
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            navigate(
              "/response/eform/5b269eec4711e2a01b15f8144cf9ae09e039710699a23de9080623676504e645",
              {
                state: {
                  userID: 2,
                },
              }
            );
          }}
        >
          Sample Form to answer
        </Button>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={3}>
            <Edashboard_card
              title={"Overall Response"}
              count={efeedback.length}
              icon={<CheckCircleOutlineIcon sx={{ fontSize: "60px" }} />}
              color={"#A4D0A4"}
            />
          </Grid>
          <Grid item xs={3}>
            <Edashboard_card
              title={"Forms"}
              count={edata.length}
              icon={<DynamicFeedIcon sx={{ fontSize: "60px" }} />}
              color={"#8294C4"}
            />
          </Grid>
          <Grid item xs={3}>
            <Edashboard_card
              title={"Items Most Evaluated"}
              count={223}
              icon={<DoneAllIcon sx={{ fontSize: "60px" }} />}
              color={"#19A7CE"}
            />
          </Grid>
          <Grid item xs={3}>
            <Edashboard_card
              title={"Items Least Evaluated"}
              count={223}
              icon={<RemoveDoneIcon sx={{ fontSize: "60px" }} />}
              color={"#E06469"}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={4}>
          <Grid item xs={7}>
            <Box
              sx={{
                padding: "20px",
                borderRadius: "10px",
                //   boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                height: "53vh",
                overflowY: "scroll",
              }}
            >
              <List dense={dense}>
                {edata.length >= 1 ? (
                  edata.map((row) => {
                    return (
                      <ListItem
                        secondaryAction={
                          <Box display="flex" sx={{ mx: 0 }}>
                            <h4>
                              {efeedback.filter(
                                (x) => x.FK_EFormID == row.id && x.status == 1
                              ).length >= 1 ? (
                                efeedback.filter(
                                  (x) => x.FK_EFormID == row.id && x.status == 1
                                ).length
                              ) : (
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "normal",
                                    color: "#E76161",
                                  }}
                                >
                                  No evaluation yet..
                                </span>
                              )}
                            </h4>
                          </Box>
                        }
                        style={{
                          backgroundColor: "#FFFBF5",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginBottom: "5px", // add margin bottom
                          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                          padding: "20px",
                        }}
                        onClick={() => {
                          if (
                            efeedback.filter(
                              (x) => x.FK_EFormID == row.id && x.status == 1
                            ).length >= 1
                          ) {
                            navigate("/userFeedback/evalutionForm", {
                              state: {
                                Efeedbacks: efeedback.filter(
                                  (x) => x.FK_EFormID == row.id && x.status == 1
                                ),
                                title: row.title,
                                eform: edata,
                                Pagetitle: row.title,
                              },
                            });
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <ChecklistIcon />
                          </Avatar>
                        </ListItemAvatar>{" "}
                        <ListItemText
                          secondary={
                            <span style={{ color: "#0A4D68" }}>
                              {row.title}
                            </span>
                          }
                        />
                      </ListItem>
                    );
                  })
                ) : (
                  <Box textAlign={"center"} p={5}>
                    <h4 style={{ color: "#088395" }}>
                      No Evaluation Form Yet..
                    </h4>
                  </Box>
                )}
              </List>
            </Box>
          </Grid>
          <Grid rid item xs={5}>
            <Box
              sx={{
                padding: "15px",
                backgroundColor: "#98D8AA",
                borderRadius: "10px",
                color: "#41644A",
                cursor: "pointer",
              }}
              mb={1}
              onClick={() => {
                navigate("/userFeedback/evalutionForm", {
                  state: {
                    Efeedbacks: efeedback.filter(
                      (x) => x.status == 1 && new Date(x.submitted) > today
                    ),
                    eform: edata,
                    Pagetitle: "New Responses",
                  },
                });
              }}
            >
              <h3>
                NEW RESPONSES
                <span
                  style={{ float: "right", fontSize: "25px", color: "#263A29" }}
                >
                  {
                    efeedback.filter(
                      (x) => x.status == 1 && new Date(x.submitted) > today
                    ).length
                  }
                </span>
              </h3>
            </Box>

            <Box
              sx={{
                padding: "15px",
                backgroundColor: "#FFABAB",
                borderRadius: "10px",
                color: "#E74646",
              }}
              mb={1}
            >
              <h3>
                PENDING EVALUATION
                <span
                  style={{ float: "right", fontSize: "25px", color: "#D21312" }}
                >
                  {efeedback.filter((x) => x.status == 0).length}
                </span>
              </h3>
            </Box>

            <Box
              sx={{
                borderRadius: "10px",
              }}
              mt={3}
              mb={3}
            >
              <TextField
                label="Search for Evaluators"
                id="outlined-start-adornment"
                fullWidth
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {" "}
                      <PersonSearchIcon sx={{ fontSize: "40px" }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* useRs */}
              <Box
                sx={{
                  padding: search ? "15px" : "",
                  height: search ? "310px" : "",
                  overflow: search ? "scroll" : "",
                }}
              >
                {search ? (
                  USERS.length >= 1 ? (
                    USERS.map((row) => {
                      const {
                        Name,
                        id: userID,
                        department,
                        email,
                        contact,
                      } = row;
                      return (
                        <Box>
                          {efeedback.filter((ef) => ef.FK_user_ID == userID)
                            .length >= 1 && (
                            <Box>
                              <Button
                                variant="contained"
                                size="small"
                                sx={{ float: "right", marginTop: "10px" }}
                                color="primary"
                                onClick={() => {
                                  if (
                                    efeedback.filter(
                                      (x) =>
                                        x.FK_EFormID == row.id &&
                                        x.status == 1 &&
                                        x.FK_user_ID == userID
                                    ).length >= 1
                                  ) {
                                    navigate("/userFeedback/evalutionForm", {
                                      state: {
                                        Efeedbacks: efeedback.filter(
                                          (x) =>
                                            x.status == 1 &&
                                            x.FK_user_ID == userID
                                        ),
                                        title: row.title,
                                        eform: edata,
                                        Pagetitle: Name,
                                      },
                                    });
                                  }
                                }}
                              >
                                View
                              </Button>

                              <Box sx={{ display: "flex" }}>
                                <Avatar
                                  alt={Name}
                                  src="/static/images/avatar/1.jpg"
                                  sx={{ width: 46, height: 46 }}
                                />
                                <div
                                  style={{
                                    marginTop: "10px",
                                    marginLeft: "7px",
                                  }}
                                >
                                  {Name}
                                  <br />
                                  <span style={{ fontSize: "13px" }}>
                                    {`${email} | ${contact} `}
                                    <br />
                                    {department}
                                  </span>
                                </div>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      );
                    })
                  ) : (
                    <h4
                      style={{
                        textAlign: "center",
                        marginTop: "50px",
                        fontWeight: "normal",
                      }}
                    >
                      No Matching Results <TroubleshootIcon />
                    </h4>
                  )
                ) : (
                  ""
                )}
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LoadingButton
                sx={{ color: "#146C94", fontWeight: "bold" }}
                onClick={() => {
                  navigate("/manage/evalutionForm");
                }}
                // loading={allitems.length >= 1 ? false : true}
                // disabled={allitems.length >= 1 ? false : true}
              >
                {" "}
                Manage Forms <SettingsIcon />
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
