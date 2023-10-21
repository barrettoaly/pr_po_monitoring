import * as React from "react";

import { Button, CircularProgress } from "@mui/material";

export default function LoadingBtnComponent({
  name,
  type,
  variant,
  isLoading,
  color,
  textColor,
  isDisabled,
  icon,
  width = 200,
  isHover,
}) {
  let hoverWidth = width + 50;
  return (
    <Button
      variant={variant}
      type={type}
      disabled={isDisabled}
      sx={{
        backgroundColor: isDisabled ? "lightgrey" : color,
        cursor: isDisabled ? "none" : "pointer",
        color: isDisabled ? "white" : textColor,
        borderRadius: 10,
        textTransform: "capitalize",
        width: width,
        height: 40,
        "&:hover": {
          backgroundColor: color,
          width: hoverWidth,
          transition: ".5s ease",
        },
      }}
      endIcon={isLoading ? "" : icon}
    >
      {isLoading ? (
        <>
          <CircularProgress size={17} sx={{ color: "white" }} />
        </>
      ) : (
        name
      )}
    </Button>
  );
}
