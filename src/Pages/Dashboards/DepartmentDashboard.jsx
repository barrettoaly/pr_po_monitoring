import React, { useEffect, useState } from "react";

import { Box, Container, Stack, useTheme } from "@mui/material";
import BoxTile from "../../Components/Dashboard/BoxTile";
import BoxContainer from "../../Components/Dashboard/BoxContainer";
import ToggleButtonComponent from "../../Components/ToggleButtonComponent";

import {
  AccountBalance,
  Analytics,
  TableChart,
  VerifiedUser,
  Handshake,
  DoneAll,
  DeliveryDining,
} from "@mui/icons-material";

import LineChart from "../../Components/Charts/LineChart";
import DepartmentDataTable from "../../Components/Dashboard/DepartmentDataTable";

import { GetMultiple, GetRequest } from "../../API/api";
import axios from "axios";
import { localStorageGetter } from "../../utility/ParseData";

const tileData = [
  { count: 10, title: "Pending Request", icon: VerifiedUser, percent: 30 },
  { count: 32, title: "Daily Item Issuance", icon: Handshake, percent: 70 },
  { count: 5, title: "Fulfilled PRs", icon: DoneAll, percent: null },
  { count: 22, title: "Daily Delivery", icon: DeliveryDining, percent: 60 },
];

function DepartmentDashboard(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingPR, setPendingPR] = useState([]);
  const [dailyIssuance, setDailyIssuance] = useState(0);
  //const purchaseOrders, setPurchaseOrders = useState([]);
  // const [users, setUsers] = useState([]);
  const [fetch, setFetch] = useState(true);
  // const [lineData, setLineData] = useState([]);
  const [department, setDepartment] = useState([]);
  const [view, setView] = useState("linechart");

  const theme = useTheme();
  const color = theme.palette;

  const dataView = [
    { icon: <Analytics />, value: "linechart" },
    { icon: <TableChart />, value: "table" },
  ];

  const lineData = [
    {
      id: "Department 1",
      data: [
        { x: "Jan", y: 293 },

        { x: "Feb", y: 267 },

        { x: "Mar", y: 311 },

        { x: "Apr", y: 214 },

        { x: "May", y: 208 },

        { x: "Jun", y: 177 },

        { x: "Jul", y: 2 },

        { x: "Aug", y: 0 },

        { x: "Sep", y: 2 },

        { x: "Oct", y: 0 },

        { x: "Nov", y: 0 },

        { x: "Dec", y: 0 },
      ],
    },

    {
      id: "Department 2",
      data: [
        { x: "Jan", y: 38 },

        { x: "Feb", y: 103 },

        { x: "Mar", y: 148 },

        { x: "Apr", y: 117 },

        { x: "May", y: 132 },

        { x: "Jun", y: 139 },

        { x: "Jul", y: 147 },

        { x: "Aug", y: 145 },

        { x: "Sep", y: 18 },

        { x: "Oct", y: 0 },

        { x: "Nov", y: 0 },
        { x: "Dec", y: 0 },
      ],
    },
  ];

  const onToggleView = (event, newValue) => {
    if (newValue !== null) {
      setView(newValue);
    }
  };

  const urls = [
    "api/purchase_request-percentage",
    "api/issuance-daily",
    //PENDING APIS
    //TOTAL PO
    //TOTAL USERS
  ];

  // FETCH Data
  const fetchAll = (source) => {
    setIsLoading(true);

    GetMultiple(urls, source.token)
      .then((res) => {
        //Pending Pr
        localStorage.setItem("pendingPr", JSON.stringify(res[0].data));
        setPendingPR(res[0].data);

        // console.log(res[1].data);
        //Daily Issuance
        localStorage.setItem("dailyIssuance", JSON.stringify(res[1].data.data));
        setDailyIssuance(res[1].data.data);

        setIsLoading(false);
      })
      .catch(() => {
        if (axios.isCancel(error)) {
          console.log("Request Cancelled: ", error.message);
        } else {
          console.log(error);
        }
      });
  };

  const check = () => {
    if (
      localStorage.getItem("pendingPr") !== null &&
      localStorage.getItem("dailyIssuance") !== null
    ) {
      setPendingPR(localStorageGetter("pendingPr"));
      setDailyIssuance(localStorageGetter("dailtyIssuance"));
      setIsLoading(false);
      return true;
    }

    return false;
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (check()) {
      return;
    }

    if (fetch) {
      fetchAll(source);
    }

    return () => source.cancel("Request cancelled due to component unmountin");
  }, [fetch]);

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
              count={pendingPR.totaPendingPR}
              title={"Pending PRs"}
              icon={tileData[0].icon}
              percent={pendingPR.percentage ?? null}
            />

            {/* <BoxTile
              isLoading={isLoading}
              count={dailyIssuance}
              title={"Daily Issuance"}
              icon={tileData[1].icon}
              percent={null}
            /> */}
            <BoxTile
              isLoading={isLoading}
              count={3}
              title={"Total PO"}
              icon={tileData[2].icon}
              percent={null}
            />
            <BoxTile
              isLoading={isLoading}
              count={dailyIssuance}
              title={"Total Users"}
              icon={tileData[3].icon}
              percent={null}
            />
            {/* {" "} */}
          </Box>

          <Box display="flex" mt={2} gap={2}>
            <BoxContainer
              isLoading={isLoading}
              // options={optionsList}
              icon={AccountBalance}
              header="Department"
              content={
                <>
                  <ToggleButtonComponent
                    value={view}
                    data={dataView}
                    onChange={onToggleView}
                  />
                  {view === "linechart" ? (
                    <LineChart data={lineData} />
                  ) : (
                    <DepartmentDataTable data={department} />
                  )}
                </>
              }
              width={"100%"}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default DepartmentDashboard;
