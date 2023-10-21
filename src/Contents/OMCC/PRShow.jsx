import React, { useEffect, useState } from "react";
import CustomDataTable from "../../Components/MUItable/CustomDataTable";
import { rows } from "../../Data/DashboardData";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import moment from "moment";
import { ViewPRDashboard } from "../../Components/ModalContents/ViewPRDashboard";
import { GetRequest } from "../../API/Api";
import { status } from "../../Functions/status";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "header-class",
    renderCell: (params) => (
      <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
        {params.value}
      </Typography>
    ),
    flex: 1,
  },
  {
    field: "pr_no",
    headerName: "PR No.",
    headerClassName: "header-class",
    flex: 1,
  },
  {
    field: "proc_pr_no",
    headerName: "Procurement PR No.",
    headerClassName: "header-class",
    renderCell: (params) =>
      params.value === null ? (
        <Typography sx={{ fontSize: "13px", fontStyle: "italic" }}>
          ---Not Available---
        </Typography>
      ) : (
        params.value
      ),
    flex: 1,
  },
  {
    field: "pr_date",
    headerName: "Date",
    headerClassName: "header-class",
    renderCell: (params) => (
      <Typography
        sx={{ fontSize: "13px ", fontStyle: "italic", fontWeight: 600 }}
      >
        {moment(params.value).format("LL")}
      </Typography>
    ),
    flex: 1,
  },
];

function PRShow({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPR, setShowPR] = useState(false);
  const [id, setId] = useState("");
  const [list, setList] = useState([]);
  const handleRowClick = (params, event) => {
    setShowPR(true);
    setId(params.id);
  };

  const closeModal = () => {
    setShowPR(false);
  };

  const FetchList = () => {
    setIsLoading(true);
    GetRequest({ url: "api/purchase_relation/pending" }).then((res) => {
      setList(res.data.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    FetchList();
  }, []);
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <Box align="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box my={2}>
            <Alert severity="info">
              This table shows the list of all Purchase Requests
            </Alert>
          </Box>
          <Box>
            {showPR ? <ViewPRDashboard id={id} onClose={closeModal} /> : ""}
            <CustomDataTable
              rows={data}
              columns={columns}
              onRowClick={handleRowClick}
              checkboxSelection={false}
              pageSize={5}
            />
          </Box>
        </>
      )}
    </div>
  );
}

export default PRShow;
