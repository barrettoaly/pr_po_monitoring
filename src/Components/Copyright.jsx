import { CopyrightOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

function Copyright(props) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      <CopyrightOutlined fontSize="11" color="gray" />
      <Typography fontSize={13} fontWeight={600}>
        Copyright CIIS - ZCMC 2023
      </Typography>
    </Box>
  );
}

export default Copyright;
