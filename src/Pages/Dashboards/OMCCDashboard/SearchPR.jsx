import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Collapse, Grid, Button } from "@mui/material";
import CustomDataTable from "../../../Components/MUItable/CustomDataTable";
import { status } from "../../../Functions/status";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useController } from "../../../Context/DataContext";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const SearchPR = ({ allPrs }) => {
  const { user } = useController();
  const [show, setShow] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleRowClick = (params) => {
    const prno = params.row.pr_no;
    const relid = params.row.id;
    const data = params.row;
    navigate(`/track-pr/${params.id}`, { state: { prno, relid, data } });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "header-class",
    },
    {
      field: "pr_no",
      headerName: "PR No.",
      headerClassName: "header-class",
      flex: 1,
    },
    {
      field: "pr_date",
      headerName: "PR Date",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {moment(params.value).format("LL")}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "requester",
      headerName: "Requested by",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },
    {
      field: "name",
      headerName: "Requesting Department",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },
    {
      field: "pr_status",
      headerName: "Status",
      headerClassName: "header-class",
      renderCell: (params) => <>{status(params, user.role)}</>,
      flex: 1,
    },
  ];

  console.log(allPrs);
  const Datas =
    allPrs.length >= 1
      ? allPrs.filter(
          (x) =>
            x.pr_no.includes(search) ||
            x.requester.toLowerCase().includes(search.toLowerCase()) ||
            x.name.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <div>
      <Box sx={{ flexGrow: 1, padding: "5px", marginTop: "5px" }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontSize: "16px",
                flexGrow: 1,
                //   display: { xs: "none", sm: "block" },
              }}
            >
              Find Purchase Request
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{ fontSize: "14px", width: "500px" }}
                placeholder="Search PR Number, Supplier or Requester"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Search>
          </Toolbar>
        </AppBar>

        <Collapse in={search}>
          <Grid
            item
            xs={12}
            mt={2}
            backgroundColor="white"
            sx={{
              boxShadow: "rgba(17, 12, 46, 0.1) 0px 0px 60px 20px",
              borderRadius: 2,
            }}
          >
            <Box p={3}>
              {/* DATA HERE */}
              <Box
                display="flex"
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={2}
              >
                <Typography textTransform={"uppercase"} fontWeight={600}>
                  Result Found{" "}
                  <span style={{ fontSize: "20px" }}>{Datas.length}</span>
                </Typography>
                {/* <Button
                  onClick={() => {}}
                  variant="contained"
                  size="small"
                  color="error"
                >
                  Close
                </Button> */}
              </Box>

              <CustomDataTable
                rows={Datas}
                columns={columns}
                onRowClick={handleRowClick}
                columnVisibilityModel={{ id: false }}
                pageSize={15}
              />
            </Box>
          </Grid>
        </Collapse>
      </Box>
    </div>
  );
};
