import { FormControl, InputBase, Typography } from "@mui/material";
import React from "react";

const InputComponent = ({
  label,
  type,
  value,
  setValue,
  color,
  width,
  rightIcon,
  placeholder,
  isRequired,
  min,
  bgColor = "#eeee",
  fontSize = 14,
  error = false,
  helperText,
  onFocus,
  onBlur,
  isDisabled,
  pattern = "",
  multiline = false,
  rows = 0,
  border = "2px solid #eee",
}) => {
  return (
    <FormControl
      error={error}
      sx={{ width: width, py: 1 }}
      required={isRequired}
    >
      <Typography sx={{ color: color, fontSize: fontSize, fontWeight: 600 }}>
        {label} <span style={{ color: "red" }}>{isRequired ? "*" : ""}</span>
      </Typography>

      <InputBase
        type={type}
        minLength={min}
        label={label}
        variant="filled"
        value={value}
        sx={{
          mt: 0.4,
          background: bgColor,
          borderRadius: 1.5,
          padding: 0.7,
          px: 2,
          fontSize: 15,
          fontWeight: 500,
          border: error ? "1px solid red" : border,
        }}
        placeholder={placeholder}
        endAdornment={rightIcon}
        onChange={(e) => setValue(e.target.value)}
        helperText={helperText}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={isDisabled}
        pattern={pattern}
        multiline={multiline} // for textarea props
        rows={rows} // for textarea props
        // endAdornment={
        //   <InputAdornment position="end">
        //     <IconButton></IconButton>
        //   </InputAdornment>
        // }
      />
    </FormControl>
  );
};

export default InputComponent;
