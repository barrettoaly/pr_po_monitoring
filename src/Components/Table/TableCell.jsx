import { Box } from "@mui/material";
import React from "react";

function TableCell({ data, borderColor, align, width }) {
  return (
    <Box
      fontSize={14}
      lineHeight={{ sm: 1, lg: 1.1 }}
      py={1}
      px={2}
      align={align}
      width={width}
    >
      {data}
    </Box>
  );
}

export default TableCell;
