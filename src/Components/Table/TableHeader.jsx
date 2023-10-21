import { Box } from "@mui/material";
import React from "react";

function TableHeader({ data, align, width }) {
  return (
    <Box
      fontSize={13}
      lineHeight={{ sm: 1, lg: 0.94 }}
      py={1.3}
      px={2}
      sx={{
        textAlign: align,
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
    >
      {data}
    </Box>
  );
}

export default TableHeader;
