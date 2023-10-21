import React, { useState } from "react";
import { Box, Typography, Grow, Alert, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomDataTable from "./MUItable/CustomDataTable";
import { useController } from "../Context/DataContext";
import moment from "moment";
import { status } from "../Functions/status";
export const OmccApproval = ({
  rowsPending,
  rowsCancelled,
  newTransRecords,
  name,
  date,
}) => {
  const [show, setShow] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const theme = useTheme();
  const color = theme.palette;
  const navigate = useNavigate();
  const { user } = useController();

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

  const handleRowClick = (params) => {
    const prno = params.row.pr_no;
    const relid = params.row.id;
    const data = params.row;
    navigate(`/track-pr/${params.id}`, {
      state: { date, name, prno, relid, data },
    });
  };

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

  const checkIFstatusthree = () => {
    if (
      rowsPending.filter((x) => x.status == 3 && x.FK_user_ID == user.role)
        .length >= 1
    ) {
      return true;
    }
    return false;
  };
  return (
    <div>
      <Box sx={{ backgroundColor: "white" }} pt={2} mt={2} bgcolor={"#F5F5F5"}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 18,
            color: "#EF6262",
            px: 2,
            py: 1,
          }}
        >
          Pending Purchase Requests
        </Typography>
        <Box display="flex" justifyContent="space-between" pb={3}>
          <Box display="flex" px={2} justifyItems="center" gap={1}>
            {/* <Info fontSize="12" sx={{ color: color.secondary.gray }} /> */}
            <Typography fontSize={12} fontWeight={500} color={"#F3AA60"}>
              The list of Purchase Requests for approval.
            </Typography>
          </Box>

          <Box
            display="flex"
            sx={{ px: 2, justifyContent: "flex-start" }}
            gap={1}
          >
            {/* {renderApprovalStatus()} */}
          </Box>
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
              {/* {alertmessage} */}
            </Alert>
          </Grow>
        ) : (
          ""
        )}
        <CustomDataTable
          rows={rowsPending.filter((x) =>
            [2, 3, 5].includes(x.status)
              ? x.status == 5
                ? user.role == 7
                  ? true
                  : x.NextUserRole == user.role
                  ? x.NextUserRole == user.role
                  : x.FK_user_ID == user.role
                : x.status == 2
                ? x.NextUserRole == user.role
                  ? checkIFstatusthree()
                    ? false
                    : rowsCancelled.filter((e) => e.id == x.id).length >= 1
                    ? false
                    : true
                  : false
                : x.status == 3
                ? user.role == 7
                  ? true
                  : x.FK_user_ID == user.role
                : false
              : true
          )}
          columns={columnsPending}
          columnVisibilityModel={{ id: false }}
          pageSize={5}
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
    </div>
  );
};
