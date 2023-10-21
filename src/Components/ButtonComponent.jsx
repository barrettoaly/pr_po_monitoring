import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
const ButtonComponent = ({
  name,
  type,
  variant,
  color,
  textColor,
  action,
  width,
  isDisabled,
  icon,
  btnProps,
  float,
  marginTop,
  marginBottom,
  flex,
  isLoading,
  size = "small",
}) => {
  return (
    <div>
      <Button
        variant={variant}
        type={type}
        sx={{
          flex: flex,
          backgroundColor: color,
          color: textColor,
          borderRadius: 10,
          textTransform: "capitalize",
          width: width,
          height: 40,
          m: 0.5,
          float: float,
          marginTop: marginTop,
          marginBottom: marginBottom,
          "&:hover": {
            backgroundColor: color,
            // width: 220,
            // transition: ".5s ease",
          },
        }}
        size={size}
        onClick={action}
        disabled={isDisabled || isLoading}
        endIcon={icon}
      >
        {name}
      </Button>
    </div>
  );
};

export default ButtonComponent;
