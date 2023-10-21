import React, { useEffect, useState, useRef } from "react";
import StepperPR from "../Components/purchasereqs/StepperPR.jsx";
import PRForm from "../Components/purchasereqs/PRForm.jsx";
import {
  Container,
  Button,
  Typography,
  useTheme,
  Box,
  Link,
  Grid,
  Grow,
  Alert,
  CircularProgress,
  InputBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  useStepContext,
} from "@mui/material";
import { Divider } from "@material-ui/core";
import {
  ChevronLeft,
  ManageAccounts,
  Update,
  ListAltOutlined,
  MessageOutlined,
} from "@mui/icons-material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { GetRequest, PostRequest } from "../API/Api.jsx";
import moment from "moment";
import Lottie from "react-lottie";
import { useController } from "../Context/DataContext.jsx";
import approve from "../Assets/animation/87833-approved.json";
import process from "../Assets/animation/119376-document-processing.json";
import approve2 from "../Assets/animation/74898-success-feedback-approved.json";
import { TransLogs } from "../Components/Popups/TransLogs.jsx";
import VerticalStepper from "../Components/purchasereqs/VerticalStepper.jsx";

import Swal from "sweetalert2";
import SelectComponent from "../Components/FormControl/CustomSelect.jsx";
import RemarksTimeline from "../Components/purchasereqs/RemarksTimeline.jsx";

import InputComponent from "../Components/FormControl/InputComponent.jsx";
import ButtonComponent from "../Components/ButtonComponent.jsx";
import DrawerComponent from "./DrawerComponent.jsx";

import SortIcon from "@mui/icons-material/Sort";

import CAFList from "../Components/purchasereqs/CAFList.jsx";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import MuiChip from "./MuiChip.jsx";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import Joi from "joi";
import { border, fontSize } from "@mui/system";

import { validateAndSetAmountNumber } from "../utility/validateAndSetAmountNumber.jsx";
import {
  ReturnedORiginUI,
  CancelledUI,
  CompletedUI,
  ApprovedlastUI,
  ReceivedLastUI,
  onBiddingUI,
} from "../Components/StepperStatus.jsx";
import {
  handleComplete,
  handleOnBId,
  handleReceive,
  handleSend,
  handleActions,
} from "../Functions/TrackPR.jsx";
function TrackPR(props) {
  const { user } = useController();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showRemarks, setShowRemarks] = useState(false);
  const [showDropdown, setShowsDropdown] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("error");
  const [alertMessage, setAlertmessage] = useState("");
  const [action, setAction] = useState("");
  const [prNo, setPRNo] = useState(location.state.prno);
  const [relid, setRelid] = useState(location.state.relid);
  const [prData, setPRDATA] = useState(location.state.data);
  const [newTransRecords, setNewTransrecords] = useState([]);
  const [hideDelay, setHideDelay] = useState(false);
  const [prTrans, setPrtrans] = useState([]);
  const [prReceiveTrans, setPrreceive] = useState([]);
  const [prReturnedTrans, setPrReturnedTrans] = useState([]);
  const [NewlyCreatedPRdate, setNewlycreatedPrdate] = useState("");
  const [po, setPO] = useState("");
  const [caf, setCaf] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [translogs, setTranslogs] = useState([]);
  const [ifcancelled, setIfCAncelled] = useState([]);

  const [allTransLogs, setallTranslogs] = useState([]);
  const [completedPR, setCompletedPR] = useState([]);
  const [stepperData, setStepperData] = useState(null);
  const [selectedbtn, setSelectBtn] = useState();
  //This field is for details based on clicked stage
  const [RemarksContent, setRemarksContent] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [prlogs, setPrlogs] = useState([]);
  const [remarks, setRemarks] = useState("");

  //Form Fields state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cafNumber, setCafNumber] = useState("");
  const [amountNumber, setAmountInNumber] = useState("");
  // const [amountWord, setAmountInWord] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [positionOne, setPosition1] = useState("");
  const [positionTwo, setPosition2] = useState("");
  const [positionThree, setPosition3] = useState("");
  const [prNumber, setPrNumber] = useState("");
  const [fundSource, setFundSource] = useState("");
  const [validity, setValidity] = useState("");
  const [prdetails, setPrdetails] = useState([]);
  const [fundClusters, setFundClusters] = useState([]);
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    caf_number: Joi.string().required().label("CAF Number"),
    amount_number: Joi.number().required().label("Amount"),
    // amount_word: Joi.number().required().label("Amount"),
    product_details: Joi.string().required().label("Product Details"),
    position_one: Joi.string()
      .required()
      .label("Supervising Admin Officer Budget"),
    position_two: Joi.string().required().label("Accountant IV"),
    position_three: Joi.string()
      .required()
      .label("Financial & Management Officer II"),
    pr_number: Joi.string().required().label("PR Number"),
    fund_source: Joi.string().required().label("Fund Source"),
    validity: Joi.string().required().label("Validity"),
    pr_id: Joi.string().required(),
  });

  let date = null;
  let name = null;
  let role = null;

  const data = [
    { id: 1, name: "Competitive Bidding" },
    { id: 2, name: "Bidding" },
  ];

  if (location.state) {
    date = location.state.date;
    name = location.state.name;
    role = location.state.role;
  }

  const animation = {
    loop: 1,
    autoplay: true,
    animationData: status === "COMPLETE" ? approve : process,
  };

  const animationApprove = {
    loop: 1,
    autoplay: true,
    animationData: approve2,
  };

  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  const ValidateifCommonOffice = (step) => {
    if (prData.commonoffice == 0) {
      if (step == 2) {
        return true;
      }
    }
    return false;
  };
  const activeStep = "";
  function renderButton(status, action) {
    return (
      <Button
        variant="contained"
        onClick={() => {
          setSelectBtn(status);
          status === 1
            ? user.role === 4 || user.role === 5
              ? (setShowsDropdown(true), handleButtonClick(1))
              : handleSend(relid, setRefresh, setHideDelay)
            : status === 2
            ? handleReceive(relid, setRefresh)
            : status === 3
            ? (setAction(3), setShowRemarks(true), handleButtonClick(3))
            : status === 4
            ? (setAction(3), setShowRemarks(true), handleButtonClick(4))
            : status === 5
            ? (setAction(3), setShowRemarks(true), handleButtonClick(5))
            : status === 6
            ? handleDialogOpen()
            : status === 7
            ? handleOnBId(relid, setRefresh)
            : status === 8
            ? handleComplete(relid, setRefresh)
            : "";
        }}
        size="small"
        sx={{
          backgroundColor:
            status === 1
              ? theme.palette.chartColor.blue
              : status === 2
              ? // || status === 5
                theme.palette.tertiary.successDark
              : status === 3 || status === 4
              ? theme.palette.tertiary.error
              : status === 6
              ? theme.palette.tertiary.warning
              : status === 8
              ? theme.palette.tertiary.successDark
              : "",
          borderRadius: 1.5,

          align: "right",

          "&:hover": {
            backgroundColor: theme.palette.tertiary.main,
          },
          fontSize: 12,
        }}
        fullWidth
        disabled={selectedButton !== null && selectedButton !== status}
      >
        {status === 1
          ? "Send PR"
          : status === 2
          ? "Receive PR"
          : status === 3
          ? "Return PR"
          : status === 4
          ? "Cancel PR"
          : status === 5
          ? "Attach Remarks"
          : // : status === 5
          // ? "Generate CAF"
          status === 6
          ? "Generate CAF"
          : status === 7
          ? "Receive and Mark as OnBidding"
          : status === 8
          ? "Register PO"
          : ""}
      </Button>
    );
  }

  const renderApprovalStatus = () => {
    const count = prTrans.length - 1;

    if (prTrans.length >= 1) {
      if (user.role == 3) {
        if (prReturnedTrans.length >= 1) {
          return ReturnedORiginUI();
        }

        if (ifcancelled.length >= 1) {
          return CancelledUI(prTrans);
        }

        if (stepperData) {
          if (stepperData.length == prTrans.length + 1) {
            return CompletedUI(animationApprove, prTrans);
          }
        }

        if (prTrans[prTrans.length - 1].onBid == 1 && user.role != 4) {
        } else {
          return ReceivedLastUI(prTrans);
        }

        if (prTrans[prTrans.length - 1].onBid == 1) {
          return onBiddingUI();
        }
        return ApprovedlastUI(animationApprove, prTrans);
      }

      if (prReceiveTrans.length == 0) {
        if (prTrans.filter((p) => p.FK_role_ID == user.role).length >= 1) {
          if (prReturnedTrans.length >= 1) {
            if (
              prReturnedTrans.filter((r) => r.UserRole == user.role).length >= 1
            ) {
              return (
                <>
                  <Box
                    sx={{
                      justifyContent: "space-between",
                    }}
                    display="flex"
                    gap={1}
                  >
                    {" "}
                    {renderButton(1)}
                    {renderButton(5)}
                  </Box>
                </>
              );
            } else {
              return ReturnedORiginUI();
            }
          } else {
            if (
              prTrans.filter(
                (x) =>
                  x.status == 3 &&
                  x.lp == 0 &&
                  x.FK_PR_relation == relid &&
                  x.FK_role_ID == user.role &&
                  x.active == 0
              ).length >= 1
            ) {
              return (
                <>
                  <Box
                    sx={{
                      justifyContent: "space-between",
                    }}
                    display="flex"
                    gap={1}
                  >
                    {renderButton(1)}
                    {prTrans.filter((x) => x.FK_role_ID == user.role).length >=
                    1
                      ? ""
                      : renderButton(3)}
                    {renderButton(4)}
                    {renderButton(5)}
                    {/* {renderButton(6)} */}
                  </Box>
                </>
              );
            } else {
              if (ifcancelled.length >= 1) {
                return CancelledUI(prTrans);
              } else {
                if (stepperData) {
                  if (stepperData.length == prTrans.length + 1) {
                    return CompletedUI(animationApprove, prTrans);
                  }
                }

                if (prTrans[prTrans.length - 1].FK_role_ID == user.role) {
                  return (
                    <>
                      <Typography
                        sx={{
                          fontSize: 13,
                          textAlign: "center",
                          pt: 2,
                        }}
                      >
                        <Lottie
                          options={animationApprove}
                          height={100}
                          width={100}
                        />
                        Approved last{" "}
                        <strong>
                          {moment(
                            prTrans[prTrans.length - 1].trans_created
                          ).format("LLL")}
                        </strong>{" "}
                        <br />
                        by {prTrans[prTrans.length - 1].userprofile}.
                      </Typography>
                    </>
                  );
                }

                if (prTrans[prTrans.length - 1].onBid == null) {
                  if (user.role !== 4) {
                    if (
                      prTrans[0].stageID !==
                      stepperData[stepperData.length - 3].stage_arr
                    ) {
                      return ApprovedlastUI(animationApprove, prTrans);
                    }
                  }

                  return renderButton(7);
                }
                return "Loading";
              }
            }
          }
        }
      } else {
        if (
          prTrans.filter(
            (x) =>
              x.status == 3 &&
              x.lp == 0 &&
              x.FK_PR_relation == relid &&
              x.FK_role_ID == user.role &&
              x.active == 0
          ).length >= 1
        ) {
          return (
            <>
              {prTrans[prTrans.length - 1].onBid == 1 ? (
                user.role == 4 && <>{renderButton(8)}</>
              ) : (
                <Box
                  sx={{
                    justifyContent: "space-between",
                  }}
                  display="flex"
                  gap={1}
                >
                  {renderButton(1)}
                  {prTrans.filter(
                    (x) => x.FK_role_ID == user.role && x.return == 1
                  ).length >= 1
                    ? prReceiveTrans.length >= 1
                      ? prReceiveTrans[0].return == 1
                        ? ""
                        : ValidateifCommonOffice(
                            stepperData && stepperData[1].stage_arr
                          ) && user.role == 4
                        ? null
                        : renderButton(3)
                      : //
                        ""
                    : ""}
                  {renderButton(4)}
                  {renderButton(5)}
                  {user.role === 5 && renderButton(6)}
                </Box>
              )}
            </>
          );
        } else {
          if (ifcancelled.length >= 1) {
            return CancelledUI(prTrans);
          } else {
            return (
              <>
                <Typography
                  sx={{
                    fontSize: 13,
                    textAlign: "center",
                    pt: 2,
                  }}
                >
                  {prTrans.length >= 1
                    ? prTrans[prTrans.length - 1].onBid == 1 && user.role != 4
                      ? onBiddingUI()
                      : ReceivedLastUI(prTrans)
                    : ApprovedlastUI(animationApprove, prTrans)}
                </Typography>
              </>
            );
          }
        }
      }

      if (ifcancelled.length >= 1) {
        return CancelledUI(prTrans);
      }

      if (user.role == 8) {
        if (
          prTrans[prTrans.length - 1].stageID != 6 &&
          prTrans[prTrans.length - 1].status != 2
        ) {
          return ApprovedlastUI(animationApprove, prTrans);
        }
      }

      return (
        <Box
          sx={{
            justifyContent: "space-between",
          }}
          display="flex"
          gap={1}
        >
          {/* 
        1 = send
        2= receive
        3=return
        4 = cancel
        5 =attach remarks
        6= generate caf
      */}
          {renderButton(2)}
          {renderButton(5)}
        </Box>
      );
    } else {
      return (
        <>
          {/* 
            1 = send
            2= receive
            3=return
            4 = cancel
            5 =attach remarks
            6= generate caf
          */}

          {prReceiveTrans.length >= 1 || newTransRecords.length >= 1 ? (
            <>
              {renderButton(1)}
              {prTrans.length >= 1
                ? renderButton(3)
                : stepperData.filter(
                    (x) => x.return == 0 && [user.role].includes(x.roles)
                  ).length >= 1 && ""}
              {renderButton(4)}
              {renderButton(5)}
            </>
          ) : user.role == 3 || user.role == 8 ? (
            <>
              <Typography
                sx={{
                  fontSize: 13,
                  textAlign: "center",
                  pt: 2,
                }}
              >
                <Box>
                  <PendingActionsIcon
                    sx={{ fontSize: "80px", color: "#F86F03" }}
                  />
                  <br />
                  <strong>PENDING PURCHASE REQUEST</strong>
                </Box>
              </Typography>
            </>
          ) : (
            <>
              <Box
                sx={{
                  justifyContent: "space-between",
                }}
                display="flex"
                gap={1}
              >
                {" "}
                {renderButton(2)}
                {renderButton(5)}
              </Box>
            </>
          )}
        </>
      );
    }
  };

  //back button
  function handleGoBack() {
    if (user.role == 8) {
      navigate("/dashboard");
    } else {
      navigate("/purch-requests");
    }
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  //close button dialog
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCafNumber(cafNumber);
    setErrors({});
    setIsDialogOpen(false);
  };

  //error message
  const handleShowError = () => {
    setShowError(true);
  };

  const fetchStepperData = () => {
    ///TESTING PRID 31
    GetRequest({ url: `/api/pr_stage` }).then((res) => {
      setStepperData(res.data.data);
    });
  };

  const fetchData = () => {
    return GetRequest({ url: `/api/fundcluster` })
      .then((res) => {
        const {
          data: { data },
        } = res;
        setFundClusters(data);
      })
      .catch((error) => console.log(error));
  };

  //fetch pr data
  1;

  const fetchStatus = () => {
    GetRequest({ url: `/api/purchase_relation/fetch/${id}` })
      .then((res) => {
        const {
          data: { data },
        } = res;
        setTranslogs(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  //relid

  const fetchTransStatus = () => {
    GetRequest({ url: `/api/purchase_relation/fetchTransStatus/${relid}` })
      .then((res) => {
        const {
          data: { data },
        } = res;
        setPrtrans(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchReceiveTrans = () => {
    GetRequest({
      url: `/api/purchase_relation/fetchReceiveTransStatus/${relid}`,
    })
      .then((res) => {
        const {
          data: { data },
        } = res;
        setPrreceive(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchFirstCreatedDatePR = () => {
    GetRequest({
      url: `/api/purchase_relation/fetchFirstCreateddate/${relid}`,
    })
      .then((res) => {
        const {
          data: {
            data: [{ pr_date, timecap, stage_arr }],
          },
        } = res;

        if (prReceiveTrans.length >= 1) {
          setNewlycreatedPrdate("");
        } else {
          setNewlycreatedPrdate({
            pr_date: pr_date,
            stage_arr: stage_arr,
            timecap: timecap,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const fetchNewTrans = () => {
    GetRequest({
      url: `/api/purchase_relation/fetchNEWTransStatus/${relid}`,
    })
      .then((res) => {
        const {
          data: { data },
        } = res;

        setNewTransrecords(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchRemarksContent = () => {
    GetRequest({
      url: `/api/purchase_relation/fetchRemarksCOntent/${relid}`,
    })
      .then((res) => {
        const {
          data: { data },
        } = res;

        setRemarksContent(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchReturnedPR = () => {
    GetRequest({
      url: `/api/purchase_relation/fetchReturnedPR/${relid}`,
    })
      .then((res) => {
        const {
          data: { data },
        } = res;
        setPrReturnedTrans(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchCompletedPR = () => {
    GetRequest({
      url: `/api/purchase_relation/fetchCompletedPR/${relid}`,
    })
      .then((res) => {
        const {
          data: { data },
        } = res;
        setCompletedPR(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchPRdetails = () => {
    GetRequest({
      url: `/api/purchase_relation/fetchDetailPR/${relid}`,
    })
      .then((res) => {
        const {
          data: { data },
        } = res;
        setPrdetails(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchifCancelled = () => {
    GetRequest({
      url: `/api/purchase_relation/fetchifCancelled/${relid}`,
    })
      .then((res) => {
        const {
          data: { data },
        } = res;
        setIfCAncelled(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchTransactionLogs = () => {
    GetRequest({
      url: `/api/purchase_relation/fetchTransactionLogs/${relid}`,
    })
      .then((res) => {
        const {
          data: { data },
        } = res;
        setallTranslogs(data);
        // console.log(translogs);
      })
      .catch((error) => console.log(error));
  };

  const fetchPRData = () => {
    GetRequest({ url: `/api/purchase_relation/${id}` })
      .then((res) => {
        const {
          data: { data },
        } = res;
        const {
          status,
          pr_number,
          mms_approval,
          procurement_approval,
          budget_approval,
          accounting_approval,
          finance_approval,
          bidding_status,
          po_status,
          funds,
        } = data[0];
        //setStatus(status);

        setMMS(mms_approval);
        setProc(procurement_approval);
        setBudget(budget_approval);
        setAcct(accounting_approval);
        setFinance(finance_approval);
        setBidding(bidding_status);
        setPO(po_status);
        setCaf(funds);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchFirstCreatedDatePR();
  }, [fetchFirstCreatedDatePR]);
  useEffect(() => {
    // console.log(user.role);
    fetchPRData();
    fetchStatus();
    fetchStepperData();
    fetchTransStatus();
    fetchReceiveTrans();
    fetchNewTrans();
    fetchReturnedPR();
    fetchRemarksContent();
    fetchCompletedPR();
    fetchPRdetails();
    fetchifCancelled();
    fetchTransactionLogs();
    setRefresh(false);
    setShowsDropdown(false);
    setSelectedButton(null);
  }, [refresh]);

  //validation for amount, user can type number/integer only
  const setAmountNumber = (value) => {
    validateAndSetAmountNumber(value, setAmountInNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      caf_number: cafNumber,
      amount_number: amountNumber,
      product_details: productDetails,
      position_one: positionOne,
      position_two: positionTwo,
      position_three: positionThree,
      pr_number: prNo,
      fund_source: fundSource,
      validity: validity,
      pr_id: id,
    };

    //Validation
    const { error } = schema.validate(formData, { abortEarly: false });

    if (error) {
      const validationErrors = {};
      error.details.forEach((err) => {
        validationErrors[err.path[0]] = err.message;
      });
      handleDialogOpen();
      setErrors(validationErrors);

      return;
    }

    // Clear any previous validation errors
    setErrors({});

    // console.log(Object.fromEntries(formData));

    // Post Request
    PostRequest({ url: `api/fundcluster` }, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log("fetchs");
        // console.log(res.data);
        fetchData();

        //close dialog
        handleClose();

        //clear input fields
        setCafNumber("");
        setAmountInNumber("");
        setProductDetails("");
        setPosition1("");
        setPosition2("");
        setPosition3("");
        setPrNumber("");
        setFundSource("");
        setValidity("");

        //Fire a SweetAlert after submission
        Swal.fire({
          title: "Success",
          text: "Data submitted successfully",
          icon: "success",
          timer: 4000, // Optional: automatically close the alert after 2 seconds
        });

        //fetch fund cluster updated
        fetchFundClusters();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally();
  };

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen);

    PostRequest(
      { url: `api/prlogs/${relid}` },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => {
        const data = res.data.data;
        data?.map((datalog) => datalog.data);
        setPrlogs(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleExportCaf = async (e, data) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/fundcluster/export/${data.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const buffer = await response.arrayBuffer();

      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.caf_number}.docx`;

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.secondary.lightGray,
      }}
    >
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress
            size={50}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      ) : (
        <>
          <Dialog
            open={isDialogOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            fullWidth="md"
            maxWidth="md"
          >
            <form onSubmit={handleSubmit}>
              <DialogTitle>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                >
                  <strong>Generate CAF</strong>
                  <span sx={{ marginLeft: "auto" }}>
                    PR NO. <strong>{prNo}</strong>
                  </span>
                </Box>

                <Divider sx={{ marginTop: 2 }} />
              </DialogTitle>

              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputComponent
                      width="100%"
                      type="text"
                      value={cafNumber}
                      label="CAF Number"
                      placeholder="CAF Number"
                      error={errors.caf_number ? true : false}
                      setValue={setCafNumber}
                      style={
                        errors.caf_number ? { border: "2px solid red" } : {}
                      }
                    />
                    {errors.caf_number && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        {errors.caf_number}
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <InputComponent
                      width="100%"
                      type="readOnly"
                      value={amountNumber}
                      label="Amount"
                      placeholder="Amount"
                      error={errors.amount_number ? true : false}
                      setValue={setAmountNumber}
                    />
                    {errors.amount_number && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        {errors.amount_number}
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <InputComponent
                      width="100%"
                      type="text"
                      value={productDetails}
                      label="Product Details"
                      placeholder="Product Details"
                      error={errors.product_details ? true : false}
                      multiline={true}
                      rows={3}
                      setValue={setProductDetails}
                    />
                    {errors.product_details && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        {errors.product_details}
                      </span>
                    )}
                  </Grid>
                </Grid>
                <Divider style={{ marginBottom: 20 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputComponent
                      width="100%"
                      type="text"
                      value={fundSource}
                      label="Fund Source"
                      placeholder="Fund Source"
                      error={errors.fund_source ? true : false}
                      setValue={setFundSource}
                    />

                    {errors.fund_source && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        {errors.fund_source}
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <InputComponent
                      width="100%"
                      type="text"
                      value={validity}
                      label="Validity "
                      multiline={true}
                      rows={3}
                      error={errors.validity ? true : false}
                      placeholder="Validity"
                      setValue={setValidity}
                    />
                    {errors.validity && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        {errors.validity}
                      </span>
                    )}
                  </Grid>
                </Grid>

                <Divider style={{ marginBottom: 20 }} />

                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                  Certified By:
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <InputComponent
                      width="100%"
                      type="text"
                      value={positionOne}
                      label="Supervising Admin Officer Budget"
                      placeholder="Supervising Admin Officer Budget"
                      error={errors.position_one ? true : false}
                      setValue={setPosition1}
                    />

                    {errors.position_one && (
                      <span
                        style={{ color: "red", fontSize: "13px" }}
                        className="error"
                      >
                        {errors.position_one}
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    <InputComponent
                      width="100%"
                      type="text"
                      value={positionTwo}
                      label="Accountant IV"
                      placeholder="Accountant IV"
                      error={errors.position_two ? true : false}
                      setValue={setPosition2}
                    />
                    {errors.position_two && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        {errors.position_two}
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    <InputComponent
                      width="100%"
                      type="text"
                      value={positionThree}
                      label="Financial & Management Officer II"
                      placeholder="Financial & Management Officer II"
                      error={errors.position_three ? true : false}
                      setValue={setPosition3}
                    />
                    {errors.position_three && (
                      <span style={{ color: "red", fontSize: "14px" }}>
                        {errors.position_three}
                      </span>
                    )}
                  </Grid>
                </Grid>

                <Divider style={{ marginBottom: 20 }} />

                <DialogActions>
                  <ButtonComponent
                    style={{ fontSize: 1 }}
                    width={100}
                    name="Cancel"
                    action={handleClose}
                    variant="outlined"
                    color="secondary"
                    size="large"
                  />

                  <ButtonComponent
                    width={100}
                    name="Submit"
                    action={handleClose}
                    variant="contained"
                    color="success"
                    type="submit"
                    size="large"
                  />
                </DialogActions>
              </DialogContent>
            </form>
          </Dialog>

          {/* TRACK PR */}
          <Container maxWidth="xl" sx={{ padding: "40px" }}>
            <Box display="flex" alignItems="center" pt={8} pb={5}>
              <ChevronLeft
                color={theme.palette.tertiary.main}
                style={{ fontSize: 15 }}
              />
              {user.role == 8 ? (
                <Link
                  underline="none"
                  onClick={handleGoBack}
                  sx={{
                    ":hover": { textDecoration: "underline" },
                    fontSize: 13.5,
                  }}
                  color={theme.palette.tertiary.main}
                >
                  Back to Dashboard
                </Link>
              ) : (
                <Link
                  underline="none"
                  onClick={handleGoBack}
                  sx={{
                    ":hover": { textDecoration: "underline" },
                    fontSize: 13.5,
                  }}
                  color={theme.palette.tertiary.main}
                >
                  Back to Purchase Requests
                </Link>
              )}
            </Box>
            <Typography
              sx={{
                fontSize: 14,
                textAlign: "center",
              }}
              color={theme.palette.tertiary.main}
            >
              Purchase Request No.
            </Typography>
            <Typography
              sx={{
                fontSize: 32,
                fontWeight: "bolder",
                textAlign: "center",
              }}
              color={theme.palette.tertiary.main}
            >
              {prNo ? prNo : "N/A"}
            </Typography>

            <Grid container sx={{ my: 5 }}>
              <Grid item xs={12} sx={{ py: 6, borderRadius: 5 }}>
                <StepperPR
                  newTransRecords={newTransRecords}
                  stepperData={stepperData}
                  ifcancelled={ifcancelled}
                  prTrans={prTrans}
                  hideDelay={hideDelay}
                  prReceiveTrans={prReceiveTrans}
                  NewlyCreatedPRdate={NewlyCreatedPRdate}
                  prReturnedTrans={prReturnedTrans}
                  completedPR={completedPR}
                  prdetails={prdetails}
                  refresh={refresh}
                  ValidateifCommonOffice={ValidateifCommonOffice}
                  onTouch={(e) => {
                    console.log(e);
                  }}
                  activeStep={status ? status - 1 : 0}
                  orientation="horizontal"
                />
                {allTransLogs.length >= 1 && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <ButtonComponent
                      action={handleToggleDrawer}
                      variant={"contained"}
                      name={
                        <>
                          Transaction Logs
                          <SortIcon
                            fontSize="small"
                            sx={{ marginLeft: "3px" }}
                          />
                        </>
                      }
                    />
                  </Box>
                )}

                {/* Transaction log drawer */}

                <DrawerComponent
                  open={isOpen}
                  onClose={handleToggleDrawer}
                  anchor="right"
                  // content="Hello this is not a test"
                  action={handleToggleDrawer}
                  allTransLogs={allTransLogs}
                  prdetails={prdetails}
                  activeStep={activeStep}
                ></DrawerComponent>
              </Grid>
              {/* <Grid item xs={12} sx={{ py: 6, borderRadius: 5 }}>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      padding: 5,
                      backgroundColor: theme.palette.myPrimary.main,
                    }}
                  >
                    {relid}
                    <VerticalStepper stepperData={VertocalSteps} />
                  </Box>
                </Box>
              </Grid> */}
            </Grid>
            <Grid
              container
              sx={{
                gap: 5,
              }}
            >
              <Grid item xs={7.5}>
                <Typography
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    alignItems: "center",
                    display: "flex",
                    gap: 3,
                    paddingBottom: 2,
                  }}
                  color={theme.palette.tertiary.main}
                >
                  Purchase Request Details
                  <ListAltOutlined sx={{ fontSize: 15 }} />
                </Typography>
                <Divider style={{ marginBottom: 20 }} />
                <Box
                  sx={{
                    borderRadius: 3,
                    padding: 5,
                    backgroundColor: theme.palette.myPrimary.main,
                  }}
                >
                  <PRForm id={id} status={status} fund={caf} data={prData} />
                </Box>
              </Grid>

              {/* section title */}
              <Grid item xs={4.1}>
                {
                  <>
                    <Typography
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        alignItems: "center",
                        display: "flex",
                        gap: 4,
                        paddingBottom: 2,
                      }}
                      color={theme.palette.tertiary.main}
                    >
                      {user.role === 3 ? (
                        <>
                          Purchase Request Status{" "}
                          <Update sx={{ fontSize: 15 }} />
                        </>
                      ) : (
                        <>
                          Manage Options
                          <ManageAccounts sx={{ fontSize: 15 }} />
                        </>
                      )}
                    </Typography>

                    <Divider style={{ marginBottom: 20 }} />

                    <Box
                      px={3}
                      py={4}
                      sx={{
                        backgroundColor: theme.palette.myPrimary.main,
                        borderRadius: 3,
                        // boxShadow: 1,
                      }}
                    >
                      {showError ? (
                        <Grow in={handleShowError}>
                          <Alert
                            onClose={handleClose}
                            // variant="filled"
                            severity={severity}
                            sx={{
                              width: "100%",
                              fontWeight: 600,
                              fontSize: 14,
                              mb: 2,
                              mt: 2,
                            }}
                            onClick={() => {
                              setShowError(false);
                            }}
                          >
                            {alertMessage}
                          </Alert>
                        </Grow>
                      ) : (
                        ""
                      )}
                      {renderApprovalStatus()}
                      {/* DROPDOWN */}
                      {showDropdown ? (
                        <Box pt={3}>
                          {user.role === 5 ? (
                            <>
                              <SelectComponent
                                label={"Select Fund Cluster"}
                                data={data}
                                isRequired={true}
                              />
                            </>
                          ) : (
                            ""
                          )}
                          <Box
                            sx={{
                              justifyContent: "flex-end",
                            }}
                            p={2}
                            display="flex"
                            gap={1}
                          >
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                borderRadius: 1.5,
                                bgcolor: theme.palette.tertiary.main,
                                align: "right",
                              }}
                              onClick={() =>
                                handleSend(relid, setRefresh, setHideDelay)
                              }
                            >
                              Proceed
                            </Button>

                            <Button
                              variant="contained"
                              size="small"
                              color="error"
                              sx={{
                                borderRadius: 1.5,
                                bgcolor: theme.palette.tertiary.main,

                                align: "right",
                              }}
                              onClick={() => {
                                setShowsDropdown(false);
                                setSelectedButton(null);
                              }}
                            >
                              Revert
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        ""
                      )}

                      {/* //REMARKS */}
                      {showRemarks ? (
                        <>
                          <Box pt={3}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Add Remarks{" "}
                              <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <InputBase
                              type="text"
                              placeholder="Add remarks here..."
                              variant="filled"
                              sx={{
                                mt: 0.4,
                                background: "#EEEEEE",
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                fontSize: 13.5,
                                fontWeight: 500,
                                px: 2,
                                py: 2,
                              }}
                              value={remarks}
                              fullWidth
                              multiline
                              onChange={(e) => setRemarks(e.target.value)}
                            />
                            <Box
                              sx={{
                                bgcolor: "#EEEEEE",
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                justifyContent: "flex-end",
                                pt: 2,
                              }}
                              p={2}
                              display="flex"
                              gap={1}
                            >
                              <Button
                                variant="contained"
                                size="small"
                                sx={{
                                  borderRadius: 1.5,
                                  bgcolor: theme.palette.tertiary.main,
                                }}
                                onClick={() =>
                                  //action === 3 ? handleReturn() : handleCancel()
                                  handleActions(
                                    remarks,
                                    selectedbtn,
                                    relid,
                                    setRefresh,
                                    setHideDelay,
                                    setShowRemarks,
                                    setSelectedButton,
                                    setSelectBtn,
                                    setRemarks
                                  )
                                }
                              >
                                Proceed
                              </Button>

                              <Button
                                variant="contained"
                                size="small"
                                color="error"
                                sx={{
                                  borderRadius: 1.5,
                                  bgcolor: theme.palette.tertiary.main,
                                }}
                                onClick={() => {
                                  setShowRemarks(false);
                                  setSelectedButton(null);
                                  setSelectBtn("");
                                  setRemarks("");
                                }}
                              >
                                Revert
                              </Button>
                            </Box>
                          </Box>
                        </>
                      ) : (
                        ""
                      )}
                    </Box>
                  </>
                }

                {user.role === 5 && (
                  <>
                    {/* CAF */}
                    <Typography
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        alignItems: "center",
                        display: "flex",
                        gap: 4,
                        paddingBottom: 2,
                        marginTop: 20,
                      }}
                      // mt={user.role === 5 ? 5 : 0}
                      color={theme.palette.tertiary.main}
                    >
                      Attachments <AttachFileIcon />
                    </Typography>
                    <Divider style={{ marginBottom: 20 }} />
                    <Box
                      p={1}
                      sx={{
                        backgroundColor: theme.palette.myPrimary.main,
                        borderRadius: 3,
                        boxShadow: 1,
                        padding: 1.8,
                      }}
                    >
                      {/* CAF LIST Component */}
                      <CAFList
                        prNo={prNo}
                        data={fundClusters}
                        action={handleExportCaf}
                        fetchData={fetchData}
                        fundClusters={fundClusters}
                        setFundClusters={setFundClusters}
                      />
                    </Box>
                    {/* CAF */}
                  </>
                )}

                <Typography
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    alignItems: "center",
                    display: "flex",
                    gap: 4,
                    paddingBottom: 2,
                    marginTop: 20,
                  }}
                  mt={user.role === 5 ? 5 : 0}
                  color={theme.palette.tertiary.main}
                >
                  Remarks <MessageOutlined />
                </Typography>
                <Divider style={{ marginBottom: 20 }} />
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.myPrimary.main,
                    borderRadius: 3,
                    // boxShadow: 1,
                  }}
                  mt={3}
                >
                  <RemarksTimeline RemarksContent={RemarksContent} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
}

export default TrackPR;
