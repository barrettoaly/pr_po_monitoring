import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";

export default styled(Drawer)(({ theme, ownerState }) => {
  const miniSidenav = ownerState;
  const { breakpoints, transitions } = theme;
  const drawerOpenStyles = () => ({
    transition: transitions.create("width", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),
    width: 250,
  });
  const drawerCloseStyles = () => ({
    transition: transitions.create("width", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),
    overflowX: "hidden",
    transform: "translateX(0)",
    width: 60,
  });
  return {
    "& .MuiDrawer-paper": {
      overflowX: "hidden",
      background: theme.palette.myPrimary.main,
      ...(miniSidenav ? drawerCloseStyles() : drawerOpenStyles()),
    },
  };
});
