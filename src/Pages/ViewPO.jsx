import {
  Box,
  Container,
  Typography,
  useTheme,
  Grid,
  Link,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableHeader from "../Components/Table/TableHeader";
import TableCell from "../Components/Table/TableCell";
import { ChevronLeft } from "@mui/icons-material";
import { GetRequest } from "../API/Api";

function ViewPO(props) {
  const theme = useTheme();

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [items, setItems] = useState([]);

  // FETCH PO DETAILS
  const fetch = () => {
    GetRequest({ url: `/api/purchase_order/${id}` }).then((res) => {
      setData(res.data.data);
      setRemarks(res.data.data[0].remarks);
    });

    GetRequest({ url: `/api/po_item/${id}` }).then((res) => {
      setItems(res.data.data);
    });
  };

  const header = [
    { name: "Item ID ", align: "left", width: "10%" },
    { name: "Unit", align: "left", width: "10%" },
    { name: "Description", align: "left", width: "47%" },
    { name: "Quantity", align: "right", width: "10%" },
    { name: "Unit Cost", align: "right", width: "10%" },
    { name: "Amount ", align: "right", width: "13%" },
  ];

  const sum = items.reduce((e, i) => e + parseInt(i.total_price), 0);

  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <Container maxWidth="xl" sx={{ padding: "120px" }}>
        {isLoading ? (
          "loading"
        ) : (
          <>
            {data.map((po) => {
              return (
                <>
                  <Box display="flex" alignItems="center" pb={3}>
                    <ChevronLeft
                      color={theme.palette.tertiary.main}
                      style={{ fontSize: 15 }}
                    />
                    <Link
                      underline="none"
                      onClick={() => {
                        window.history.back();
                      }}
                      sx={{
                        ":hover": { cursor: "pointer" },
                        fontSize: 13.5,
                      }}
                      color={theme.palette.tertiary.main}
                    >
                      Back to Purchase Order {id}
                    </Link>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 32,
                      fontWeight: "bolder",
                    }}
                    pb="50px"
                    color={theme.palette.tertiary.main}
                  >
                    Purchase Order: {po.po_no}
                  </Typography>
                  {/* TOP */}
                  <Grid container spacing={0.3} paddingBottom="10px">
                    <Grid item xs={9} display="flex" gap={1}>
                      <Typography sx={{ fontSize: 14 }}>Supplier:</Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {po.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} display="flex" gap={1}>
                      <Typography sx={{ fontSize: 14 }}>
                        Fund Cluster:{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {po.funds ?? "NO CLUSTER"}
                      </Typography>
                    </Grid>

                    {/*  */}
                    <Grid item xs={9} />
                    <Grid item xs={3} display="flex" gap={1}>
                      <Typography sx={{ fontSize: 14 }}>PO Date: </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {po.po_date ?? "-No data available-"}
                      </Typography>
                    </Grid>

                    {/* 3 */}
                    <Grid item xs={9} display="flex" gap={1}>
                      <Typography sx={{ fontSize: 14 }}>Address:</Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {po.address ?? "-No data available-"}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} display="flex" gap={1}>
                      <Typography sx={{ fontSize: 14 }}>PR No.: </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {po.pr_no ?? "-No data available-"}
                      </Typography>
                    </Grid>

                    {/*  */}
                    <Grid item xs={9} />
                    <Grid item xs={3} display="flex" gap={1}>
                      <Typography sx={{ fontSize: 14 }}>CAF No.: </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {po.caf_number ?? "-No data available-"}
                      </Typography>
                    </Grid>

                    {/* 4 */}
                    <Grid item xs={9} display="flex" gap={1}>
                      <Typography sx={{ fontSize: 14 }}>TIN:</Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {po.tin ?? "-No data available-"}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} display="flex" gap={1}>
                      <Typography sx={{ fontSize: 14 }}>
                        Mode of Procurement:{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {po.procurement_mode ?? "-No data available-"}
                      </Typography>
                    </Grid>

                    {/* 5 */}
                    <Grid item xs={9} mt={1} mb={2}>
                      <Typography sx={{ fontSize: 14 }}>
                        Gentelemen:{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          mt: 0.2,
                          ml: 4,
                        }}
                      >
                        Please furnish this Office the following articles
                        subject to the terms and conditions contained herein:
                      </Typography>
                    </Grid>

                    {/* 6 */}
                    <Grid item xs={9} display="flex" gap={1}>
                      <Typography sx={{ fontSize: 14 }}>
                        Place of delivery:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {/* Place of delivery: */}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} display="flex" gap={1}>
                      <Typography sx={{ fontSize: 14 }}>
                        Delivery Term:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {po.terms ?? "No data available"}
                      </Typography>
                    </Grid>

                    {/* 6 */}
                    <Grid item xs={9} display="flex" gap={1}>
                      <Typography sx={{ fontSize: 14 }}>
                        Date of delivery:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {/* Date of delivery: */}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} display="flex" gap={1}>
                      <Typography sx={{ fontSize: 14 }}>
                        Payment Term:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {/* Payment term: */}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* TABLE */}
                  <Box sx={{ width: "100%", mt: 5 }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        cellPadding: 0,
                        cellSpacing: 0,
                        border: 0,
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <tr
                        style={{
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        {header.map((el) => {
                          return (
                            <th
                              style={{
                                border: `2px solid ${theme.palette.secondary.lightGray}`,
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              <TableHeader data={el.name} align={el.align} />
                            </th>
                          );
                        })}
                      </tr>

                      {items.map((el) => {
                        return (
                          <tr
                            style={{
                              margin: 0,
                              padding: 0,
                            }}
                          >
                            <td
                              style={{
                                border: `2px solid ${theme.palette.secondary.lightGray}`,
                                margin: 0,
                                padding: 0,
                              }}
                              width="10%"
                            >
                              <TableCell data={el.FK_item_ID} align="left" />
                            </td>

                            <td
                              width="10%"
                              style={{
                                border: `2px solid ${theme.palette.secondary.lightGray}`,
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              <TableCell data={el.unit} align="left" />
                            </td>

                            <td
                              style={{
                                border: `2px solid ${theme.palette.secondary.lightGray}`,
                                margin: 0,
                                padding: 0,
                              }}
                              width="50%"
                            >
                              <TableCell data={el.description} align="left" />
                            </td>

                            <td
                              style={{
                                border: `2px solid ${theme.palette.secondary.lightGray}`,
                                margin: 0,
                                padding: 0,
                              }}
                              width="10%"
                            >
                              <TableCell data={el.quantity} align="right" />
                            </td>

                            <td
                              style={{
                                border: `2px solid ${theme.palette.secondary.lightGray}`,
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              <TableCell
                                data={new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "PHP",
                                }).format(el.price)}
                                align="right"
                              />
                            </td>

                            <td
                              style={{
                                border: `2px solid ${theme.palette.secondary.lightGray}`,
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              <TableCell
                                data={new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "PHP",
                                }).format(el.total_price)}
                                align="right"
                              />

                              {console.log()}
                            </td>
                          </tr>
                        );
                      })}
                    </table>

                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="right"
                      mt={1}
                    >
                      {/* <Typography>Grand Total: </Typography> */}
                      <Typography fontSize={17} fontWeight={600}>
                        {sum.toLocaleString("en-US", {
                          style: "currency",
                          currency: "PHP",
                        })}
                      </Typography>
                    </Box>

                    <Box mt={1}>
                      {/* <Typography>Grand Total: </Typography> */}
                      <Typography fontSize={15} fontWeight={600} lineHeight={2}>
                        REMARKS:
                      </Typography>

                      <Typography fontSize={15}>
                        {remarks ?? "No remarks available"}
                      </Typography>
                    </Box>

                    <Box mt={4}>
                      {/* <Typography>Grand Total: </Typography> */}
                      <Typography fontSize={15} fontWeight={600} lineHeight={2}>
                        Total Amount in Words:
                      </Typography>

                      <Typography fontSize={15} textTransform="uppercase">
                        TOTAL HERE
                      </Typography>
                    </Box>
                  </Box>
                </>
              );
            })}
          </>
        )}
      </Container>
    </>
  );
}

export default ViewPO;
