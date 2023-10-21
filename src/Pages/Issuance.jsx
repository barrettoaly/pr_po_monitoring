import React from "react";
import CustomDataTable from "../Components/MUItable/CustomDataTable";
import { Handshake } from "@mui/icons-material";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import TitleHeader from "../Components/TitleHeader";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { GetRequest } from "../API/api";
import { useNavigate } from "react-router-dom";
import { localStorageGetter, localStorageSetter } from "../utility/ParseData";
import axios from "axios";

// const rows = [
//   {
//     id: 1,
//     pr_no: "23-02-0076",
//     requester: "Elpidio Qurino",
//     pr_date: "February 7, 2023",
//     name: "Integrated Hospital Operations Management Program",
//   },
//   {
//     id: 2,
//     pr_no: "23-02-0078",
//     requester: "Elpidio Qurino",
//     pr_date: "February 7, 2023",
//     name: "Integrated Hospital Operations Management Program",
//   },
// ];
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "header-class",
    flex: 1,
  },
  {
    field: "docno",
    headerName: "Issue No.",
    headerClassName: "header-class",
    flex: 1,
  },
  {
    field: "docdate",
    headerName: "Issue Date",
    headerClassName: "header-class",
    renderCell: (params) => (
      <Typography sx={{ fontSize: "13px ", fontStyle: "italic" }}>
        {moment(params.value).format("LL")}
      </Typography>
    ),
    flex: 1,
  },
  {
    field: "From",
    headerName: "Source",
    headerClassName: "header-class",
    renderCell: (params) => (
      <Typography sx={{ fontSize: "13px", fontStyle: "italic" }}>
        {params.value}
      </Typography>
    ),
    flex: 1,
  },
  {
    field: "To",
    headerName: "Destination",
    headerClassName: "header-class",
    renderCell: (params) => (
      <Typography sx={{ fontSize: "13px", fontStyle: "italic" }}>
        {params.value}
      </Typography>
    ),
    flex: 1,
  },
];
function Issuance(props) {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setFetch] = useState(true);
  const navigate = useNavigate();

  const FetchIssueList = (source) => {
    GetRequest({ url: "api/issuance" }, source.token)
      .then((res) => {
        if (check()) {
          const issuance =
            localStorageGetter("issuance").length === res.data.data;

          if (issuance) {
            setIsLoading(false);
            return;
          }
        }
        localStorageSetter("issuance", res.data.data);
        setRows(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          // console.log("Request canceled:", error.message);
        } else {
          console.log(error);
        }
      });
  };

  const handleRowClick = (params, event) => {
    navigate(`/view-issuance/${params.id}`);
  };

  const check = () => localStorage.getItem("issuance") !== null;

  const setData = () => {
    setRows(localStorageGetter("issuance"));
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    setIsLoading(true);

    if (check()) {
      setData();
      setIsLoading(false);
    }

    if (fetch) {
      FetchIssueList(source);
    }

    return () => source.cancel();
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {" "}
      <div style={{ backgroundColor: "#F5F5F5", flex: 1 }}>
        <Container maxWidth="xl" sx={{ padding: "40px" }}>
          <Box paddingBottom="50px">
            <TitleHeader title="Issuance" icon={<Handshake />} />
          </Box>
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
            <CustomDataTable
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
            />
          )}
        </Container>
      </div>
    </div>
  );
}

export default Issuance;
