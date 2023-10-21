import React, { Suspense } from "react";
import Header from "../../../Contents/OMCC/Header";
import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { boxTile, lineData, topSupplier } from "../../../Data/DashboardData";
import BoxTile from "../../../Components/Dashboard/BoxTile";
import OrderedItemList from "../../../Components/Dashboard/OrderedItemList";
import MultiColorProgress from "../../../Components/Dashboard/MultiColorProgress";
import { useState } from "react";
import { Routes, useNavigate, Route, Outlet, Link } from "react-router-dom";
import PieChart from "../../../Components/Charts/PieChart";
import { adminPieData } from "../../../Data/ChartData";
import LineChart from "../../../Components/Charts/LineChart";
import BoxContainer from "../../../Components/Dashboard/BoxContainer";
import { List } from "@mui/icons-material";
import AnimatedLoader from "../../../Components/Loader/AnimateLoader";
import omccRoute from "./RouteOMCC";
import Dashboard from "../../Dashboard";

function OMCCDashboard(props) {
  let navigate = useNavigate();
  const fragment = window.location.hash;
  const url = fragment.split("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [activeCell, setActiveCell] = useState(null);

  const handleClickTile = (id, title) => {
    setTitle(title);

    setShow(true);
    setActiveCell(id);
    navigate(`#${id}`);
  };

  const handleClose = (id) => {
    setShow(false);
    setActiveCell(null);
    navigate("");
  };

  const optionsList = [
    { label: "View", href: "/view" },
    { label: "Download", href: "/download" },
  ];
  return (
    <>
      <div style={{ zIndex: 10 }}>
        <Header />
      </div>

      <Box pt={10}>
        <Outlet />
      </Box>
    </>
  );
}

{
  /* 
{pageLoading ? (
  <Skeleton animation="wave" />
) : (
  <div
    style={{
      backgroundColor: "#F5F5F5",
      height: "100%",
      paddingBottom: 2,
    }}
  >
    

    <Container maxWidth="100vw" zIndex={-10}>
      <Routes>
        <Route path="/po" element={<>smoetakajwda</>}></Route>
      </Routes>
      <Suspense fallback={<AnimatedLoader />}>
        <Routes>
          <Route
            path={"dashboard/pr"}
            element={<Dashboard></Dashboard>}
          ></Route>
          <Route
            path="/*"
            element={
              <Routes>
                {omccRoute.map(
                  ({ label, href, active, full, component }, index) => {
                    return (
                      <Route
                        key={index}
                        path={href}
                        element={component}
                      ></Route>
                    );
                  }
                )}
              </Routes>
            }
          />
        </Routes>
      </Suspense>
      {props.children}
    </Container>
  </div>
)}

*****
*/
}

// // {/* <Box pt={{ xs: 8, sm: 8, md: 10 }}>
// //               <Grid
// //                 container
// //                 spacing={2}
// //                 direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
// //                 justify="center"
// //                 alignItems="stretch"
// //               >
// //                 <Grid item xs={9}>
// //                   <Grid width="100%" spacing={3}>
// //                     {/* TILES */}
// //                     <Grid item xs={12}>
// //                       <Box
// //                         display={{
// //                           lg: "flex",
// //                           md: "flex",
// //                           m: "block",
// //                           xs: "",
// //                         }}
// //                         direction={{
// //                           lg: "row",
// //                           md: "row",
// //                           sm: "column",
// //                           xs: "",
// //                         }}
// //                         gap={2}
// //                       >
// //                         {boxTile.map((e) => {
// //                           return (
// //                             <BoxTile
// //                               action={() => {
// //                                 handleClickTile(e.id, e.title);
// //                               }}
// //                               isActive={activeCell == e.id ? true : false}
// //                               count={e.count}
// //                               title={e.title}
// //                               spacing
// //                               icon={e.icon}
// //                               percent={e.percent}
// //                               forMCC={true}
// //                             />
// //                           );
// //                         })}
// //                       </Box>
// //                     </Grid>

// //                     {/* COLLAPSED DATA */}
// //                     <Collapse in={show}>
// //                       <Grid item xs={12} mt={2} backgroundColor="white">
// //                         <Box p={3}>
// //                           {/* DATA HERE */}
// //                           <Box
// //                             display="flex"
// //                             justifyContent={"space-between"}
// //                             alignItems={"center"}
// //                           >
// //                             <Typography textTransform={"uppercase"}>
// //                               {title}
// //                             </Typography>
// //                             <Button
// //                               float="right"
// //                               onClick={handleClose}
// //                               variant="outlined"
// //                               size="small"
// //                               color="error"
// //                             >
// //                               Close
// //                             </Button>
// //                           </Box>
// //                           <Typography>
// //                             You have clicked: {activeCell}
// //                           </Typography>
// //                         </Box>
// //                       </Grid>
// //                     </Collapse>
// //                     {/* END*/}

// //                     <Grid item xs={12} mt={2}>
// //                       <BoxContainer
// //                         options={optionsList}
// //                         icon={List}
// //                         header={"Purchase Order Status"}
// //                         content={
// //                           <Box
// //                             pt={10}
// //                             pb={6}
// //                             align="center"
// //                             backgroundColor="white"
// //                           >
// //                             <MultiColorProgress />
// //                           </Box>
// //                         }
// //                         width={"100%"}
// //                       />
// //                     </Grid>
// //                   </Grid>
// //                 </Grid>
// //                 <Grid item xs={3}>
// //                   <Grid sx={{ height: "100%", backgroundColor: "white", p: 3 }}>
// //                     <Stack gap={2}>
// //                       {topSupplier.map((el, k) => {
// //                         return (
// //                           <OrderedItemList
// //                             withIcon={el.withIcon}
// //                             name={el.name}
// //                             count={k + 1}
// //                             icon={el.icon}
// //                             bgColor={el.bgColor}
// //                             textColor={el.textColor}
// //                           />
// //                         );
// //                       })}
// //                     </Stack>
// //                   </Grid>
// //                 </Grid>{" "}
// //               </Grid>
// //               {/* NEXT */}

// //               <Grid
// //                 container
// //                 spacing={2}
// //                 direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
// //                 justify="center"
// //                 alignItems="stretch"
// //                 mt={0}
// //               >
// //                 <Grid item xs={4.5}>
// //                   <BoxContainer
// //                     options={optionsList}
// //                     icon={List}
// //                     header={"Purchase Order Status"}
// //                     content={
// //                       <Box bgcolor={"white"}>
// //                         <Box align="center" mt={6} mb={3}>
// //                           <PieChart data={adminPieData} />
// //                         </Box>
// //                       </Box>
// //                     }
// //                     width={"100%"}
// //                   />
// //                 </Grid>

// //                 <Grid item xs={7.5} width={"100%"}>
// //                   <BoxContainer
// //                     options={optionsList}
// //                     icon={List}
// //                     header={"Purchase Order Status"}
// //                     content={
// //                       <Box p={3} bgcolor={"white"} sx={{ height: "100%" }}>
// //                         <LineChart data={lineData} />
// //                       </Box>
// //                     }
// //                     width={"100%"}
// //                   />
// //                 </Grid>
// //               </Grid>
// //             </Box> */}

export default OMCCDashboard;
