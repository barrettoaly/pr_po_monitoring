import { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import CustomDataTable from "../MUItable/CustomDataTable";

const ItemCategoryDataTable = ({ data }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem("items", JSON.stringify(items));
  // }, [items]);

  useEffect(() => {
    // console.log(data)
    setRows(data);
  }, [data]);

  const columns = [
    {
      field: "id",
      headerName: "Item Category",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 8,
    },

    {
      field: "Jan",
      headerName: "Jan",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "Feb",
      headerName: "Feb",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "Mar",
      headerName: "Mar",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "Apr",
      headerName: "Apr",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "May",
      headerName: "May",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "Jun",
      headerName: "Jun",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "Jul",
      headerName: "Jul",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "Aug",
      headerName: "Aug",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "Sep",
      headerName: "Sep",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "Oct",
      headerName: "Oct",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "Nov",
      headerName: "Nov",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "Dec",
      headerName: "Dec",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },
  ];

  return (
    <>
      <CustomDataTable
        rows={rows}
        columns={columns}
        checkboxSelection={false}
        // onRowClick={handleRowClick}
      />
    </>
  );
};

export default ItemCategoryDataTable;
