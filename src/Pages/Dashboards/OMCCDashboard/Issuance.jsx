import React, { useEffect } from "react";
import Header from "../../../Contents/OMCC/Header";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import BoxTile from "../../../Components/Dashboard/BoxTile";
import { useState } from "react";
import PieChart from "../../../Components/Charts/PieChart";
import { adminPieData } from "../../../Data/ChartData";
import BoxContainer from "../../../Components/Dashboard/BoxContainer";
import { VerifiedUserOutlined } from "@mui/icons-material";
import BoxList from "../../../Components/Dashboard/BoxList";
import { GetMultiple } from "../../../API/api";
import ViewIssuanceDashboard from "../../../Components/ModalContents/ViewIssuanceDashboard";

const Issuance = (props) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recent, setRecent] = useState([]);
  const [activeCell, setActiveCell] = useState(null);

  const handleClickList = (id) => {
    setId(id);
    setShow(true);
    // navigate(`#${id}`);
  };

  const handleClose = () => {
    setShow(false);
  };

  let optionsList = [
    { label: "View", href: "/view" },
    { label: "Download", href: "/download" },
  ];

  // FETCHING
  let urls = ["/api/issuance-recent"];

  const FetchAll = () => {
    setIsLoading(true);
    GetMultiple(urls)
      .then((res) => {
        setRecent(res[0].data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    FetchAll();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ backgroundColor: "#F5F5F5", flex: 1 }}>
        <Container maxWidth="100vw" zIndex={-10}>
          <Box pt={{ xs: 8, sm: 8, md: 10 }}>
            <Grid
              container
              spacing={2}
              direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
              justify="center"
              alignItems="stretch"
            >
              <Grid item xs={8.2}>
                <Grid width="100%" spacing={3}>
                  <Grid item xs={12} display={"flex"} gap={2}>
                    <Grid item xs={6}>
                      <Box
                        sx={{ backgroundColor: "white", p: 2, borderRadius: 2 }}
                      >
                        <Typography fontSize={17} fontWeight={"bold"} my={1}>
                          Recent Delivery
                        </Typography>
                        <Alert>Hey. This is a sample alert</Alert>
                        <Stack mt={2} gap={1.5}>
                          {recent.map((el) => {
                            return (
                              <BoxList
                                isLoading={isLoading}
                                title={el.name}
                                items={el.total_items}
                                date={el.doc_date}
                                isDelivered={el.cancel === 0 ? true : false}
                              />
                            );
                          })}
                        </Stack>
                      </Box>
                    </Grid>
                    {show ? (
                      <ViewIssuanceDashboard id={id} onClose={handleClose} />
                    ) : (
                      ""
                    )}
                    <Grid item xs={6}>
                      <Box
                        sx={{ backgroundColor: "white", p: 2, borderRadius: 2 }}
                      >
                        <Typography fontSize={17} fontWeight={"bold"} my={1}>
                          Recent Issuance
                        </Typography>
                        <Alert>Hey. This is a sample alert</Alert>
                        <Stack mt={2} gap={1.5}>
                          {recent.map((el) => {
                            return (
                              <BoxList
                                isLoading={isLoading}
                                title={el.name}
                                items={el.total_items}
                                date={el.doc_date}
                                isDelivered={el.cancel === 0 ? true : false}
                                action={() => {
                                  handleClickList(el.id);
                                }}
                              />
                            );
                          })}
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3.75}>
                <Grid sx={{ height: "100%" }}>
                  <BoxContainer
                    options={optionsList}
                    icon={VerifiedUserOutlined}
                    header={"Monthly Delivery per Department"}
                    content={
                      <Box bgcolor={"white"}>
                        <Box align="center" mt={6} mb={3}>
                          <PieChart
                            data={adminPieData}
                            margin={{
                              top: 60,
                              right: 60,
                              bottom: 60,
                              left: 60,
                            }}
                            height="550px"
                          />
                        </Box>
                      </Box>
                    }
                    width={"100%"}
                  />
                </Grid>
              </Grid>
            </Grid>

          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Issuance;
