import React from "react";
import Sidenav from "../sidenav";
import { Box } from "@mui/system";
import { ToastContainer } from "react-toastify";
import { useController } from "../../Context/DataContext";
import {
  AppBar,
  Avatar,
  Button,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";

const Layout = ({ children }) => {
  const myTheme = useTheme();
  const { miniSidenav, user, setUser } = useController();
  const MyBox = styled(Box)(({ theme }) => [
    user?.role !== 8 &&
      (miniSidenav
        ? { marginLeft: "60px", width: "calc(100% - 60px)" }
        : {
            [theme.breakpoints.up("xs")]: {
              marginLeft: "60px",
              width: "calc(100% - 60px)",
              [theme.breakpoints.up("sm")]: {
                marginLeft: "250px",
                width: "calc(100% - 250px)",
              },
            },
          }),
  ]);

  const tempUser = [
    { role: 1, name: "SuperAdmin" },
    { role: 2, name: "Admin" },
    { role: 3, name: "EndUser" },
    { role: 4, name: "Procurement" },
    { role: 5, name: "Budget" },
    { role: 6, name: "Accounting" },
    { role: 7, name: "MMS" },
    { role: 8, name: "OMCC" },
    { role: 9, name: "Finance" },
  ].map((e) => {
    return (
      <Button onClick={() => setUser(e)}>
        {e.role}
        <Typography fontSize={9}>{e.name}</Typography>
      </Button>
    );
  });

  return (
    <Box>
      {user.role !== 8 && <Sidenav />}
      {/* <Sidenav /> */}
      <ToastContainer />
      <MyBox>
        <AppBar
          sx={{
            backgroundColor: myTheme.palette.myPrimary.main,
            display: [user.role !== 8 ? "true" : "none"],
          }}
        >
          <Toolbar>
            <Box sx={{ width: "100%" }} display="flex" justifyContent="right">
              {/* ///Developer purpose */}
              {/* {tempUser} */}
              <Stack direction="row" alignItems="center">
                <Avatar sx={{ width: 32, height: 32 }}> {user?.name[0]}</Avatar>
                <Box ml={1}>
                  <Typography
                    align="left"
                    color="black"
                    fontSize={14}
                    fontWeight={600}
                  >
                    {/* John Doe */}
                    {user?.name}
                  </Typography>
                  <Typography align="left" color="black" fontSize={12}>
                    {user?.dept}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
        <Box>{children}</Box>
      </MyBox>
    </Box>
  );
};

export default Layout;
