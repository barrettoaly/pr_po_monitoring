import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  styled,
  Collapse,
  ListItemButton,
  Divider,
  Typography,
  Badge,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import routes from "./sideBarroutes";
import { isActive } from "../../utility/LocationCheck";
import SidenavRoot from "./SidenavRoot";
import { useTheme } from "@mui/material/styles";
import { useController } from "../../Context/DataContext";
import {
  ChevronLeft,
  ExpandMore,
  ExpandLess,
  Menu,
  Logout,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { GetRequest } from "../../API/Api";
import { localStorageSetter } from "../../utility/ParseData";

function Sidenav() {
  const {
    setMiniSidenav,
    miniSidenav,
    user,
    tabClick,
    setTabClick,
    LogoutUser,
  } = useController();

  const [usersPending, setUserspending] = useState([]);
  const mytheme = useTheme();

  const [open, setOpen] = useState(routes.map(() => false));

  const renderRoutes = routes.map(
    ({ type, key, icon, route, rname, list, collapseName, forrole }, index) => {
      return (
        <>
          {type === "list" && forrole.includes(user.role) && (
            <NavLink
              style={{
                textDecoration: "none",
                color: mytheme.palette.primary.main,
              }}
              onClick={() => {
                setTabClick(true);
              }}
              key={key}
              to={route}
            >
              <ListItem
                sx={{
                  "&:hover": {
                    bgcolor: mytheme.palette.sidebarColor.onhover,
                  },
                }}
                component="li"
              >
                <ListItemIcon
                  sx={{
                    color: isActive(route.replace("/", ""))
                      ? mytheme.palette.sidebarColor.active
                      : mytheme.palette.sidebarColor.neutral,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <Typography
                  sx={{
                    color: isActive(route.replace("/", ""))
                      ? mytheme.palette.sidebarColor.active
                      : mytheme.palette.sidebarColor.neutral,
                  }}
                  variant="sidehead"
                >
                  {rname}
                </Typography>
              </ListItem>
            </NavLink>
          )}
          {type === "collapse" && forrole.includes(user.role) && (
            <>
              <Box display={miniSidenav && "none"} margin={"50px 0px 10px 0px"}>
                <Typography
                  sx={{
                    color: mytheme.palette.sidebarColor.heading,
                  }}
                  variant="sidehead"
                >
                  {collapseName}
                </Typography>
              </Box>
              {miniSidenav && <Divider />}
              {list.map(({ key, icon, route, rname, forrole }) => {
                if (forrole.includes(user.role)) {
                  return (
                    <List component="div" disablePadding>
                      <NavLink
                        style={{
                          textDecoration: "none",
                          color: mytheme.palette.primary.main,
                        }}
                        onClick={() => {
                          localStorageSetter("path", route);
                          setTabClick(true);
                        }}
                        key={key}
                        to={route}
                      >
                        {rname == "Approve" ? (
                          <Badge
                            badgeContent={usersPending.length}
                            color="error"
                          >
                            <ListItem
                              sx={{
                                borderRadius: "10px",
                                "&:hover": {
                                  bgcolor: mytheme.palette.sidebarColor.onhover,
                                },
                                color: isActive(route.replace("/", ""))
                                  ? mytheme.palette.sidebarColor.active
                                  : mytheme.palette.sidebarColor.neutral,
                              }}
                              component="li"
                            >
                              <ListItemIcon
                                sx={{
                                  color: isActive(route.replace("/", ""))
                                    ? mytheme.palette.sidebarColor.active
                                    : mytheme.palette.sidebarColor.neutral,
                                }}
                              >
                                {icon}
                              </ListItemIcon>

                              <Typography
                                sx={{
                                  color: isActive(route.replace("/", ""))
                                    ? mytheme.palette.sidebarColor.active
                                    : mytheme.palette.sidebarColor.neutral,
                                }}
                                variant="sidehead"
                              >
                                {rname}
                              </Typography>
                            </ListItem>
                          </Badge>
                        ) : (
                          <ListItem
                            sx={{
                              borderRadius: "10px",
                              "&:hover": {
                                bgcolor: mytheme.palette.sidebarColor.onhover,
                              },
                              color: isActive(route.replace("/", ""))
                                ? mytheme.palette.sidebarColor.active
                                : mytheme.palette.sidebarColor.neutral,
                            }}
                            component="li"
                          >
                            <ListItemIcon
                              sx={{
                                color: isActive(route.replace("/", ""))
                                  ? mytheme.palette.sidebarColor.active
                                  : mytheme.palette.sidebarColor.neutral,
                              }}
                            >
                              {icon}
                            </ListItemIcon>
                            <Typography
                              sx={{
                                color: isActive(route.replace("/", ""))
                                  ? mytheme.palette.sidebarColor.active
                                  : mytheme.palette.sidebarColor.neutral,
                              }}
                              variant="sidehead"
                            >
                              {rname}
                            </Typography>
                          </ListItem>
                        )}
                      </NavLink>
                    </List>
                  );
                }
              })}
            </>
          )}
        </>
      );
    }
  );

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    <SidenavRoot variant="permanent" open={true} ownerState={miniSidenav}>
      <DrawerHeader>
        <IconButton
          onClick={() => {
            setMiniSidenav(!miniSidenav);
          }}
          sx={{ color: mytheme.palette.secondary.main }}
        >
          {miniSidenav ? <Menu /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <List sx={{ height: "100vh" }}>
        <Box
          sx={{
            width: 250,
            padding: [miniSidenav ? "0px" : "0px 20px 0px 20px"],
          }}
          role="presentation"
        >
          {renderRoutes}
        </Box>

        <Box
          sx={{
            width: 250,
            padding: [miniSidenav ? "0px" : "0px 20px 0px 20px"],
            position: "absolute",
            bottom: 10,
          }}
          role="presentation"
        >
          <ListItem
            sx={{
              borderRadius: "10px",
              "&:hover": {
                bgcolor: "rgb(231, 70, 70, .1)",
                cursor: "pointer",
              },
            }}
            component="li"
            onClick={LogoutUser}
          >
            <ListItemIcon
              sx={{
                color: "#E74646",
              }}
            >
              <Logout />
            </ListItemIcon>
            <Typography
              sx={{
                color: "#E74646",
              }}
              variant="sidehead"
            >
              Logout
            </Typography>
          </ListItem>
        </Box>
      </List>
    </SidenavRoot>
  );
}

export default Sidenav;
