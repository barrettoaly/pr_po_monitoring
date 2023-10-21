import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomedTabs from "../../Components/CustomedTabs";
import { Box, Container, Stack, useTheme } from "@mui/material";
import TitleHeader from "../../Components/TitleHeader";
import BoxTile from "../../Components/Dashboard/BoxTile";
import {
  CancelSharp,
  CardTravel,
  DeliveryDining,
  DoneAll,
  Handshake,
  ListAltRounded,
  VerifiedUser,
} from "@mui/icons-material";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import TableChartIcon from "@mui/icons-material/TableChart";

import ToggleButtonComponent from "../../Components/ToggleButtonComponent";
import ItemCategoryDataTable from "../../Components/Dashboard/ItemCategoryDataTable";

import BoxContainer from "../../Components/Dashboard/BoxContainer";
import LineChart from "../../Components/Charts/LineChart";
import OrderedItemList from "../../Components/Dashboard/OrderedItemList";
import MultiColorProgress from "../../Components/Dashboard/MultiColorProgress";
import { supplierColors } from "../../Data/DashboardData";
import { GetMultiple, GetRequest, PostRequest } from "../../API/api";
import {
  localStorageGetter,
  localStorageSetter,
} from "../../utility/ParseData";
import { useController } from "../../Context/DataContext";
import { set } from "lodash";

const tileData = [
  { count: 10, title: "Pending Request", icon: VerifiedUser, percent: 30 },
  { count: 22, title: "Daily Delivery", icon: DeliveryDining, percent: 60 },
  { count: 32, title: "Daily Item Issuance", icon: Handshake, percent: 70 },
  { count: 5, title: "Fulfilled PRs", icon: DoneAll, percent: null },
  {
    count: 4,
    title: "Cancelled Deliveries",
    icon: CancelSharp,
    percent: null,
  },
];

const optionsList = [
  { label: "View", href: "/view" },
  { label: "Download", href: "/download" },
];

const dataView = [
  { icon: <AnalyticsIcon />, value: "linechart" },
  { icon: <TableChartIcon />, value: "table" },
];

function MMSDashboard(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState([]);
  const [year, setYear] = useState("2022");
  const [topSuppliers, setTopSuppliers] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [itemCategory, setItemCategory] = useState([]);
  const [pendingPR, setPendingPR] = useState([]);
  const [dailyIssuance, setDailyIssuance] = useState(0);
  const [PRStatus, setPRStatus] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [view, setView] = useState("linechart");
  const [dataG, setDataG] = useState([]);
  const theme = useTheme();
  const color = theme.palette;

  const { user } = useController();

  const onToggleView = (event, newValue) => {
    if (newValue !== null) {
      setView(newValue);
    }
  };

  const urls = [
    "api/supplier/top/s",
    "api/purchase_request-statistic",
    `api/issuanceitem-top/line/${year}`,
    `api/issuanceitem-top/table/${year}`,
    "api/issuance-daily",
    "api/purchase_request-percentage",
  ];

  // const FetchAll = (source) => {
  //   setIsLoading(true);

  //   GetMultiple(urls, source.token)
  //     .then((res) => {
  //       localStorage.setItem("top", JSON.stringify(res[0].data.data));
  //       setTopSuppliers(res[0].data.data);

  //       localStorage.setItem("prStatus", JSON.stringify(res[1].data.data));
  //       setPRStatus(res[1].data.data);

  //       localStorage.setItem("lineData", JSON.stringify(res[2].data.data));
  //       setLineData(res[2].data.data);

  //       localStorage.setItem("issuance", JSON.stringify(res[3].data.data));
  //       setItemCategory(res[3].data.data);

  //       localStorage.setItem("dailyIssuance", JSON.stringify(res[4].data.data));
  //       setDailyIssuance(res[4].data.data);

  //       localStorage.setItem("pendingPr", JSON.stringify(res[5].data));
  //       setPendingPR(res[5].data);

  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       if (axios.isCancel(error)) {
  //         console.log("Request canceled:", error.message);
  //       } else {
  //         console.error(error);
  //       }
  //     });
  // };

  // const check = () => {
  //   if (
  //     localStorage.getItem("top") !== null &&
  //     localStorage.getItem("prStatus") !== null &&
  //     localStorage.getItem("lineData") !== null &&
  //     localStorage.getItem("issuance") !== null &&
  //     localStorage.getItem("dailyIssuance") !== null &&
  //     localStorage.getItem("pendingPr") !== null
  //   ) {
  //     setTopSuppliers(localStorageGetter("top"));
  //     setPRStatus(localStorageGetter("prStatus"));
  //     setLineData(localStorageGetter("lineData"));
  //     setItemCategory(localStorageGetter("issuance"));
  //     setDailyIssuance(localStorageGetter("dailyIssuance"));
  //     setPendingPR(localStorageGetter("pendingPr"));
  //     setIsLoading(false);
  //     return true;
  //   }

  //   return false;
  // };

  // useEffect(() => {
  //   const source = axios.CancelToken.source();

  //   if (check()) {
  //     return;
  //   }

  //   if (fetch) {
  //     FetchAll(source);
  //   }

  //   return () => source.cancel("Dashboard Cancel Order");
  // }, [fetch]);

  const ConvertToPercentage = (l, t) => {
    const percentage = (l / t) * 100;

    return percentage.toFixed(1);
  };

  const FetchData = (source) => {
    // setIsLoading(true);
    PostRequest(
      { url: "api/purchase_request/FetchOMCCDataDashboard" },
      source.token
    )
      .then((res) => {
        const { data } = res;
        localStorageSetter("dashboardData", data.data);
        setDataG(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          // console.log("Request canceled:", err.message);
        } else {
          console.error(err);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const checkLocalStorage = () => localStorageGetter("dashboardData") !== null;

  const setData = () => {
    setDataG(localStorageGetter("dashboardData"));
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    setIsLoading(true);

    if (checkLocalStorage()) {
      setData();
      setIsLoading(false);
    }

    if (fetch) {
      FetchData(source);
    }

    return () => source.cancel("Request canceled due to component unmounting.");
  }, [fetch]);

  const pendingPRS = () => {
    if (user.role == 7) {
      return dataG.pendingPRs && dataG.pendingPRs.length;
    }
    if (user.role == 4) {
      return dataG.procPending && dataG.procPending.length;
    }
    if (user.role == 5) {
      return dataG.budgetPending && dataG.budgetPending.length;
    }
    if (user.role == 6) {
      return dataG.accountingPending && dataG.accountingPending.length;
    }
    if (user.role == 9) {
      return dataG.financePending && dataG.financePending.length;
    }
    return 0;
  };

  return (
    <Box
      style={{
        backgroundColor: color.secondary.lightGray,
        height: "100%",
      }}
    >
      <Container maxWidth="2xl" sx={{ paddingTop: "60px" }}>
        <Box pt={5}>
          <Box display="flex" direction="column" sx={{ gap: 2, zIndex: -10 }}>
            <BoxTile
              isLoading={isLoading}
              count={pendingPRS()}
              title={"Pending PRs"}
              icon={tileData[0].icon}
              percent={ConvertToPercentage(
                pendingPRS(),
                dataG.totalRequest && dataG.totalRequest
              )}
            />

            {/* <BoxTile
              isLoading={isLoading}
              count={dailyIssuance}
              title={"Daily Issuance"}
              icon={tileData[3].icon}
              percent={null}
            /> */}
            <BoxTile
              isLoading={isLoading}
              count={3}
              title={"Daily Delivery"}
              icon={tileData[1].icon}
              percent={null}
            />
            <BoxTile
              isLoading={isLoading}
              count={
                dataG.cancelledPRS &&
                dataG.cancelledPRS.filter((x) => x.FK_user_ID == user.role)
                  .length
              }
              title={"Cancelled Delivery"}
              icon={tileData[4].icon}
              percent={ConvertToPercentage(
                dataG.cancelledPRS &&
                dataG.cancelledPRS.filter((x) => x.FK_user_ID == user.role)
                  .length,
                dataG.totalRequest && dataG.totalRequest
              )}
            />
            {/* {tileData.map((e) => {
              return (
                <BoxTile
                  isLoading={isLoading}
                  count={e.count}
                  title={e.title}
                  icon={e.icon}
                  percent={e.percent}
                />
              );
            })} */}
          </Box>

          <Box mt={2}>
            <BoxContainer
              isLoading={isLoading}
              options={optionsList}
              icon={ListAltRounded}
              header="Purchase Request Status"
              content={
                <Box align="center" mt={6} mb={3}>
                  <MultiColorProgress
                    data={PRStatus}
                    dataG={dataG}
                    ConvertToPercentage={ConvertToPercentage}
                  />
                </Box>
              }
            />

            <Box display="flex" mt={2} gap={2}>
              <BoxContainer
                isLoading={isLoading}
                options={optionsList}
                icon={CardTravel}
                header="Top Requested Items"
                content={
                  <>
                    <ToggleButtonComponent
                      value={view}
                      data={dataView}
                      onChange={onToggleView}
                    />
                    {view === "linechart" && dataG?.lineData ? (
                      <LineChart data={dataG.lineData} />
                    ) : view === "table" && dataG?.tableData ? (
                      <ItemCategoryDataTable data={dataG.tableData} />
                    ) : null}
                  </>
                }
                width={"100%"}
              />

              {/* SUPPLIER */}
              <BoxContainer
                isLoading={isLoading}
                options={optionsList}
                icon={CardTravel}
                header="Top Suppliers"
                content={
                  <>
                    <Stack gap={4}>
                      {topSuppliers.map((el, k) => {
                        return (
                          <OrderedItemList
                            name={el.name}
                            count={k + 1}
                            bgColor={supplierColors[k]}
                            textColor={supplierColors[k]}
                          />
                        );
                      })}
                    </Stack>
                  </>
                }
                width={"30%"}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      {/* </Box> */}
    </Box>
  );
}

export default MMSDashboard;
