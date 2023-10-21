import { Box, Container, Typography, useTheme } from "@mui/material";
import React from "react";
import TitleHeader from "../Components/TitleHeader";
import { ShoppingBagOutlined, ShoppingCartCheckout } from "@mui/icons-material";
import PRDataTable from "../Components/purchasereqs/PRDataTable";
import { useController } from "../Context/DataContext";
import ApproveDataTable from "../Components/purchasereqs/ApproveDataTable";
import { GetRequest } from "../API/api";
import { useEffect } from "react";
function PurchaseRequest(props) {
  const theme = useTheme();
  const color = theme.palette;

  // const [fetch, setFetch] = useState(true);

  const fetchStepper = () => {
    GetRequest({ url: "api/stages" })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const { user } = useController();
  const enduser = user.role === 3;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ backgroundColor: color.secondary.lightGray, flex: 1 }}>
        <Container maxWidth="xl" sx={{ padding: "40px" }}>
          <Box paddingBottom="50px">
            <TitleHeader
              title={"Purchase Requests"}
              icon={
                enduser ? (
                  <ShoppingBagOutlined sx={{ fontSize: "small" }} />
                ) : (
                  <ShoppingCartCheckout sx={{ fontSize: "small" }} />
                )
              }
            />
          </Box>

          {enduser ? <PRDataTable enduser={enduser} /> : <ApproveDataTable />}
        </Container>
      </div>

      {/* </Box> */}
    </div>
  );
}

export default PurchaseRequest;
