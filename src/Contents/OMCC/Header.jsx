import {
  Box,
  Button,
  Link,
  Stack,
  Typography,
  useTheme,
  AppBar,
  IconButton,
  useMediaQuery,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Slide,
} from "@mui/material";
import React from "react";
import zcmc from "../../Assets/zcmc.png";
import { Close, Logout, Menu, Send } from "@mui/icons-material";
import json2mq from "json2mq";
import { useState } from "react";
import { useController } from "../../Context/DataContext";
import {
  Navigate,
  useLocation,
  useNavigate,
  Link as RLink,
} from "react-router-dom";
import omccRoute from "../../Pages/Dashboards/OMCCDashboard/RouteOMCC";
import { getLocation } from "../../utility/LocationCheck";
//
const labels = [
  { label: "General", href: "po", active: true },
  { label: "PR", full: "Purchase Requests", href: "pr" },
  { label: "PO", full: "Purchase Orders", href: "po" },
  { label: "Issuance", href: "issuance" },
];

const MobileView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    document.documentElement.style.transtion = ".5s ease";
    setIsOpen((prev) => !prev);

    document.documentElement.style.overflow = "unset";
    document.body.style.overflow = "unset";
  };

  return (
    <div>
      <AppBar position="static" width="100vw">
        <Box
          sx={{
            py: 1,
            pr: 2,
            pl: 1,
            backgroundColor: "white",
            position: "fixed",
            zIndex: 100,
            width: "100vw",
            height: 62,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
          }}
        >
          <IconButton onClick={handleOpen}>
            <Menu />
          </IconButton>
          <img src={zcmc} height={38} />
        </Box>

        {/* SIDE */}
        {isOpen ? (
          <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
            <Box
              sx={{
                p: 3,
                zIndex: 100,
                height: "100vh",
                width: "100vw",
                position: "absolute",
                backgroundColor: theme.palette.success.light,
                opacity: 0.98,
                top: 0,
              }}
            >
              <Box align="right" mb={5}>
                <IconButton onClick={handleClose}>
                  <Close sx={{ color: "white" }} />
                </IconButton>
              </Box>

              <List
                sx={{
                  width: "100%",
                  color: "white",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                {labels.map((el) => {
                  return (
                    <RLink>
                      <ListItemButton
                        sx={{
                          ":hover": { textDecoration: "none" },
                          cursor: "pointer",
                          textDecoration: "none",
                          borderRadius: 2,
                        }}
                      >
                        {/* sx={{
                          color: el.active
                            ? "white"
                            : theme.palette.myPrimary.main,
                          backgroundColor: el.active
                            ? "rgba(0, 0, 0, 0.3)"
                            : "",
                          px: 3,
                          py: 1.6,
                          width: "100%",
                          fontSize: 15,
                          borderRadius: 2,
                        }} */}
                        <Box
                          sx={{
                            color: el.active
                              ? "white"
                              : theme.palette.myPrimary.main,
                            backgroundColor: el.active
                              ? "rgba(0, 0, 0, 0.3)"
                              : "",
                            px: 3,
                            py: 1.6,
                            width: "100%",
                            fontSize: 15,
                            borderRadius: 2,
                          }}
                        >
                          {el.label}
                        </Box>
                      </ListItemButton>
                    </RLink>
                  );
                })}
              </List>
            </Box>
          </Slide>
        ) : (
          ""
        )}
      </AppBar>
    </div>
  );
};

const DesktopView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let theme = useTheme();

  const { LogoutUser } = useController();
  const parts = location.pathname.split("/");
  const thisloc = parts[parts.length - 1];
  return (
    <>
      <Box
        sx={{
          py: 1,
          px: 3,
          backgroundColor: "white",
          position: "fixed",
          zIndex: 100,
          width: "100vw",
          boxShadow: "rgba(17, 12, 45, 0.1) 0px 48px 200px 2px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* LEFT LOGO AND NAME */}
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <img src={zcmc} height={45} />
            <Box>
              <Typography sx={{ fontWeight: "bolder", mb: -0.3 }}>
                MCC Dashboard
              </Typography>
              <Typography sx={{ fontWeight: "lighter" }} fontSize="small">
                PR-PO-Issuance Monitoring System
              </Typography>
            </Box>
          </Stack>
          {/* CLOSE */}

          {/* TABS HERE */}
          <Stack direction={"row"} spacing={2}>
            {omccRoute.map((el) => {
              return (
                <RLink
                  to={el.href}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Link
                    sx={{
                      ":hover": { textDecoration: "none" },
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    <Box
                      sx={{
                        color:
                          el.href == thisloc || thisloc == "dashboard" && el.href == ""
                            ? "white"
                            : theme.palette.tertiary.main,
                        backgroundColor:
                          el.href == thisloc || thisloc == "dashboard" && el.href == ""
                            ? theme.palette.tertiary.main
                            : "",
                        px: 2,
                        py: 0.7,
                        fontSize: 15,
                        borderRadius: 10,
                        ":hover": { textDecoration: "none" },
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      {el.label}
                    </Box>
                  </Link>
                </RLink>
              );
            })}
          </Stack>

          {/* LOGOUT BUTTON */}
          <Button
            variant="outlined"
            sx={{ borderRadius: 10, height: 30, width: 110 }}
            size="small"
            color="error"
            endIcon={<Logout />}
            onClick={LogoutUser}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );
};

function Header(props) {
  const minW = useMediaQuery(
    json2mq({
      minWidth: 898,
    })
  );
  return <>{!minW ? <MobileView /> : <DesktopView />}</>;
}

export default Header;
