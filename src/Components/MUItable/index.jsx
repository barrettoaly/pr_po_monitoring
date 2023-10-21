import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect } from "react";
import { Button } from "@mui/material";

const MUItable = ({
  fetchData,
  columns,
  data,
  apiref,
  showCheckBox,
  rowHeight,
  onRowSelectionModelChange,
}) => {
  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("key"));
    if (temp) {
      temp.map((e) => {
        apiref.current.selectRow(e);
      });
    }
  }, [showCheckBox]);

  const hundleLocalStore = (value) => {
    localStorage.setItem("key", JSON.stringify(value));
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        // rowSelection={showCheckBox ? true : false}
        apiRef={apiref}
        rows={data}
        columns={columns}
        pageSize={5}
        rowHeight={rowHeight}
        rowsPerPageOptions={[5]}
        checkboxSelection={showCheckBox ? true : false}
        onRowSelectionModelChange={(e) => {
          showCheckBox ? hundleLocalStore(e) : onRowSelectionModelChange(e);
        }}
        onRowClick={() => {
          !showCheckBox && console.log("view modal");
        }}
      />

      {/* <pre style={{ fontSize: 10 }}>
        {JSON.stringify(selectedRows, null, 4)}
      </pre> */}
    </div>
  );
};

export default MUItable;
