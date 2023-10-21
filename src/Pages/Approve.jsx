import React, { useState, useEffect } from "react";
import TitleHeader from "../Components/TitleHeader";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Grow,
  Alert,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useTheme } from "@mui/material";
import ButtonComponent from "../Components/ButtonComponent";

import ModalComponent from "../Components/Popups/ModalComponent";
import { GetRequest } from "../API/api";
import { useController } from "../Context/DataContext";
import axios from "axios";
import CustomDataTable from "../Components/MUItable/CustomDataTable";

function Approve(props) {
  const theme = useTheme();
  const color = theme.palette;
  const [selectedIDS, setSelectedIDS] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);
  const [divider, setDivider] = useState("");
  const [users, setUsers] = useState([]);
  const [severity, setSeverity] = useState("");
  const [alertmessage, setAlertmessage] = useState("");
  const [loader, setLoader] = useState(true);
  const { tabClick } = useController();
  const handleFetch = (source) => {
    GetRequest({ url: "api/user/pending" }, source)
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    handleFetch(source);
    LoadContent();

    return () => source.cancel();
  }, [tabClick]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const handleShowError = () => {
    setShowError(true);
  };

  //Set columns here
  const columns = [
    {
      field: "id",
      headerName: "#",
      headerClassName: "header-class",
    },
    {
      field: "Name",
      headerName: "Name",
      headerClassName: "header-class",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "header-class",
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Contact No",
      headerClassName: "header-class",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created_at",
      headerClassName: "header-class",
      flex: 2,
    },
  ];

  const LoadContent = () => {
    if (users.length >= 1) {
      setLoader(false);
    } else {
      setLoader(true);
      setTimeout(() => {
        users.length == 0 && setLoader(false);
      }, 1500);
    }
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ padding: "40px" }}>
        <Box paddingBottom="100px">
          <TitleHeader
            title="User Approval"
            icon={<HowToRegIcon sx={{ fontSize: "small" }} />}
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            {show ? (
              <Grow in={handleShowError}>
                <Alert
                  onClose={handleClose}
                  // variant="filled"
                  severity={severity}
                  sx={{
                    width: "100%",
                    fontWeight: 600,
                    fontSize: 14,
                    mb: 2,
                  }}
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  {alertmessage}
                </Alert>
              </Grow>
            ) : (
              ""
            )}
            <CustomDataTable
              loading={loader}
              checkboxSelection={true}
              rows={users}
              columns={columns}
              onRowSelectionModelChange={(id) => {
                setSelectedIDS(id);
              }}
            ></CustomDataTable>
          </Grid>

          <Grid item xs={3}>
            <Box px={3} border={"1px dashed gray"} borderRadius={5}>
              <Typography
                style={{
                  fontSize: 14,
                  alignItems: "center",
                  display: "flex",
                  gap: 3,
                }}
                py={3}
              >
                Manage Options <ManageAccountsIcon sx={{ fontSize: 14 }} />
              </Typography>{" "}
              <Box sx={{ pb: 3 }}>
                <ButtonComponent
                  name="Approve"
                  variant="contained"
                  color={color.tertiary.main}
                  width="100%"
                  action={() => {
                    if (selectedIDS.length >= 1) {
                      setOpenModal(true);
                      setDivider("approve");
                    } else {
                      setShow(true);
                      setSeverity("error");
                      setAlertmessage("Please select one or more to proceed.");
                    }
                  }}
                />
                <ButtonComponent
                  name="Decline"
                  variant="contained"
                  color={color.tertiary.main}
                  width="100%"
                  action={() => {
                    if (selectedIDS.length >= 1) {
                      setOpenModal(true);
                      setDivider("decline");
                    } else {
                      setShow(true);
                      setSeverity("error");
                      setAlertmessage("Please select one or more to proceed.");
                    }
                  }}
                />
                <ButtonComponent
                  name="Block"
                  variant="contained"
                  color={color.tertiary.main}
                  width="100%"
                  action={() => {
                    if (selectedIDS.length >= 1) {
                      setOpenModal(true);
                      setDivider("block");
                    } else {
                      setShow(true);
                      setSeverity("error");
                      setAlertmessage("Please select one or more to proceed.");
                    }
                  }}
                />
              </Box>
              <ModalComponent
                usedType={"UserApprove"}
                divider={divider}
                setSeverity={setSeverity}
                setShow={setShow}
                setAlertmessage={setAlertmessage}
                selectedIDS={selectedIDS}
                selectedRows={users.filter((x) => selectedIDS.includes(x.id))}
                open={openModal ? true : false}
                onClose={() => {
                  setOpenModal(false);
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Approve;
