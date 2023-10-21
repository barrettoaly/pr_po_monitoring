import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";

function SelectComponent({ label, setValue, data, isRequired, value }) {
  return (
    <>
      <FormControl
        fullWidth
        variant="filled"
        size="small"
        sx={{
          // borderLeft: "1px solid red",
          // backgroundColor: "#eeee",
          border: "none",
          borderRadius: 1.5,
        }}
        required={isRequired}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
          {label}
          <span style={{ color: "red" }}> {isRequired ? "*" : ""}</span>
        </Typography>
        {/* <InputLabel>{label}</InputLabel> */}
        <Select
          label={label}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        >
          {data.map((el, key) => {
            return (
              <MenuItem key={key} value={el.id}>
                {el.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectComponent;
