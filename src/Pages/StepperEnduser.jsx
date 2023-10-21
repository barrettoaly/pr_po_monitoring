import React, { useEffect, useState } from "react";
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
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { Completed } from "../Components/Completed";
import ButtonComponent from "../Components/ButtonComponent";
import * as Iconing from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1,
    color: "#ffffff",
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
      color: (props) => (props ? "" : "#4BB543"),
      backgroundColor: (props) => (props ? "#4BB543" : ""),
      border: "3px solid #4BB543",
      // backgroundImage:
      //   "linear-gradient( 95deg,rgb(100, 201, 135) 0%,rgb(57, 180, 142) 50%,rgb(8, 159, 143) 100%)",
      // backgroundColor: theme.palette.success.main,
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

const steps = [
  {
    id: 0,
    label: "All Purchase Request",
    icon: <ShoppingBagOutlined sx={{ fontSize: 20 }} />,
    duration: 31, //Days
  },
  {
    id: 1,
    label: "Create Purchase Request",
    icon: <ShoppingBagOutlined sx={{ fontSize: 20 }} />,
    duration: 31, //Days
  },
  {
    id: 2,
    label: "MMS Approval",
    icon: <WarehouseOutlined sx={{ fontSize: 20 }} />,
    duration: 31,
  },
  {
    id: 3,
    label: "Procurement Approval",
    icon: <FactCheckOutlined sx={{ fontSize: 20 }} />,
    duration: 31,
  },
  {
    id: 4,
    label: "Budget: CAF",
    icon: <ListAltOutlined sx={{ fontSize: 20 }} />,
    duration: 31,
  },
  {
    id: 5,
    label: "Accounting",
    icon: <AccountBalanceOutlined sx={{ fontSize: 20 }} />,
    duration: 31,
  },
  {
    id: 6,
    label: "Finance: Budget Approval",
    icon: <PriceCheckOutlined sx={{ fontSize: 20 }} />,
    duration: 31,
  },
  {
    id: 7,
    label: "Procurement : Bidding",
    icon: <LocalOfferOutlined sx={{ fontSize: 20 }} />,
    duration: 31,
  },
  {
    id: 8,
    label: "Procurement : Register PO",
    icon: <ShoppingCartCheckoutOutlined sx={{ fontSize: 20 }} />,
    duration: 31,
  },
];

const CustomStepIcon = ({ active, completed, icon, isSelected }) => {
  const classes = useStyles(isSelected);
  return (
    <div
      className={`${classes.root} ${active ? "active" : ""}${completed ? "completed" : ""
        }`}
    >
      {/* <ButtonComponent
        action={onClick}
        name={<StepIcon icon={icon} key={icon} />}
      /> */}

      <StepIcon icon={icon} key={icon} />
    </div>
  );
};

function StepperEnduser({
  activeStep,
  orientation,
  enduser,
  onTouch,
  rows,
  stepperData,
}) {
  const theme = useTheme();
  const [status, setStatus] = "PENDING";
  const [selectedStep, setSelectedStep] = useState(0);
  const classStep = useStyles();

  const isSmallScreen = useMediaQuery("(max-width: 870px)");
  const RenderIcon = (iconName) => {
    let IconComponent = Iconing[iconName];
    if (!IconComponent) {
      return <WarehouseOutlined sx={{ fontSize: 20 }} />;
    }
    return <IconComponent sx={{ fontSize: 20 }} />;
  };

  return (
    <div>
      {/* <Typography
        sx={{
          fontSize: 12,
          fontWeight: "bold",
          color: theme.palette.tertiary.main,
        }}
      >
        Your PR is waiting for approval from MMS.
      </Typography> */}
      <Stepper
        sx={{
          display: "flex",
          fontSize: "12px",
        }}
        activeStep={steps.length}
        orientation={orientation}
        connector={<ColorlibConnector />}
        alternativeLabel
      >
        {stepperData &&
          stepperData.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel
                  sx={enduser && { "&:hover": { cursor: "pointer" } }}
                  onClick={
                    enduser &&
                    (() => {
                      onTouch(step);
                      setSelectedStep(index);
                    })
                  }
                  StepIconComponent={() => (
                    <CustomStepIcon
                      active={activeStep === index}
                      completed={
                        enduser ? activeStep === activeStep : activeStep > index
                      }
                      icon={RenderIcon(step.icon)}
                      isSelected={selectedStep == index}
                    />
                  )}
                // completed={activeStep > index}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 9, sm: 9, md: 11, lg: 12.5 },
                      fontWeight: 600,
                    }}
                  >
                    {step.stage_arr == 1 ? "All Purchase Request" : step.name}
                  </Typography>

                  {enduser && step.stage_arr == 1 ? (
                    <>
                      <Chip
                        sx={{
                          ".MuiChip-label": {
                            border: "1px solid #4BB543",
                            borderRadius: "20px",
                            fontSize: "1rem",
                          },
                        }}
                        label={rows.length}
                        className={`${classStep.chip} completed`}
                      // size="small"
                      // icon={<CheckCircle style={{ color: "#4BB543" }} />}
                      />
                    </>
                  ) : rows.filter((x) => x.stageID == step.id - 1).length ? (
                    <>
                      <Chip
                        sx={{
                          ".MuiChip-label": {
                            border: "1px solid #4BB543",
                            borderRadius: "20px",
                            fontSize: "1rem",
                          },
                        }}
                        label={
                          rows.filter((x) => x.stageID == step.id - 1).length
                        }
                        className={`${classStep.chip} completed`}
                      // size="small"
                      // icon={<CheckCircle style={{ color: "#4BB543" }} />}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </StepLabel>
                {/* <StepContent>
                        <Typography>{step.description}</Typography>
                      </StepContent> */}
              </Step>
            );
          })}
      </Stepper>
    </div>
  );
}

export default StepperEnduser;
