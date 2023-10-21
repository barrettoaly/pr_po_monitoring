import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  List,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import CustomedAccordion from "../../Components/Dashboard/CustomedAccordion";
import { useEffect } from "react";
import { GetRequest } from "../../API/api";
import { useState } from "react";
import CustomDataTable from "../../Components/MUItable/CustomDataTable";
import { status } from "../../Functions/status";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useController } from "../../Context/DataContext";
const BiddingShow = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { user } = useController();
  const Fetch = () => {
    setIsLoading(true);
    GetRequest({ url: "api/on-bidding" }).then((res) => {
      setList(res.data.data);
      setIsLoading(false);
    });
  };

  const handleRowClick = (params) => {
    const prno = params.row.pr_no;
    const relid = params.row.id;
    navigate(`/track-pr/${params.id}`, { state: { name, prno, relid } });
  };
  useEffect(() => {
    Fetch();
  }, []);
  const columns = [
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
      renderCell: (params) => <>{status(params, user.role)}</>,
      flex: 1,
    },
  ];

  return (
    <div>
      {isLoading ? (
        <Box align="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <CustomDataTable
          rows={list}
          columns={columns}
          onRowClick={handleRowClick}
          columnVisibilityModel={{ id: false }}
          pageSize={15}
        />
      )}
    </div>
  );
};

export default BiddingShow;
