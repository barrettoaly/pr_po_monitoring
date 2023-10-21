import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepIcon,
  Typography,
  useMediaQuery,
  Chip,
  Box,
  Button,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { useTheme } from "@mui/material/styles";
import {
  WarehouseOutlined,
  FactCheckOutlined,
  ShoppingCartCheckoutOutlined,
  ListAltOutlined,
  PriceCheckOutlined,
  AccountBalanceOutlined,
  ShoppingBagOutlined,
  CheckCircle,
  RotateLeft,
  Pending,
  LocalOfferOutlined,
} from "@mui/icons-material";
import * as Iconing from "@mui/icons-material";
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { Completed } from "../Completed";
import { GetRequest } from "../../API/api";
import moment from "moment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import ButtonComponent from "../ButtonComponent";

import PacmanLoader from "react-spinners/PacmanLoader";
const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1,
    color: "#D8D8D8",
    width: 45,
    height: 45,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #D8D8D8",
    "&.active": {
      color: "#0E185F",
      border: "3px solid #0E185F",
      // backgroundImage:
      //   "linear-gradient( 95deg,rgb(121, 120, 255) 0%,rgb(70, 73, 255) 50%,rgb(29, 28, 229) 100%)",
      // border: `2px solid ${theme.palette.tertiary.main}`,
    },
    "&.completed": {
      color: "white",
      backgroundColor: "#4BB543",
      border: "3px solid #4BB543",
      // backgroundImage:
      //   "linear-gradient( 95deg,rgb(100, 201, 135) 0%,rgb(57, 180, 142) 50%,rgb(8, 159, 143) 100%)",
      // backgroundColor: theme.palette.success.main,
    },
    "&.delay": {
      border: "3px solid #E76161",
      color: "#F55050",
      backgroundColor: "#FFF5B8",
    },
    "&.return": {
      border: "3px solid #E8AA42",
      color: "#85A389",
      backgroundColor: "#FFE7A0",
    },
    "&.cancel": {
      border: "3px solid #FFD95A",
      color: "#FFFAD7",
      backgroundColor: "#E76161",
    },
  },
  chip: {
    // marginLeft: theme.spacing(1),
    marginTop: 15,
    padding: 2,
    fontSize: 9,
    fontWeight: "bold",
    letterSpacing: 0.3,

    "&.active": {
      backgroundColor: "#ECF1FF",
      color: "#0E185F",
      fontSize: 10,
    },
    "&.completed": {
      backgroundColor: "#DDF7E3",
      color: "#4BB543",
    },
    "&.pending": {
      color: "grey",
    },
    "&.returned": {
      backgroundColor: "#F9FBE7",
      color: "#F79540",
    },
    "&.cancel": {
      backgroundColor: "#FFEADD",
      color: "#FF6666",
    },
  },
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(100, 201, 135) 0%,rgb(57, 180, 142) 50%,rgb(8, 159, 143) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "linear-gradient(to left, #56ab2f, #a8e063)",
      // backgroundImage:
      //   "linear-gradient( 95deg,rgb(100, 201, 135) 0%,rgb(57, 180, 142) 50%,rgb(8, 159, 143) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const CustomStepIcon = ({
  active,
  completed,
  icon,
  delay,
  legend,
  returned,
  cancelled,
}) => {
  const classes = useStyles();

  return (
    <div
      // style={{ backgroundColor: "#FFACAC" }}
      className={`${classes.root} ${active ? "active" : ""}${
        completed ? "completed" : ""
      } ${delay ? "delay" : ""} ${legend ? "legend" : ""} ${
        returned ? "return" : ""
      } ${cancelled ? "cancel" : ""}`}
    >
      <StepIcon icon={icon} key={icon} />
    </div>
  );
};

function StepperPR({
  stepperData,
  activeStep,
  orientation,
  onTouch,
  translogs,
  prTrans,
  prReceiveTrans,
  newTransRecords,
  NewlyCreatedPRdate,
  hideDelay,
  prReturnedTrans,
  completedPR,
  prdetails,
  ifcancelled,
  refresh,
  ValidateifCommonOffice,
}) {
  const theme = useTheme();
  const [status, setStatus] = "PENDING";
  const classStep = useStyles();
  const [timer, setTimer] = useState("----");
  const [timestamps, settimestamps] = useState();
  const isSmallScreen = useMediaQuery("(max-width: 870px)");

  const DateCreation = () => {
    if (
      prTrans.length >= 1 &&
      prTrans.filter(
        (x) => x.stageID == 2 && x.status == 3 && x.FK_role_ID == 7
      ).length >= 1
    ) {
      return NewlyCreatedPRdate.pr_date;
    }

    if (prReceiveTrans.length >= 1) {
      return prReceiveTrans[0].timestamp;
    }
  };

  const TimecapCreation = () => {
    if (
      prTrans.filter(
        (x) => x.stageID == 2 && x.status == 3 && x.FK_role_ID == 7
      ).length >= 1
    ) {
      return NewlyCreatedPRdate.timecap;
    } else {
      if (prReceiveTrans.length >= 1) {
        return prReceiveTrans[0].timecap;
      }
    }
  };
  const createdDate = new Date(DateCreation());

  const currentDate = new Date();

  const timecap = TimecapCreation();

  const adjustedDate = new Date(createdDate.getTime() + timecap * 60000); // Convert minutes to milliseconds (1 minute = 60000 milliseconds)

  const delayInMilliseconds = currentDate - adjustedDate;
  const delayInMinutes = Math.round(delayInMilliseconds / 60000);

  const days = Math.floor(delayInMinutes / 1440);
  const hours = Math.floor((delayInMinutes % 1440) / 60);
  const minutes = delayInMinutes % 60;

  let formattedDelay = "";
  if (days > 0) {
    formattedDelay += days + " day" + (days > 1 ? "s" : "") + " ";
  }
  if (hours > 0) {
    formattedDelay += hours + " hour" + (hours > 1 ? "s" : "") + " ";
  }
  if (minutes > 0) {
    formattedDelay += minutes + " minute" + (minutes > 1 ? "s" : "");
  }

  useEffect(() => {
    setTimer(false);
  }, [timer]);

  setInterval(() => {
    setTimer(true);
  }, 30000);

  const RenderIcon = (iconName) => {
    let IconComponent = Iconing[iconName];
    if (!IconComponent) {
      return <WarehouseOutlined sx={{ fontSize: 20 }} />;
    }
    return <IconComponent sx={{ fontSize: 20 }} />;
  };

  const stepperLine = () => {
    if (prTrans.length >= 1) {
      //morethan1
      if (prReturnedTrans.length >= 1) {
        return prTrans.length - prReturnedTrans.length;
      } else {
        if (prReceiveTrans.length >= 1) {
          return prTrans.length;
        }
        return prTrans.length + 1;
      }
    } else {
      return 1;
    }
  };

  return (
    <div>
      <Box mb={5}>
        <h5 style={{ textAlign: "center" }}>LEGEND</h5>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              marginLeft: "25px",
              padding: "10px",
              display: "block",
            }}
          >
            <CustomStepIcon legend={1} />
            <div
              style={{
                fontSize: "11px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              PENDING
            </div>
          </Box>
          <Box
            sx={{
              marginLeft: "45px",
              padding: "10px",
              display: "block",
            }}
          >
            <CustomStepIcon active={1} legend={1} />
            <div
              style={{
                fontSize: "11px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              ON PROGRESS
            </div>
          </Box>
          <Box
            sx={{
              marginLeft: "25px",
              padding: "10px",
              display: "block",
            }}
          >
            <CustomStepIcon active={1} legend={1} completed={2} delay={1} />
            <div
              style={{
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              DELAY
            </div>
          </Box>

          <Box
            sx={{
              marginLeft: "25px",
              padding: "10px",
              display: "block",
            }}
          >
            <CustomStepIcon
              active={1}
              legend={1}
              completed={2}
              delay={1}
              returned={1}
            />
            <div
              style={{
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              RETURNED
            </div>
          </Box>
          <Box
            sx={{
              marginLeft: "45px",
              textAlign: "center",
              padding: "10px",
              display: "block",
            }}
          >
            <CustomStepIcon legend={1} completed={2} />
            <div
              style={{
                fontSize: "11px",

                fontWeight: "bold",
              }}
            >
              COMPLETED
            </div>
          </Box>

          <Box
            sx={{
              marginLeft: "45px",
              textAlign: "center",
              padding: "10px",
              display: "block",
            }}
          >
            <CustomStepIcon legend={1} cancelled={2} />
            <div
              style={{
                fontSize: "11px",

                fontWeight: "bold",
              }}
            >
              CANCELLED
            </div>
          </Box>
        </Box>
      </Box>

      <Stepper
        sx={{
          display: "flex",
          fontSize: "12px",
        }}
        activeStep={
          ifcancelled.length >= 1
            ? stepperLine() - 1
            : ValidateifCommonOffice(stepperData && stepperData[1].stage_arr)
            ? stepperLine() - 1
            : stepperLine()
        }
        orientation={orientation}
        connector={<ColorlibConnector />}
        alternativeLabel
      >
        {stepperData ? (
          stepperData.map((step, index) => {
            const nwindex = index + 1;

            const activeStage = () => {
              if (stepperLine() == index) {
                if (prReceiveTrans.length >= 1 || prTrans.length >= 1) {
                  if (prTrans.filter((x) => x.stageID == step.stage_arr) >= 1) {
                    return false;
                  }
                }
                if (prReturnedTrans.length >= 1) {
                  return false;
                } else {
                  if (ifcancelled.length >= 1) {
                    if (
                      ifcancelled.filter((x) => x.stageID == step.stage_arr)
                        .length >= 1
                    ) {
                      return false;
                    }
                    return false;
                  }

                  return true;
                }
              }
              return false;
            };
            const completedStage = () => {
              if (step.default) {
                return true;
              }
              if (prReceiveTrans.length >= 1 || prTrans.length >= 1) {
                if (
                  prTrans.filter((x) => x.stageID == step.stage_arr).length >= 1
                ) {
                  if (
                    prReceiveTrans.filter((x) => x.stageID == step.stage_arr)
                      .length >= 1
                  ) {
                    return false;
                  }

                  if (ifcancelled.length >= 1) {
                    if (
                      ifcancelled.filter((x) => x.stageID == step.stage_arr)
                        .length >= 1
                    ) {
                      return false;
                    }
                    // return false;
                  }
                  return true;
                }
              }

              if (prReturnedTrans.length >= 1) {
                if (stepperLine() == index) {
                  return true;
                }
              }

              return false;
            };

            const delayStage = () => {
              if (delayInMinutes >= 1) {
                if (step.stage_arr == 2) {
                  if (stepperLine() == index) {
                    return true;
                  }
                }
                if (stepperLine() == index) {
                  return true;
                }
              }

              return false;
            };

            const returnStage = () => {
              if (prReturnedTrans.length >= 1) {
                if (prReturnedTrans[0].stageID == step.stage_arr - 1) {
                  return true;
                }
                if (prReturnedTrans[0].stageID - 1 == step.stage_arr - 1) {
                  return true;
                }
              }
              return false;
            };
            const cancelstage = () => {
              if (ifcancelled.length >= 1) {
                if (stepperLine() == index + 1) {
                  return true;
                }
              }
              return false;
            };

            const pendingChip = (typeofPend) => {
              return (
                <Chip
                  label={typeofPend}
                  className={`${classStep.chip} pending`}
                  size="small"
                  icon={<Pending style={{ color: "grey" }} />}
                />
              );
            };

            const onProgressChip = () => {
              return (
                <>
                  <Chip
                    label="In Progress"
                    className={`${classStep.chip} active`}
                    size="small"
                    icon={<RotateLeft style={{ color: "#0E185F" }} />}
                  />
                  <br />

                  {prReceiveTrans.length >= 1 && (
                    <>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#567189",
                        }}
                      >
                        {moment(prReceiveTrans[0].timestamp).format(
                          "[Date :] MM/DD/YYYY "
                        )}
                        <br />
                        {moment(prReceiveTrans[0].timestamp).format(
                          "[Time :] h:mma"
                        )}
                      </span>
                    </>
                  )}
                </>
              );
            };

            const completedChip = () => {
              return (
                <Chip
                  label={`Completed`}
                  className={`${classStep.chip} completed`}
                  size="small"
                  icon={<CheckCircle style={{ color: "#4BB543" }} />}
                />
              );
            };

            const cancelChip = () => {
              return (
                <Chip
                  label={`Cancelled`}
                  className={`${classStep.chip} cancel`}
                  size="small"
                  icon={<ErrorOutlineIcon style={{ color: "#FF6666" }} />}
                />
              );
            };

            const returnedChip = () => {
              return (
                <Chip
                  label={`RETURNED`}
                  className={`${classStep.chip} returned`}
                  size="small"
                  icon={<RotateLeft style={{ color: "#E76161" }} />}
                />
              );
            };
            const processChip = () => {
              return (
                <Chip
                  label="Reprocessing"
                  className={`${classStep.chip} active`}
                  size="small"
                  icon={<RotateLeft style={{ color: "#0E185F" }} />}
                />
              );
            };
            const PRStatusChips = () => {
              if (prTrans.length >= 1) {
                //moretrans

                if (step.default) {
                  return completedChip();
                }
                if (prReceiveTrans.length >= 1) {
                  if (
                    prReceiveTrans.filter((x) => x.stageID == index + 1)
                      .length >= 1
                  ) {
                    return onProgressChip();
                  }
                }

                if (prTrans.filter((x) => x.stageID == index + 1).length >= 1) {
                  if (
                    prReturnedTrans.length >= 1 &&
                    prReturnedTrans.filter((x) => x.stageID == index + 1)
                      .length >= 1
                  ) {
                    return processChip();
                  }

                  if (ifcancelled.length >= 1) {
                    if (
                      ifcancelled.filter((x) => x.stageID == step.stage_arr)
                        .length >= 1
                    ) {
                      return cancelChip();
                    }
                  }
                  return completedChip();
                }

                if (prTrans.filter((x) => x.stageID == index).length >= 1) {
                  if (prReceiveTrans.length >= 1) {
                    return pendingChip("Pending");
                  }

                  if (
                    prReturnedTrans.length >= 1 &&
                    prReturnedTrans.filter((x) => x.stageID == index).length >=
                      1
                  ) {
                    return returnedChip();
                  }

                  if (ifcancelled.length == 0) {
                    return pendingChip("For Receiving");
                  }
                }
              } else {
                // 1

                if (step.default) {
                  return completedChip();
                }
                if (prTrans.length + 1 == index) {
                  return pendingChip("For Receiving");
                }
              }
              return pendingChip("Pending");
            };

            const stepperUI = () => {
              return (
                <Step key={step.id}>
                  <StepLabel
                    StepIconComponent={() => (
                      <>
                        <CustomStepIcon
                          active={activeStage() ? 1 : 0}
                          completed={completedStage() ? 1 : 0}
                          icon={RenderIcon(step.icon)}
                          delay={delayStage()}
                          returned={returnStage()}
                          cancelled={cancelstage()}
                        />
                      </>
                    )}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: 9, sm: 9, md: 11, lg: 12.5 },
                        fontWeight: 600,
                      }}
                    >
                      {step.name}

                      {delayInMinutes >= 1 ? (
                        prReceiveTrans[0] &&
                        step.stage_arr == prReceiveTrans[0].stageID ? (
                          <>
                            <br />
                            <span
                              style={{
                                fontSize: "11px",
                                color: "grey",
                              }}
                            >
                              Delay For: <br />
                              <span
                                style={{ color: "#E76161", fontWeight: "bold" }}
                              >
                                {formattedDelay}
                              </span>
                            </span>
                          </>
                        ) : step.stage_arr ==
                          NewlyCreatedPRdate.stage_arr + 1 ? (
                          <>
                            <br />
                            {hideDelay ? (
                              ""
                            ) : (
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "grey",
                                }}
                              >
                                Delay For: <br />
                                <span
                                  style={{
                                    color: "#E76161",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {formattedDelay}
                                </span>
                              </span>
                            )}
                          </>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Box marginTop={0.5}>
                      <PRStatusChips />
                      <br />

                      {index === 0 && (
                        <>
                          {" "}
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "#567189",
                            }}
                          >
                            PR-Date :{" "}
                            {prdetails[0] ? prdetails[0].pr_date : "--/--/--"}
                          </span>
                        </>
                      )}
                      {ifcancelled.length >= 1 &&
                        ifcancelled[0].stageID == index + 1 && (
                          <>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                                color: "#567189",
                              }}
                            >
                              {moment(ifcancelled[0].timestamp).format(
                                "[Date :] MM/DD/YYYY "
                              )}
                              <br />
                              {moment(ifcancelled[0].timestamp).format(
                                "[Time :] h:mma"
                              )}
                            </span>
                          </>
                        )}
                      {prReturnedTrans.length >= 1 &&
                        prReturnedTrans[0].stageID == index && (
                          <>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                                color: "#567189",
                              }}
                            >
                              Return Date: <br />
                              {moment(prReturnedTrans[0].timestamp).format(
                                "[Date :] MM/DD/YYYY "
                              )}
                              <br />
                              {moment(prReturnedTrans[0].timestamp).format(
                                "[Time :] h:mma"
                              )}
                            </span>
                          </>
                        )}
                      {prTrans.filter((x) => x.stageID == step.stage_arr)
                        .length >= 1 && (
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#567189",
                          }}
                        >
                          {completedPR
                            .filter((e) => e.stageID == step.stage_arr)
                            .map((r) => {
                              return (
                                <>
                                  {moment(r.timestamp).format(
                                    "[Date :] MM/DD/YYYY"
                                  )}
                                  <br />
                                  {moment(r.timestamp).format("[Time :] h:mma")}
                                </>
                              );
                            })}
                        </span>
                      )}
                    </Box>
                  </StepLabel>
                </Step>
              );
            };
            return ValidateifCommonOffice(step.stage_arr) ? null : stepperUI();
          })
        ) : (
          <PacmanLoader color="#36d7b7" />
        )}
      </Stepper>
    </div>
  );
}

export default StepperPR;
