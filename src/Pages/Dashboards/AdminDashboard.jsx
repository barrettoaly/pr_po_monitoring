import React from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Container,
  LinearProgress,
  Stack,
  useTheme,
} from "@mui/material";
import TitleHeader from "../../Components/TitleHeader";
import BoxTile from "../../Components/Dashboard/BoxTile";
import {
  Apartment,
  Block,
  DeliveryDining,
  Handshake,
  ListAltRounded,
  OnlinePrediction,
  PendingOutlined,
  PersonOff,
  VerifiedUser,
} from "@mui/icons-material";
import BoxContainer from "../../Components/Dashboard/BoxContainer";
import PieChart from "../../Components/Charts/PieChart";
import BarChart from "../../Components/Charts/BarChart";
import { useEffect } from "react";
import { GetMultiple } from "../../API/Api";
import { useState } from "react";
import AnimateLoader from "../../Components/Loader/AnimateLoader";

const tileData = [
  { count: 10, title: "Pending Request", icon: VerifiedUser, percent: 30 },
  { count: 22, title: "Daily Delivery", icon: DeliveryDining, percent: 60 },
  { count: 32, title: "Daily Item Issuance", icon: Handshake, percent: 70 },
  { count: 5, title: "Fulfilled PRs", icon: VerifiedUser, percent: null },
  {
    count: 4,
    title: "Cancelled Deliveries",
    icon: VerifiedUser,
    percent: null,
  },
];

function AdminDashboard(props) {
  const theme = useTheme();
  const color = theme.palette;

  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  // CARD
  const [pending, setPending] = useState([]);
  const [active, setActive] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [inactive, setInactive] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
  // Container
  const optionsList = [
    { label: "View", href: "/view" },
    { label: "Download", href: "/download" },
  ];

  const urls = [
    "/api/user/card/blocked",
    "/api/user/card/pending",
    "/api/user/card/active",
    "/api/user/card/inactive",
    "/api/department-registered",
    "/api/user/statistic/pie",
    "/api/department-top",
  ];

  const FetchAll = () => {
    setIsLoading(true);
    //GetMultiple(urls, source.token).then((res) => {
    //   setBlocked(res[0].data);
    //   setPending(res[1].data);
    //   setActive(res[2].data);
    //   setInactive(res[3].data);
    //   setCount(res[4].data);
    //   setPieData(res[5].data);
    //   setBarData(res[6].data.data);

    //   setIsLoading(false);
    // });
  };

  useEffect(() => {
    //  const source = axios.CancelToken.source();
    // const intervalId = setInterval(() => {
    //   FetchAll();
    // }, 5000);
    // return () => clearInterval(intervalId);
    //   FetchAll(source);
    //   return () => source.cancel("Request canceled due to component unmounting.");
  }, []);

  return (
    <div style={{ backgroundColor: color.secondary.lightGray, height: "100%" }}>
      <Container maxWidth="2xl" sx={{ padding: "40px" }}>
        <Box paddingBottom="30px">
          <TitleHeader title="Dashboard" withBreadCrumbs={false} />
        </Box>

        <Box sx={{ zIndex: -10 }}>
          <Stack direction="row" gap={2} sx={{ width: "100%" }}>
            <BoxTile
              isLoading={isLoading}
              count={pending.total}
              title="Pending users"
              icon={PendingOutlined}
              percent={pending.percent}
            />

            <BoxTile
              isLoading={isLoading}
              count={blocked.total}
              title="Blocked users"
              icon={Block}
              percent={blocked.percent}
            />
            <BoxTile
              isLoading={isLoading}
              count={active.total}
              title="Active users"
              icon={OnlinePrediction}
              percent={active.percent}
            />
            <BoxTile
              isLoading={isLoading}
              count={inactive.total}
              title="Inactive users"
              icon={PersonOff}
              percent={inactive.percent}
            />
            <BoxTile
              isLoading={isLoading}
              count={count.data}
              title="No. of Departments Registered"
              icon={Apartment}
              percent={null}
            />
          </Stack>

          <Box display="flex" mt={2} gap={2}>
            <BoxContainer
              isLoading={isLoading}
              options={optionsList}
              icon={ListAltRounded}
              header="User Status"
              width={"50%"}
              content={
                <Box align="center" mt={6} mb={3}>
                  <PieChart data={pieData} />
                </Box>
              }
            />

            <BoxContainer
              isLoading={isLoading}
              options={optionsList}
              icon={ListAltRounded}
              header="Department Users"
              width={"50%"}
              content={
                <Box align="center" mt={2} mb={3}>
                  <BarChart data={barData} keys={keys} direction="horizontal" />
                </Box>
              }
            />
          </Box>
        </Box>
        {/* CONTENT */}
      </Container>
    </div>
  );
}

export default AdminDashboard;
