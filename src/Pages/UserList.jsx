import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Button,
  Typography,
  Divider,
  Chip,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import TitleHeader from "../Components/TitleHeader";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ButtonComponent from "../Components/ButtonComponent";
import {} from "@mui/material";
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import MUItable from "../Components/MUItable";
import { useController } from "../Context/DataContext";
import { GetRequest, PostRequest, PutRequest } from "../API/Api";
import { useGridApiRef } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
function UserList(props) {
  // const { FetchUserList, userList } = useController();
  const theme = useTheme();
  const color = theme.palette;
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  //ref for datatable
  const apiref = useGridApiRef();

  //Show checkbox
  const [isEdit, setEdit] = useState(false);

  //view user details
  const [selectedDet, setSelectedDet] = useState(null);

  //view user to block
  const [selectedBlck, setSelectedBlck] = useState(null);

  //get the position for menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  //Menu hundler
  const [menu, setMenu] = useState(0);

  const hundleMenu = (event, params) => {
    setAnchorEl(event.currentTarget);

    //get the id of user on menu(3 vertical dots) click
    console.log(params.row.restrict);
    setMenu(params.row.restrict);
    const userId = params.row.id;
    if (userId) setSelectedBlck(userId);
  };

  async function blockUser(byid) {
    PutRequest({ url: `api/blockuser/${byid}` })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        hundlefetchuserlist();
      });
  }

  const hundleBlock = () => {
    blockUser(selectedBlck);
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const hundlefetchuserlist = () => {
    GetRequest({ url: "api/user" })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response", { cause: res });
        }
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // FetchUserList();
    hundlefetchuserlist();
  }, []);

  const columns2 = useMemo(
    () => [
      { field: "Name", headerName: "Name", flex: 1 },
      { field: "department", headerName: "Department", flex: 1 },

      { field: "created_at", headerName: "Verified At", flex: 1 },
      {
        field: "restrict",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => (
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            sx={{
              alignItems: "center",
              width: "100%",
            }}
          >
            <Chip
              sx={{ height: "20px" }}
              label={params.value == 0 ? "Active" : "Blocked"}
              color={params.value == 0 ? "primary" : "error"}
            />
            <Button>
              <MoreVertIcon
                onClick={(e) => hundleMenu(e, params)}
              ></MoreVertIcon>
            </Button>
          </Box>
        ),
      },
    ],
    []
  );
  const obj = {
    id: 1,
    email: "admin@gmail.com",
    created_at: "2023-04-15 09:54:21",
    Name: "Dennis Falcasantos",
    contact: "09123456789",
    userAddress: "1st Street Pasonanca , Zamboanga City",
    FK_department_ID: 1,
    department: "ZCMC_CIIS",
    abbreviation: "CIIS",
  };
  const userProperty = useMemo(
    () => [
      { field: "Name", propName: "Full Name" },
      { field: "contact", propName: "Mobile" },
      { field: "userAddress", propName: "Address" },
      { field: "department", propName: "Department" },
      { field: "email", propName: "Email" },
    ],
    []
  );
  const renderUserProp = (objt) =>
    userProperty.map((e) => (
      <Box display={"flex"} py={1} pr={2}>
        <Typography variant="sidehead" fontSize={"medium"}>
          {e.propName}: &nbsp;
        </Typography>
        <Typography
          variant="sidehead"
          fontSize={"medium"}
          fontWeight={"regular"}
        >
          &nbsp;{objt && objt[e.field] ? objt[e.field] : "none"}
        </Typography>
      </Box>
    ));

  return (
    <div>
      <Container maxWidth="xl" sx={{ padding: "40px" }}>
        <Box paddingBottom="50px">
          <TitleHeader
            title="Users"
            icon={<PeopleOutlineIcon sx={{ fontSize: "small" }} />}
          />
        </Box>
        <Box
          sx={{
            height: "300px",
            width: "100%",
          }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="sidehead" fontSize={"large"} p={1}>
              User Information{" "}
              {selectedDet && (
                <Chip
                  label={selectedDet.restrict == 0 ? "Active" : "Blocked"}
                  color={selectedDet.restrict == 0 ? "primary" : "error"}
                />
              )}
            </Typography>
            <Edit />
          </Box>
          <Divider></Divider>
          <Box p={2}>{renderUserProp(selectedDet)}</Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <ButtonComponent
            name="Add"
            variant="contained"
            color={color.tertiary.main}
            width="120px"
            action={() => {
              navigate("/create-admin");
            }}
            marginTop="10px"
            marginBottom="10px"
          />
          <ButtonComponent
            name={isEdit ? "Cancel" : "Edit List"}
            variant="contained"
            color={isEdit ? color.warning : color.tertiary.main}
            width="120px"
            action={() => {
              setEdit(!isEdit);
            }}
            marginTop="10px"
            marginBottom="10px"
          />
          <ButtonComponent
            isDisabled={isEdit ? false : true}
            name="Block"
            variant="contained"
            color={color.tertiary.main}
            width="120px"
            action={() => {
              PostRequest(
                { url: "api/userlistblck?mode=blck" },
                {
                  array: Array.from(apiref.current.getSelectedRows()).map(
                    (e) => e[1].id
                  ),
                }
              )
                .then((e) => e.data)
                .then((e) => {
                  hundlefetchuserlist();
                });
            }}
            marginTop="10px"
            marginBottom="10px"
          />
          <ButtonComponent
            isDisabled={isEdit ? false : true}
            name="Unblock"
            variant="contained"
            color={color.tertiary.main}
            width="120px"
            action={() => {
              PostRequest(
                { url: "api/userlistblck?mode=unblck" },
                {
                  array: Array.from(apiref.current.getSelectedRows()).map(
                    (e) => e[1].id
                  ),
                }
              )
                .then((e) => e.data)
                .then((e) => {
                  hundlefetchuserlist();
                });
            }}
            marginTop="10px"
            marginBottom="10px"
          />
        </Box>
        <MUItable
          showCheckBox={isEdit}
          apiref={apiref}
          columns={columns2}
          data={rows}
          rowHeight={25}
          onRowSelectionModelChange={(e) => {
            try {
              setSelectedDet(
                Array.from(apiref.current.getSelectedRows())[0][1]
              );
            } catch {}
          }}
        ></MUItable>
        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem onClick={hundleBlock} sx={{ height: "20px" }}>
            <ListItemIcon>
              <BlockTwoToneIcon />
            </ListItemIcon>
            <ListItemText>{menu ? "Unblock User" : "Block User"}</ListItemText>
          </MenuItem>
        </Menu>
      </Container>
    </div>
  );
}

export default UserList;
