import React, { useEffect } from "react";
import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import CustomDataTable from "../MUItable/CustomDataTable";

const DepartmentDataTable = () => {
  // const [rows, setRows] = useState([]);

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const columns = [
    {
      field: "lastName",
      headerName: "Last Name",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 8,
    },

    {
      field: "firstName",
      headerName: "First Name",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },

    {
      field: "age",
      headerName: "Age",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },
  ];

  // useEffect(() => {
  //   setRows(columns);
  // }, [columns]);

  return (
    <>
      <CustomDataTable
        rows={rows}
        columns={columns}
        checkboxSelection={false}
      />
    </>
  );
};

export default DepartmentDataTable;
