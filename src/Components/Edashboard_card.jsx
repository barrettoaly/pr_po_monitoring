import React from "react";
import { Box } from "@mui/material";
export const Edashboard_card = ({ title, count, icon, color }) => {
  return (
    <div>
      {" "}
      <Box
        sx={{
          padding: "10px",
          backgroundColor: "#F6F1F1",
          borderRadius: "10px",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          display: "block",
        }}
      >
        <span
          style={{
            float: "right",
            color: color,
          }}
        >
          {icon}
        </span>
        <h3 style={{ marginLeft: "10px" }}>
          <span style={{ fontWeight: "normal" }}>{title}</span>
          <br />
          <span style={{ fontSize: "35px" }}>{count}</span>
        </h3>
      </Box>
    </div>
  );
};
