import React, { useState } from "react";
import BoxTile from "../../../Components/Dashboard/BoxTile";
import { Box, Stack, Container, useTheme, Grid } from "@mui/material";
import {
  BusinessCenterOutlined,
  ShoppingBagOutlined,
  HomeWorkOutlined,
} from "@mui/icons-material";
import OrderedItemList from "../../../Components/Dashboard/OrderedItemList";
import BoxContainer from "../../../Components/Dashboard/BoxContainer";
import StreamChart from "../../../Components/Charts/StreamChart";
import AreaChart from "../../../Components/Charts/AreaChart";
import BarChart from "../../../Components/Charts/BarChart";
import moment from "moment";
import { GetMultiple, GetRequest } from "../../../API/api";
import { useEffect } from "react";
import { supplierColors } from "../../../Data/DashboardData";

const optionsList = [
  { label: "View", href: "/view" },
  { label: "Download", href: "/download" },
];

function PR(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [itemCategory, setItemCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [barChart, setBarChart] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [streamData, setStreamData] = useState([]);

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("dashboard-pr")) ?? []
  );

  const theme = useTheme();
  const color = theme.palette;

  const TopCategories = () => {
    const theme = useTheme();
    return (
      <Stack gap={4}>
        {topCategories.map((el, k) => {
          return (
            <OrderedItemList
              name={el.category}
              count={k + 1}
              icon={el.icon}
              bgColor={supplierColors[k]}
              textColor={el.textColor}
              value={el.value}
            />
          );
        })}
      </Stack>
    );
  };

  const contents = [
    {
      icon: ShoppingBagOutlined,
      header: `Monthly Purchase Request`,
      content: <AreaChart data={areaData} />,
      width: "50%",
    },
    {
      icon: HomeWorkOutlined,
      header: "Top 5 Departments",
      content: (
        <BarChart
          data={barChart}
          direction="horizontal"
          keys={[
            "department1",
            "department2",
            "department3",
            "department4",
            "department5",
          ]}
        />
      ),
      width: "50%",
    },
  ];

  let urls = [
    "api/category",
    "api/purchase_relation-top",
    "api/purchase_relation-monthly",
    "api/item_category-top",
    `api/purchase_request-main-chart/${itemCategory}`,
  ];

  const FetchAll = () => {
    setIsLoading(true);
    GetMultiple(urls).then((res) => {
      setData(res);
      // Set response to localStorage
      localStorage.setItem("dashboard-pr", JSON.stringify(res));

      setIsLoading(false);
    });
  };

  const handleFetch = (itemCategory) => {
    GetRequest({ url: `api/purchase_request-main-chart/${itemCategory}` }).then(
      (res) => {
        setStreamData(res.data.data);
      }
    );
  };

  useEffect(() => {
    if (data.length === 0) {
      FetchAll();
    } else {
      setCategories(data[0].data.data);
      setBarChart(data[1].data.data);
      setAreaData(data[2].data.data);
      setTopCategories(data[3].data.data);
      setStreamData(data[4].data.data);
    }
    console.log(streamData);
  }, [data]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ backgroundColor: color.secondary.lightGray, flex: 1 }}>
        <Container maxWidth="100vw">
          <Box pt={{ xs: 8, sm: 8, md: 10 }}>
            <Grid
              container
              spacing={2}
              direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
              justify="center"
              alignItems="stretch"
            >
              <Grid item xs={9.49}>
                <Box mb={2}>
                  <BoxContainer
                    withList={true}
                    list_title={"Department"}
                    list={categories}
                    setValue={setItemCategory}
                    value={itemCategory}
                    action={handleFetch}
                    isLoading={isLoading}
                    options={optionsList}
                    icon={BusinessCenterOutlined}
                    header={"Purchase Requests"}
                    content={
                      <StreamChart
                        data={streamData}
                        keys={["For_Approval", "On_Bidding", "Fulfilled"]}
                        scheme={"pastel1"}
                        height={"400px"}
                      />
                    }
                    width={"100%"}
                  />
                </Box>
                {/* <Box>
                  <BoxContainer
                    options={optionsList}
                    icon={ShoppingBagOutlined}
                    header={`Monthly Purchase Request ( ${moment().format(
                      "MMMM"
                    )} )`}
                    content={<AreaChart data={areaData} />}
                    width={"100%"}
                  />
                </Box> */}
                <Box display={{ md: "flex", sm: "block" }} gap={2}>
                  {contents.map((el) => {
                    return (
                      <BoxContainer
                        isLoading={isLoading}
                        options={optionsList}
                        icon={el.icon}
                        header={el.header}
                        content={el.content}
                        width={el.width}
                      />
                    );
                  })}
                </Box>
              </Grid>
              <Grid item xs={2.5}>
                <Grid width="100%" spacing={3}>
                  <Grid item xs={12}>
                    <BoxContainer
                      isLoading={isLoading}
                      options={optionsList}
                      icon={BusinessCenterOutlined}
                      header={"Top Requested Item Categories"}
                      content={<TopCategories />}
                      width={"100%"}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default PR;
