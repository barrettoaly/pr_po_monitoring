import React, { useState, useEffect } from "react";
import {
  Box,
  Snackbar,
  Alert,
  Button,
  Typography,
  Grow,
  CircularProgress,
  useTheme,
} from "@mui/material";
import "../../Style/data-table.css";
import CustomDataTable from "../MUItable/CustomDataTable";
import moment from "moment";
import {
  LocalOfferOutlined,
  ShoppingCartCheckoutOutlined,
  Info,
  SystemUpdateAlt,
  IosShare,
  ArrowBack,
  PanTool,
  HighlightOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useController } from "../../Context/DataContext";
import { GetRequest, PostRequest, PutRequest } from "../../API/Api";
import { status } from "../../Functions/status";
import Swal from "sweetalert2";
import { Cancel } from "../Cancel";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import {
  localStorageGetter,
  localStorageSetter,
} from "../../utility/ParseData";

import axios from "axios";

//function
function ApproveDataTable(props) {
  const theme = useTheme();
  const color = theme.palette;
  const { user } = useController();
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [disabled2, setDisabled2] = useState(true);

  const [rowsPending, setRowsPending] = useState([]);
  const [rowsApproved, setRowsApproved] = useState([]);
  const [rowsCancelled, setRowsCancelled] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRows2, setSelectedRows2] = useState([]);
  const [poNo, setPoNo] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [action, setAction] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");
  const [alertmessage, setAlertmessage] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [newTransRecords, setNewTransrecords] = useState([]);
  const [initial, setInitial] = useState(true);

  const columnsPending = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "header-class",
    },
    {
      field: "pr_no",
      headerName: "PR No.",
      headerClassName: "header-class",
      flex: 1,
    },
    {
      field: "pr_date",
      headerName: "PR Date",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {moment(params.value).format("LL")}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "requester",
      headerName: "Requested by",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },
    {
      field: "name",
      headerName: "Requesting Department",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },
    {
      field: "pr_status",
      headerName: "Status",
      headerClassName: "header-class",
      renderCell: (params) => <>{status(params, user.role, newTransRecords)}</>,
      flex: 1,
    },
  ];

  const columnsApproved = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "header-class",
    },
    {
      field: "pr_no",
      headerName: "PR No.",
      headerClassName: "header-class",
      flex: 1,
    },
    {
      field: "pr_date",
      headerName: "PR Date",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {moment(params.value).format("LL")}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "requester",
      headerName: "Requested by",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },
    {
      field: "name",
      headerName: "Requesting Department",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },
    {
      field: "created_at",
      headerName: "Approved Date",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {moment(params.value).format("LLL")}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "pr_status",
      headerName: "Status",
      headerClassName: "header-class",
      renderCell: (params) => <>{status(params)}</>,
      flex: 1.5,
    },
  ];

  const columnsReturned = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "header-class",
    },
    {
      field: "pr_no",
      headerName: "PR No.",
      headerClassName: "header-class",
      flex: 1,
    },
    {
      field: "pr_date",
      headerName: "PR Date",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {moment(params.value).format("LL")}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "requester",
      headerName: "Requested by",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },
    {
      field: "name",
      headerName: "Requesting Department",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },
    {
      field: "returnedDate",
      headerName: "Returned Date",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {moment(params.value).format("LL")}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "returnedby",
      headerName: "Returned By",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "reasons",
      headerName: "Reason`s",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value ? (
            params.value
          ) : (
            <>
              <span style={{ color: "#D8D8D8", fontStyle: "italic" }}>
                NULL
              </span>
            </>
          )}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "pr_status",
      headerName: "Status",
      headerClassName: "header-class",
      renderCell: (params) => status(params),
      flex: 1.5,
    },
  ];

  function renderButton(status) {
    const theme = useTheme();

    return (
      <Button
        variant="contained"
        // color={theme.palette.tertiary.main}
        startIcon={
          status === 1 ? (
            <SystemUpdateAlt />
          ) : status === 2 ? (
            <IosShare />
          ) : status === 3 ? (
            <ArrowBack />
          ) : status === 4 ? (
            <HighlightOff />
          ) : (
            ""
          )
        }
        onClick={() => {
          if (selectedRows.length >= 1) {
            // action();
            status === 1
              ? handleSend()
              : status === 2
              ? handleReceive()
              : status === 3
              ? handleReturn()
              : status === 4
              ? handleCancel()
              : "";
          } else {
            setShow(true);
            setAlertmessage("Please select one or more to proceed.");
          }
        }}
        size="small"
        sx={{
          backgroundColor:
            status === 1
              ? theme.palette.chartColor.blue
              : status === 2
              ? theme.palette.tertiary.successDark
              : status === 3 || status === 4
              ? theme.palette.tertiary.error
              : "",
          borderRadius: 1.5,
          width: "auto",
          "&:hover": {
            backgroundColor: theme.palette.tertiary.main,
          },
        }}
        // disabled={true}
      >
        {status === 1
          ? "Send PR"
          : status === 2
          ? "Receive PR"
          : status === 3
          ? "Return PR"
          : status === 4
          ? "Cancel PR"
          : ""}
      </Button>
    );
  }

  //Snackbar Close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
    setShow(false);
  };

  const handleShowError = () => {
    setShow(true);
  };

  //Dialog Open
  const handleReceive = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4BB543",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Received!", "Purchase Requests received.", "success");
      }
    });
  };

  const handleSend = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4BB543",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Sent!", "Purchase Requests sent.", "success");
      }
    });
  };

  const renderApproveButton = () => {
    return (
      <>
        <ButtonComponent
          variant="contained"
          name="Approve ( All Selected )"
          color={theme.palette.tertiary.main}
          icon={<CheckCircleOutline />}
          width="100%"
          action={() => {
            if (selectedRows.length >= 1) {
              handleOpenDialog("approve");
            } else {
              setShow(true);
              setAlertmessage("Please select one or more to proceed.");
            }
          }}
        />
      </>
    );
  };
  const renderDeleteButton = () => {
    return (
      <>
        <ButtonComponent
          variant="contained"
          name="Deactivate"
          color={theme.palette.tertiary.main}
          icon={<RemoveCircleOutline />}
          width="100%"
          action={() => {
            if (selectedRows.length >= 1) {
              handleOpenDialog("delete");
            } else {
              setShow(true);
              setAlertmessage("Please select one or more to proceed.");
            }
          }}
        />
      </>
    );
  };
  const handleReturn = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4BB543",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Returned!", "Purchase Requests returned.", "success");
      }
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4BB543",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Returned!", "Purchase Requests returned.", "success");
      }
    });
  };

  //check if eligible for bidding or PO
  const handleCheck = (id) => {
    const rows = id;
    const noRows = rows.length === 0;

    let allRowsForBid = true;
    let allRowsForPO = true;

    for (const rowId of rows) {
      const row = rowsApproved.find((rowData) => rowData.id === rowId);
      if (row) {
        if (row.status !== "Approve by Finance") {
          allRowsForBid = false;
        }
        if (row.status !== "On Bidding") {
          allRowsForPO = false;
        }
      }
    }

    if (allRowsForBid || noRows) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    if (allRowsForPO || noRows) {
      setDisabled2(false);
    } else {
      setDisabled2(true);
    }

    if (noRows) {
      setDisabled(true);
      setDisabled2(true);
    }
  };

  //Delete all selected rows
  const handleDeleteAll = () => {
    PutRequest({ url: "/api/purchase_relation" }, { id: selectedRows })
      .then((res) => {
        const status = res.status;
        const {
          data: { data },
        } = res;

        if (status === 200) {
          setDialogOpen(false);
          setMessage(data);
          setOpenSnack(true);
          setSelectedRows([]);
          fetchPRLists();
        } else if (status === 400) {
          setAlertmessage(data);
          setShow(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Bidding and PO (PROCUREMENT)
  const handleApproveProc = () => {
    PostRequest(
      { url: "/api/purchase_relation/approved_many" },
      { id: selectedRows2 }
    )
      .then((res) => {
        const status = res.status;
        const {
          data: { data },
        } = res;

        if (status === 200) {
          setDialogOpen(false);
          setMessage(data);
          setOpenSnack(true);
          setSelectedRows([]);
          navigate("/purch-requests");
        } else if (status === 400) {
          setAlertmessage(data);
          setShow(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fetchPRLists = () => {
  //   Promise.all([
  //     GetRequest({ url: "/api/purchase_relation/pending" }),
  //     GetRequest({ url: "/api/purchase_relation/approved" }),
  //     GetRequest({ url: "/api/purchase_relation/cancelled" }),
  //   ])
  const renderApprovalStatus = () => {
    // switch (user.role) {
    //   case 4:
    //     return (
    //       <>
    //         {/* PROCUREMENT */}
    //         {renderButton(2)}
    //         {renderButton(1)}
    //       </>
    //     );
    //   case 5:
    //     return (
    //       <>
    //         {/* BUDGET */}
    //         {renderButton(2)}
    //       </>
    //     );
    //   case 6: {
    //     /* ACCOUNTING */
    //   }
    //   case 9:
    //     {
    //       /* FINANCE */
    //     }
    //     return (
    //       <>
    //         {renderButton(2)}
    //         {renderButton(1)}
    //       </>
    //     );
    //   case 7:
    //     return (
    //       <>
    //         {/* MMS */}
    //         {renderButton(2)}
    //         {renderButton(1)}
    //       </>
    //     );
    //   default:
    //     return "";
    // }
  };
  const fetchPRLists = (source, source2, source3) => {
    Promise.all(
      [
        GetRequest({ url: "/api/purchase_relation/pending" }, source.token),
        GetRequest({ url: "/api/purchase_relation/approved" }, source2.token),
        GetRequest({ url: "/api/purchase_relation/cancelled" }, source3.token),
      ]
      // source.token
    )
      .then(([pendingRes, approvedRes, returnedRes]) => {
        // console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss" + JSON.stringify(approvedRes.data.data, null, 2))
        if (
          pendingRes.statusText !== "OK" ||
          approvedRes.statusText !== "OK" ||
          returnedRes.statusText !== "OK"
        ) {
          throw new Error("Bad response");
        }

        //localStorageSetter("rowPending", pendingRes.data.data);
        setRowsPending(pendingRes.data.data);

        // localStorageSetter("rowApproved", approvedRes.data.data);
        setRowsApproved(approvedRes.data.data);

        // localStorageSetter("rowCancelled", returnedRes.data.data);
        setRowsCancelled(returnedRes.data.data);

        setName(approvedRes.data.data[0].approve_name);
        setDate(approvedRes.data.data[0].created_at);
        //setPoNo()

        setIsLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error(error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  function fetchEvent(row, source) {
    // const rowData = localStorageGetter(`${row}Hash`);
    // GetRequest({ url: `/api/event/${row}` }, source.token)
    //   .then((res) => {
    //     const { statusText } = res;
    //     if (statusText !== "OK") {
    //       throw new Error("Bad response.", { cause: res });
    //     }
    //     return res.data;
    //   })
    //   .then((res) => {
    //     const { data } = res;
    //     if (data.hash !== rowData) {
    //       fetchPRLists();
    //       localStorageSetter(`${row}Hash`, data.hash);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  }

  const check = (name, setValue) => {
    // if (localStorageGetter(name) !== null) {
    //   // console.log(`call ${name}`);
    //   setValue(localStorageGetter(name));
    //   return true;
    // }
    // return false;
  };

  const handleRowClick = (params) => {
    const prno = params.row.pr_no;
    const relid = params.row.id;
    const data = params.row;

    navigate(`/track-pr/${params.id}`, {
      state: { date, name, prno, relid, data },
    });
  };

  const fetchNewTrans = () => {
    PostRequest({
      url: "/api/purchase_relation/fetchallNEWTransStatus",
    })
      .then((res) => {
        const {
          data: { data },
        } = res;

        setNewTransrecords(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const source2 = axios.CancelToken.source();
    const source3 = axios.CancelToken.source();

    if (
      check("rowPending", setRowsPending) &&
      check("rowApproved", setRowsApproved)
    ) {
      setIsLoading(false);
    }

    if (initial) {
      setInitial(false);
      fetchPRLists(source, source2, source3);
      fetchNewTrans();
    }

    const intervalId = setInterval(() => {
      // if (!initial) {
      // }
      fetchEvent("rowPending", source);
      fetchEvent("rowApproved", source2);
    }, 5000);

    return () => {
      clearInterval(intervalId);
      source.cancel("Cancel Pending Request");
      source2.cancel("Cancel Approved Request");
      source3.cancel("Cancel Cancelled Request");
    };
  }, []);

  const rowStatusPending = () => {
    const uniquePRNos = [...new Set(rowsPending.map((item) => item.pr_no))];

    const uniqueRecords = uniquePRNos.map((prNo) => {
      const recordsWithPRNo = rowsPending.filter(
        (item) => item.pr_no === prNo && item.NextUserRole == user.role
      );
      const recordWithStatus3 = recordsWithPRNo.find(
        (item) => item.status === 3
      );

      const recordsWithPRNoRet = rowsPending.filter(
        (item) => item.pr_no === prNo && item.FK_user_ID == user.role
      );

      const recordWithStatus5 = recordsWithPRNoRet.find(
        (item) => item.status === 5
      );

      const recordWithStatus3andprocess = recordsWithPRNoRet.find(
        (item) => item.status === 3 && item.FK_user_ID == user.role
      );

      const recordswithNostatus6 = rowsCancelled.filter(
        (item) => item.pr_no != prNo
      );

      return (
        recordWithStatus3 ||
        recordWithStatus5 ||
        recordWithStatus3andprocess ||
        recordsWithPRNo[0]
      );
    });

    //return uniqueRecords;
    // Filter out undefined values
    const filteredRecords = uniqueRecords.filter(
      (record) => record !== undefined
    );

    if (user.role == 7) {
      return rowsPending.filter(
        (x) =>
          (x.status == 3 && x.stageID !== 8) ||
          (x.status == 5 && x.stageID !== 3) ||
          x.status == null
      );
    }

    if (user.role == 4) {
      const prPend = rowsPending.filter(
        (x) =>
          x.commonoffice == 0 ||
          (x.commonoffice == 1 && x.status == 2) ||
          (x.commonoffice == 1 && x.status == 5) ||
          (x.commonoffice == 1 && x.status == 3)
      );

      const sortwocancelled = prPend.filter(
        (x) => !rowsCancelled.some((d) => d.pr_no === x.pr_no)
      );

      const res9 = sortwocancelled.filter((x) => x.stageID !== 9);

      const filt = res9.filter((x) => x.stageID !== 6 || x.stageID !== 7);
      const uniquePrNos = new Set();
      const uniqueRows = [];

      for (const row of filt) {
        if (!uniquePrNos.has(row.pr_no)) {
          uniquePrNos.add(row.pr_no);
          uniqueRows.push(row);
        } else {
          const existingRow = uniqueRows.find((r) => r.pr_no === row.pr_no);
          if (
            row.status === 3 &&
            row.stageID === 8 &&
            (existingRow.status !== 3 || existingRow.stageID !== 8)
          ) {
            const index = uniqueRows.indexOf(existingRow);
            uniqueRows[index] = row;
          }
        }
      }
      ///return uniqueRows;

      return uniqueRows.filter(
        (x) =>
          (x.stageID == 2 && x.status !== 3) ||
          x.status == null ||
          x.status == 5 ||
          (x.stageID == 3 && x.status == 3) ||
          x.stageID == 7 ||
          x.stageID == 8
      );
    }

    return filteredRecords.filter(
      (row) => !rowsCancelled.some((x) => x.pr_no === row.pr_no)
    );
  };

  console.log(rowStatusPending());

  const rowstatusApproved = () => {
    const uniquePrNos = new Set();
    const uniqueRows = [];

    for (const row of rowsApproved) {
      if (!uniquePrNos.has(row.pr_no)) {
        uniquePrNos.add(row.pr_no);
        uniqueRows.push(row);
      }
    }

    return uniqueRows.filter((x) => x.status == 2);
  };

  return (
    <div>
      {/* DIALOG COMPONENT */}

      {/* Snackbar Component */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
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
          <Box sx={{ backgroundColor: "white" }} pt={2}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 18,
                color: color.tertiary.main,
                px: 2,
                py: 1,
              }}
            >
              Pending Purchase Requests
            </Typography>
            <Box display="flex" justifyContent="space-between" pb={3}>
              <Box display="flex" px={2} justifyItems="center" gap={1}>
                <Info fontSize="12" sx={{ color: color.secondary.gray }} />
                <Typography
                  fontSize={12}
                  fontWeight={500}
                  color={color.secondary.gray}
                >
                  The list of Purchase Requests for approval.
                </Typography>
              </Box>

              <Box
                display="flex"
                sx={{ px: 2, justifyContent: "flex-start" }}
                gap={1}
              ></Box>
            </Box>
            {show ? (
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
                    setShow(false);
                  }}
                >
                  {alertmessage}
                </Alert>
              </Grow>
            ) : (
              ""
            )}

            <CustomDataTable
              rows={rowStatusPending()}
              columns={columnsPending}
              columnVisibilityModel={{ id: false }}
              pageSize={20}
              checkboxSelection={true}
              checkboxSelectionProps={{ checked: false }}
              onRowSelectionModelChange={(id) => {
                setSelectedRows(id);
              }}
              rowSelectionModel={selectedRows}
              onRowClick={(params) => {
                setSelectedRow(params.id);
                handleRowClick(params);
              }}
              disableRowSelectionOnClick={true}
            />
          </Box>

          <Box sx={{ backgroundColor: "white" }} mt={2} pt={2}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 18,
                color: color.tertiary.main,
                px: 2,
                py: 1,
              }}
            >
              Approved Purchase Requests
            </Typography>
            <Box display="flex" sx={{ justifyContent: "space-between" }} pb={3}>
              <Box display="flex" px={2} justifyItems="center" gap={1}>
                <Info fontSize="12" sx={{ color: color.secondary.gray }} />
                <Typography
                  fontSize={12}
                  fontWeight={500}
                  color={color.secondary.gray}
                >
                  The list of Purchase Requests approved by your department.
                </Typography>
              </Box>
            </Box>

            <CustomDataTable
              rows={rowstatusApproved()}
              columns={columnsApproved}
              pageSize={5}
              onRowClick={(e) => {
                handleRowClick(e);
              }}
              checkboxSelection={user.role === 4 ? true : false}
              onRowSelectionModelChange={(id) => {
                setSelectedRows2(id);
                handleCheck(id);
              }}
              rowSelectionModel={selectedRows2}
            />
          </Box>

          {rowsCancelled.length >= 1 && (
            <Box sx={{ backgroundColor: "white" }} mt={2} pt={2}>
              <Cancel
                color={color}
                rowsCancelled={rowsCancelled}
                user={user}
                handleRowClick={handleRowClick}
              />
            </Box>
          )}
        </>
      )}
    </div>
  );
}

export default ApproveDataTable;
