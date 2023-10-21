import Header from "../../../Contents/OMCC/Header";
import { Box } from "@mui/material";

import { Outlet } from "react-router-dom";
import { GetMultiple } from "../../../API/Api";
const index = (props) => {
  return (
    <>
      <div style={{ zIndex: 100 }}>
        <Header />
      </div>

      <Box pt={1}>
        <Outlet />
      </Box>
    </>
  );
};

export default index;
