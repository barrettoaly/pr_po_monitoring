import React from "react";
import Skeleton from "@mui/material/Skeleton";
export const Eloader = () => {
  return (
    <div style={{ marginTop: "2px", padding: "50px" }}>
      <Skeleton variant="rectangular" width={"100%"} height={30} />
      <Skeleton
        variant="rectangular"
        width={"40%"}
        height={50}
        sx={{ marginTop: "10px" }}
      />

      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={220}
        sx={{ marginTop: "20px", borderRadius: "10px" }}
      />

      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={220}
        sx={{ marginTop: "20px", borderRadius: "10px" }}
      />
    </div>
  );
};
