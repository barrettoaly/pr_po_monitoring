import {
  Box,
  CircularProgress,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import TitleHeader from "../Components/TitleHeader";
import { ShoppingCartCheckout } from "@mui/icons-material";
import CustomDataTable from "../Components/MUItable/CustomDataTable";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { GetRequest } from "../API/Api";
import { useEffect } from "react";

import axios from "axios";

import { localStorageGetter, localStorageSetter } from "../utility/ParseData";
import { ParseData } from "../utility/ParseData";

function PurchaseOrder(props) {
  const theme = useTheme();
  const color = theme.palette;

  const [selectedID, setSelectedID] = useState(null);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setFetch] = useState(true);

  const FetchPOList = (source) => {
    GetRequest({ url: "api/purchase_order" }, source.token)
      .then((res) => {
        // console.log("fetch here");
        if (check()) {
          const purchaseOrders =
            localStorageGetter("purchaseOrders").length ===
            res.data.data.length;

          if (purchaseOrders) {
            setIsLoading(false);
            return;
          }
        }

        localStorageSetter("purchaseOrders", res.data.data);
        setRows(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          // console.log("Request Canceled:", error.message);
        } else {
          console.log(error);
        }
      });
  };

  const check = () => localStorage.getItem("purchaseOrders") !== null;

  const setData = () => {
    setRows(localStorageGetter("purchaseOrders"));
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    setIsLoading(true);

    if (check()) {
      setData();
      setIsLoading(false);
    }

    if (fetch) {
      FetchPOList(source);
    }

    return () => source.cancel();
  }, []);

  const columns = [
    {
      field: "po_no",
      headerName: "PO No.",
      headerClassName: "header-class",
      flex: 1,
    },
    {
      field: "FK_supplier_ID",
      headerName: "Supplier name",
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
      field: "po_date",
      headerName: "PO Date",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: "13px ", fontStyle: "italic" }}>
          {moment(params.value).format("LL")}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "FK_pr_ID",
      headerName: "PR No",
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
      field: "caf_number",
      headerName: "CAF NO.",
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
      field: "total",
      headerName: "Grand Total",
      headerClassName: "header-class",
      renderCell: (params) =>
        params.value === null ? (
          <Typography sx={{ fontSize: "13px", fontStyle: "italic" }}>
            ---Not Available---
          </Typography>
        ) : (
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
          }).format(params.value)
        ),
      flex: 1,
    },
  ];

  const navigate = useNavigate();

  const handleRowClick = (params, event) => {
    navigate(`/view-po/${params.id}`);
  };

  return (
    <div
      style={{ backgroundColor: color.secondary.lightGray, height: "100vh" }}
    >
      <Container maxWidth="xl" sx={{ padding: "40px" }}>
        <Box paddingBottom="50px">
          <TitleHeader
            title="Purchase Order"
            icon={<ShoppingCartCheckout sx={{ fontSize: "small" }} />}
          />
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
      {/* </Box> */}
    </div>
  );
}

export default PurchaseOrder;
