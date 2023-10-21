import React, { useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { GetMultiple } from "../../../API/Api";
import { boxTile, supplierColors } from "../../../Data/DashboardData";
import BoxTile from "../../../Components/Dashboard/BoxTile";
import OrderedItemList from "../../../Components/Dashboard/OrderedItemList";
import MultiColorProgress from "../../../Components/Dashboard/MultiColorProgress";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PieChart from "../../../Components/Charts/PieChart";
import BarChart from "../../../Components/Charts/BarChart";
import BoxContainer from "../../../Components/Dashboard/BoxContainer";
import CustomDataTable from "../../../Components/MUItable/CustomDataTable";
import {
  CorporateFare,
  EmojiEventsOutlined,
  List,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import LineChart from "../../../Components/Charts/LineChart";
import PRShow from "../../../Contents/OMCC/PRShow";
import BiddingShow from "../../../Contents/OMCC/BiddingShow";
import { PostRequest, GetRequest } from "../../../API/Api";
import { OmccApproval } from "../../../Components/OmccApproval";
import { useController } from "../../../Context/DataContext";
import { SearchPR } from "./SearchPR";

const Main = (props) => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeCell, setActiveCell] = useState(null);
  const [categoryPie, setCategoryPie] = useState([]);
  const [departmentUsers, setDepartmentUsers] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [year, setYear] = useState("2022");
  const [topSuppliers, setTopSuppliers] = useState([]);
  const [biddingCount, setBiddingCount] = useState(0);
  const [issuanceDaily, setIssuanceDaily] = useState(0);
  const [pendingPR, setPendingPR] = useState(0);
  const [PRStatus, setPRStatus] = useState([]);
  const [dataG, setDataG] = useState([]);
  const [rowsPending, setRowsPending] = useState([]);
  const [rowsApproved, setRowsApproved] = useState([]);
  const [rowsCancelled, setRowsCancelled] = useState([]);
  const [newTransRecords, setNewTransrecords] = useState([]);
  const [name, setName] = useState("");
  const [allPrs, setAllPrs] = useState([]);
  const { user } = useController();
  const [date, setDate] = useState("");
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("dashboard-data")) ?? []
  );

  const handleClickTile = (id, title) => {
    setTitle(title);

    setShow(true);
    setActiveCell(id);
  };

  const handleClose = () => {
    setShow(false);
    setActiveCell(null);
  };

  const optionsList = [
    { label: "View", href: "/view" },
    { label: "Download", href: "/download" },
  ];

  // FETCHING
  let urls = [
    "/api/item_category-pie",
    "/api/department-top10",

    `/api/issuanceitem-top/line/${year}`,
    "api/supplier/top/s",
    "/api/on-bidding-count",
    "/api/issuance-daily",
    "/api/purchase_request-percentage",
    "api/purchase_request-statistic",
  ];

  const FetchAll = () => {
    setIsLoading(true);
    GetMultiple(urls).then((res) => {
      setData(res);
      // Set response to localStorage
      localStorage.setItem("dashboard-data", JSON.stringify(res));

      setIsLoading(false);
    });
  };

  const keys = [
    "department1",
    "department2",
    "department3",
    "department4",
    "department5",
    "department6",
    "department7",
    "department8",
    "department9",
    "department10",
  ];

  useEffect(() => {
    if (data.length === 0) {
      FetchAll();
    } else {
      setCategoryPie(data[0].data.data);
      setDepartmentUsers(data[1].data.data);
      setLineData(data[2].data.data);
      setTopSuppliers(data[3].data.data);
      setBiddingCount(data[4].data.data);
      setIssuanceDaily(data[5].data.data);
      setPendingPR(data[6].data);
      setPRStatus(data[7].data.data);
    }
  }, [data]);

  const ConvertToPercentage = (l, t) => {
    const percentage = (l / t) * 100;

    return percentage.toFixed(1);
  };

  const FetchData = () => {
    PostRequest({ url: "api/purchase_request/FetchOMCCDataDashboard" })
      .then((res) => {
        const { data } = res;
        setDataG(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchPRLists = () => {
    Promise.all([
      GetRequest({ url: "/api/purchase_relation/pending" }),
      //  GetRequest({ url: "/api/purchase_relation/approved" }),
      GetRequest({ url: "/api/purchase_relation/cancelled" }),
    ])
      .then(([pendingRes, returnedRes]) => {
        if (pendingRes.statusText !== "OK" || returnedRes.statusText !== "OK") {
          throw new Error("Bad response");
        }

        setRowsPending(pendingRes.data.data);
        //  setRowsApproved(approvedRes.data.data);
        setRowsCancelled(returnedRes.data.data);
        setName(approvedRes.data.data[0].approve_name);
        setDate(approvedRes.data.data[0].created_at);
        //setPoNo()
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const fetchNewTrans = () => {
    PostRequest({
      url: "/api/purchase_relation/fetchallNEWTransStatus",
    })
      .then((res) => {
        const {
          data: { data },
        } = res;

        setNewTransrecords(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchPR = () => {
    GetRequest({ url: "/api/pr_relation/AllPR" })
      .then((res) => {
        const {
          data: { data },
        } = res;
        setAllPrs(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchPRLists();
    fetchNewTrans();
    FetchData();
    fetchPR();
  }, []);

  const checkIFstatusthree = () => {
    if (
      rowsPending.filter((x) => x.status == 3 && x.FK_user_ID == user.role)
        .length >= 1
    ) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          height: "100%",
          paddingBottom: 2,
        }}
      >
        {/* <div style={{ zIndex: 10 }}>
            <Header />
          </div> */}

        <Container maxWidth="100vw" zIndex={-10}>
          <Box pt={{ xs: 8, sm: 8, md: 10 }}>
            <Grid
              container
              spacing={2}
              direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
              justify="center"
              alignItems="stretch"
            >
              <Grid item xs={8.99}>
                <Grid width="100%" spacing={3}>
                  {/* TILES */}
                  <Grid item xs={12}>
                    <Box
                      display={{
                        lg: "flex",
                        md: "flex",
                        m: "block",
                        xs: "",
                      }}
                      direction={{
                        lg: "row",
                        md: "row",
                        sm: "column",
                        xs: "",
                      }}
                      gap={2}
                    >
                      <BoxTile
                        isLoading={isLoading}
                        action={() => {
                          handleClickTile(1, "Pending PRs");
                        }}
                        isActive={activeCell == 1 ? true : false}
                        count={dataG.pendingPRs && dataG.pendingPRs.length}
                        title={"Pending PRs"}
                        spacing
                        // icon={e.icon}
                        percent={ConvertToPercentage(
                          dataG.pendingPRs && dataG.pendingPRs.length,
                          dataG.totalRequest && dataG.totalRequest
                        )}
                        forMCC={true}
                      />
                      <BoxTile
                        isLoading={isLoading}
                        action={() => {
                          handleClickTile(2, "On Bidding");
                        }}
                        isActive={activeCell == 2 ? true : false}
                        count={dataG.onBidding && dataG.onBidding.length}
                        title={"On Bidding"}
                        spacing
                        // icon={e.icon}
                        percent={null}
                        forMCC={true}
                      />
                      <BoxTile
                        isLoading={isLoading}
                        action={() => {
                          navigate("issuance");
                          // handleClickTile(3, "Daily Issuance");
                        }}
                        isActive={activeCell == 3 ? true : false}
                        count={
                          dataG.dailyIssuance && dataG.dailyIssuance.length
                        }
                        title={"Daily Issuance"}
                        spacing
                        // icon={e.icon}
                        percent={null}
                        forMCC={true}
                      />
                    </Box>
                    <SearchPR allPrs={allPrs} />
                  </Grid>
                  {/* {console.log(
                    rowsPending.filter((x) =>
                      [2, 3, 5].includes(x.status)
                        ? x.status == 5
                          ? user.role == 7
                            ? true
                            : x.NextUserRole == user.role
                            ? x.NextUserRole == user.role
                            : x.FK_user_ID == user.role
                          : x.status == 2
                          ? x.NextUserRole == user.role
                            ? checkIFstatusthree()
                              ? false
                              : rowsCancelled.filter((e) => e.id == x.id)
                                  .length >= 1
                              ? false
                              : true
                            : false
                          : x.status == 3
                          ? user.role == 7
                            ? true
                            : x.FK_user_ID == user.role
                          : false
                        : true
                    )
                  )} */}

                  {rowsPending.filter((x) =>
                    [2, 3, 5].includes(x.status)
                      ? x.status == 5
                        ? user.role == 7
                          ? true
                          : x.NextUserRole == user.role
                          ? x.NextUserRole == user.role
                          : x.FK_user_ID == user.role
                        : x.status == 2
                        ? x.NextUserRole == user.role
                          ? checkIFstatusthree()
                            ? false
                            : rowsCancelled.filter((e) => e.id == x.id)
                                .length >= 1
                            ? false
                            : true
                          : false
                        : x.status == 3
                        ? user.role == 7
                          ? true
                          : x.FK_user_ID == user.role
                        : false
                      : true
                  ).length >= 1 && (
                    <OmccApproval
                      rowsPending={rowsPending}
                      rowsCancelled={rowsCancelled}
                      newTransRecords={newTransRecords}
                      name={name}
                      date={date}
                    />
                  )}

                  {/* COLLAPSED DATA */}
                  <Collapse in={show}>
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
                          <Typography
                            textTransform={"uppercase"}
                            fontWeight={600}
                          >
                            {title}
                          </Typography>
                          <Button
                            onClick={handleClose}
                            variant="contained"
                            size="small"
                            color="error"
                          >
                            Close
                          </Button>
                        </Box>

                        {activeCell === 1 ? (
                          <PRShow data={dataG.pendingPRs && dataG.pendingPRs} />
                        ) : activeCell === 2 ? (
                          <BiddingShow />
                        ) : (
                          `Coming soon ${activeCell}`
                        )}
                      </Box>
                    </Grid>
                  </Collapse>
                  {/* END*/}
                  <Grid item xs={12} mt={2}>
                    <BoxContainer
                      isLoading={isLoading}
                      options={optionsList}
                      icon={List}
                      header={"Purchase Order Status"}
                      content={
                        <Box
                          pt={10}
                          pb={6}
                          align="center"
                          backgroundColor="white"
                        >
                          <MultiColorProgress
                            data={PRStatus}
                            dataG={dataG}
                            ConvertToPercentage={ConvertToPercentage}
                          />
                        </Box>
                      }
                      width={"100%"}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid sx={{ height: "100%", backgroundColor: "white" }}>
                  <BoxContainer
                    isLoading={isLoading}
                    options={optionsList}
                    icon={EmojiEventsOutlined}
                    header={"Top 5 Suppliers"}
                    content={
                      <Stack gap={3}>
                        {topSuppliers.map((el, k) => {
                          return (
                            <OrderedItemList
                              withIcon={
                                k === 0
                                  ? // <Star
                                    //   sx={{
                                    //     fontSize: 20,
                                    //     ml: 1,
                                    //     color:
                                    //       theme.palette.secondary.lightPurple,
                                    //   }}
                                    // />
                                    ""
                                  : ""
                              }
                              name={el.name}
                              count={k + 1}
                              icon={el.icon}
                              bgColor={supplierColors[k]}
                              textColor={el.textColor}
                              value={el.total_po}
                            />
                          );
                        })}
                      </Stack>
                    }
                    width={"100%"}
                  />
                </Grid>
              </Grid>{" "}
            </Grid>
            {/* NEXT */}

            <Grid
              container
              spacing={2}
              direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
              justify="center"
              alignItems="stretch"
              mt={0}
            >
              <Grid item xs={4.5}>
                <BoxContainer
                  isLoading={isLoading}
                  options={optionsList}
                  icon={VerifiedUserOutlined}
                  header={"Pie Chart Title"}
                  content={
                    <Box bgcolor={"white"}>
                      <Box align="center" mt={6} mb={3}>
                        <PieChart data={categoryPie} />
                      </Box>
                    </Box>
                  }
                  width={"100%"}
                />
              </Grid>

              <Grid item xs={7.5} width={"100%"}>
                <BoxContainer
                  isLoading={isLoading}
                  options={optionsList}
                  icon={CorporateFare}
                  header={"Top Users by Department"}
                  content={
                    <Box py={3} bgcolor={"white"} sx={{ height: "100%" }}>
                      <BarChart
                        data={departmentUsers}
                        direction="horizontal"
                        keys={keys}
                      />
                    </Box>
                  }
                  width={"100%"}
                />
              </Grid>
            </Grid>

            {/* LINE */}
            <Grid
              container
              spacing={2}
              direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
              justify="center"
              alignItems="stretch"
              mt={0}
            >
              <Grid item xs={12}>
                <BoxContainer
                  isLoading={isLoading}
                  options={optionsList}
                  icon={List}
                  header={"Top Issued Items"}
                  content={
                    <Box bgcolor={"white"}>
                      <Box align="center" mt={6} mb={3}>
                        <LineChart data={lineData} />
                      </Box>
                    </Box>
                  }
                  width={"100%"}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Main;
