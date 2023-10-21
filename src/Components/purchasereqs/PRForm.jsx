import {
  Typography,
  Grid,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { GetRequest } from "../../API/Api";

import PrintButton from "../PrintButton";

function PRForm({ id, fund, forMCC, data }) {
  const printableRef = useRef(); // this is for react-to-print

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [section, setSection] = useState("");
  const [prNo, setPRNo] = useState("");
  const [rcc, setRcc] = useState("");
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const [requester, setRequester] = useState("");
  const [status, setStatus] = useState("");

  const theme = useTheme();

  const header = [
    {
      name: "     Stock No./Property No. /Item No.",
      width: "15%",
      align: "center",
    },
    { name: "Unit", width: "11%", align: "center" },
    { name: "Description", width: "35%", align: "left" },
    { name: "Quantity", width: "12.5%", align: "center" },
    { name: "Unit Cost (₱)", width: "12.5%", align: "right" },
    { name: "Total Cost (₱)", width: "20%", align: "right" },
  ];

  const fetchData = () => {
    const prDetails = GetRequest({ url: `/api/purchase_relation/${id}` })
      .then((res) => {
        const {
          data: { data },
        } = res;
        const {
          name,
          pr_no,
          rcc,
          pr_date,
          funds,
          estimated_grand,
          purpose,
          requester,
          procurement_approval,
        } = data[0];
        setSection(name);
        setPRNo(pr_no);
        setRcc(rcc);
        setDate(pr_date);
        setGrandTotal(estimated_grand);
        setPurpose(purpose);
        setRequester(requester);
        setStatus(procurement_approval);
      })
      .catch((error) => console.log(error));

    const prItems = GetRequest({ url: `/api/pr_item/${id}` })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response", { cause: res });
        }
        setItems(res.data);
      })
      .catch((error) => console.log(error));

    return Promise.all([prDetails, prItems]);
  };

  useEffect(() => {
    console.log(data.status);
    setIsLoading(true);
    fetchData().finally(() => setIsLoading(false));
  }, []);

  //Print PR
  // const handleOnPrint = () => {
  //   console.log("test");
  // };

  return (
    <div>
      {isLoading ? (
        <Box align="center" my={5} mt={forMCC ? 30 : 0}>
          <CircularProgress
            size={30}
            style={{
              // position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      ) : (
        <>
          {data.pr_status === "Completed" && (
            <Grid display="flex" justifyContent="flex-end">
              <PrintButton printableRef={printableRef} />
            </Grid>
          )}
          <div ref={printableRef}>
            <Grid container py={1}>
              <Grid item xs={9} display="flex" gap={1}>
                <Typography sx={{ fontSize: 13 }}>Entity Name:</Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  ZAMBOANGA CITY MEDICAL CENTER
                </Typography>
              </Grid>

              {/* <Grid item xs={3} display="flex" gap={1}>
                <Typography sx={{ fontSize: 13 }}>Fund Cluster: </Typography>

                {fund ? (
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    <a href="#">{fund}</a>
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    -No data available-
                  </Typography>
                )}
              </Grid> */}
            </Grid>

            {/* Header */}

            <Grid container py={6}>
              <Grid item xs={4}>
                <Typography sx={{ fontSize: 12 }}>
                  PR No.: <strong>{prNo ? prNo : "-No data available-"}</strong>
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  Responsibility Center Code:{" "}
                  <strong> {rcc ? rcc : "-No data available-"}</strong>
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography sx={{ fontSize: 12 }}>
                  Office/Section:{" "}
                  <strong> {section ? section : "-No data available-"}</strong>
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography sx={{ fontSize: 12 }}>
                  Date: <strong>{date ? date : "-No data available-"}</strong>
                </Typography>
              </Grid>
            </Grid>

            <TableContainer sx={{ border: "1px solid #D8D8D8" }}>
              <Table sx={{ padding: 0, margin: 0 }}>
                <TableHead>
                  <TableRow>
                    {header.map((header) => (
                      <TableCell
                        width={header.width}
                        sx={{
                          textAlign: header.align,
                          fontSize: 11,
                          fontWeight: 600,
                          p: 0.5,
                        }}
                      >
                        {header.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                {/* MAP DATA HERE */}
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell
                        sx={{ fontSize: 12, textAlign: "center", padding: 1 }}
                      >
                        {item.id}
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: 12, textAlign: "center", padding: 1 }}
                      >
                        {item.unit}
                      </TableCell>
                      <TableCell sx={{ fontSize: 12, padding: 1 }}>
                        {item.description}
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: 12, textAlign: "center", padding: 1 }}
                      >
                        {item.quantity.toLocaleString()}
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: 12, padding: 1, textAlign: "right" }}
                      >
                        {item.unit_cost.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>

                      <TableCell
                        sx={{ fontSize: 12, padding: 1, textAlign: "right" }}
                      >
                        {/* {parseFloat(item.initial_cost)
                        .toFixed(2)
                        .toLocaleString()} */}
                        {JSON.parse(item.initial_cost).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* GRAND TOTAL */}
            <Grid container sx={{ my: 3 }}>
              <Grid item xs={12} textAlign="right" fontSize={12} gap={3}>
                <strong>
                  {" "}
                  Grand Total: ₱{" "}
                  {grandTotal
                    ? grandTotal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "0"}
                </strong>
              </Grid>

              {/* PURPOSE */}
              <Grid item xs={12} fontSize={12}>
                <strong> Purpose: </strong>{" "}
                {purpose ? purpose : "-No data available-"}
              </Grid>
            </Grid>

            {/* MMS AND OMCC */}

            <Grid container py={3}>
              <Grid
                item
                xs={6}
                border={1}
                padding={1}
                fontSize={12}
                sx={{
                  borderColor: theme.palette.secondary.lightGray,
                  textAlign: "center",
                }}
                lineHeight={{ sm: 1, lg: 0.9 }}
              >
                <p style={{ paddingBottom: "30px" }}>Requested by:</p>
                <strong>{requester ? requester : "-No data available-"}</strong>
                <p>{section ? section : "-No data available-"}</p>
              </Grid>
              {status ? (
                <Grid
                  item
                  xs={6}
                  border={1}
                  fontSize={12}
                  sx={{
                    borderColor: theme.palette.secondary.lightGray,
                    textAlign: "center",
                  }}
                  lineHeight={{ sm: 1, lg: 0.9 }}
                  padding={1}
                >
                  <p style={{ paddingBottom: "20px" }}>
                    This is to certify the items listed above are in the Annual
                    Procurement Plan.
                  </p>
                  <strong>JOHN MARY C. STA TERESA</strong>
                  <p>Statistician II - OIC Materials Management Section</p>
                </Grid>
              ) : (
                ""
              )}

              {/* <Grid
          item
          xs={6}
          border={1}
          padding={1}
          fontSize={12}
          sx={{ borderColor: theme.palette.secondary.lightGray }}
          lineHeight={0.5}
        >
          <p>Procurement Mode:</p>
          <p>Sol. No./RFQ No.:</p>
          <p>Preprocurement Date:</p>
          <p>Posting Date:</p>
          <p>Opening Date:</p>
        </Grid>

        <Grid
          item
          xs={6}
          border={1}
          padding={1}
          fontSize={12}
          sx={{
            borderColor: theme.palette.secondary.lightGray,
            textAlign: "center",
          }}
          lineHeight={{ sm: 1, lg: 0.9 }}
        >
          <p style={{ paddingBottom: "30px" }}>Approved by:</p>
          <strong>AFDAL B. KUNTING, MD, MPH, FPCP</strong>
          <p>Medical Center Chief II</p>
        </Grid> */}
            </Grid>
          </div>
        </>
      )}
    </div>
  );
}

export default PRForm;
