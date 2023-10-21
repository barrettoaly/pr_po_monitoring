import React from "react";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Image } from "@mui/icons-material";
import norows from "../../Assets/norows.png";
import { Avatar, Typography, Box } from "@mui/material";

const DataGridTable = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-root": {
    overflow: "auto",
  },
  fontWeight: "bold",
  backgroundColor: theme.palette.myPrimary.main,
  "& .MuiDataGrid-cell:focus": {
    outline: " none",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <GridOverlay
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 10,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={norows} alt="No rows" style={{ width: 70, boxShadow: 50 }} />

      <Typography
        fontSize={14}
        fontWeight={600}
        sx={{ mb: 10, mt: 1, color: "#969696" }}
      >
        No rows
      </Typography>
    </GridOverlay>
  );
}

function CustomDataTable({
  rows,
  columns,
  columnVisibilityModel,
  pageSize = 15,
  checkboxSelection = true,
  onRowSelectionModelChange,
  rowSelectionModel,
  onRowClick,
  disableRowSelectionOnClick,
  loading,
  checkboxSelectionProps,
}) {
  return (
    <div>
      <DataGridTable
        loading={loading}
        rows={rows}
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        pagination
        rowHeight={38}
        autoHeight
        autoWidth
        // checkboxSelection={checkboxSelection}
        checkboxSelectionProps={checkboxSelectionProps}
        onRowSelectionModelChange={onRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
        onRowClick={onRowClick}
        initialState={{
          pagination: { paginationModel: { pageSize: pageSize } },
        }}
        pageSizeOptions={[5, 10, 15, 25, 50, 100]}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        components={{ NoRowsOverlay: CustomNoRowsOverlay }}
      />
    </div>
  );
}

export default CustomDataTable;
