import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { GetRequest } from "../API/api";

function IssuanceBody({ id }) {
  const [source, setSource] = useState("");
  const [dest, setDest] = useState("");
  const [issNo, setIssNo] = useState("");
  const [date, setDate] = useState("");
  const [total, setTotal] = useState("");
  const [remarks, setRemarks] = useState("");
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const header = [
    {
      name: "QTY",
      width: "10%",
      align: "left",
    },
    { name: "Unit", width: "10%", align: "left" },
    { name: "Item ID", width: "10%", align: "left" },
    { name: "Item Description", width: "30%", align: "left" },
    { name: "Price (₱)", width: "10%", align: "right" },
    { name: "Amount (₱)", width: "15%", align: "right" },
    { name: "Inventory Balance", width: "15%", align: "right" },
  ];

  const sum = items.reduce((e, i) => e + parseFloat(i.netcost), 0);
  const fetchData = () => {
    const issueDetails = GetRequest({ url: `/api/issuance/${id}` })
      .then((res) => {
        const {
          data: { data },
        } = res;
        const {
          docno,
          doc_date,
          department_from,
          department_to,
          total_price,
          remarks,
        } = data;
        setIssNo(docno);
        setDate(doc_date);
        setSource(department_from);
        setDest(department_to);
        setTotal(total_price);
        setRemarks(remarks);
      })
      .catch((error) => console.log(error));

    const issueItems = GetRequest({ url: `/api/issuanceitem/${id}` })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response", { cause: res });
        }
        setItems(res.data);
      })
      .catch((error) => console.log(error));

    return Promise.all([issueDetails, issueItems]);
  };
  useEffect(() => {
    setIsLoading(true);
    fetchData().finally(() => setIsLoading(false));
  }, []);
  return (
    <div>
      {isLoading ? (
        <Box align="center" mr={5}>
          <CircularProgress
            size={50}
            style={{
              position: "absolute",
              top: "50%",
              //   left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      ) : (
        <>
          <Typography sx={{ fontWeight: 600, letterSpacing: 5, mt: 2, mb: 1 }}>
            ISSUANCE
          </Typography>
          <Divider />
          <Grid container my={5} mb={10}>
            <Grid item xs={9}>
              <Typography fontSize={14}>
                SOURCE: <b>{source ? source : " -No data available-"}</b>
              </Typography>
              <Typography fontSize={14}>
                DESTINATION: <b>{dest ? dest : " -No data available-"}</b>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontSize={14}>
                ISSUE NO: <b>{issNo ? issNo : " -No data available-"}</b>
              </Typography>
              <Typography fontSize={14}>
                DATE: <b>{date ? date : " -No data available-"}</b>
              </Typography>
            </Grid>
          </Grid>
          <TableContainer>
            <Table sx={{ padding: 0, margin: 0, border: "1px solid #B2B2B2" }}>
              <TableHead>
                <TableRow>
                  {header.map((header) => (
                    <TableCell
                      width={header.width}
                      sx={{
                        textAlign: header.align,
                        fontSize: 14,
                        fontWeight: 600,
                        p: 0.5,
                      }}
                    >
                      {header.name.toUpperCase()}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* MAP DATA HERE */}
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell
                      sx={{ fontSize: 13, textAlign: "left", padding: 1 }}
                    >
                      {item.qty}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: 13, textAlign: "left", padding: 1 }}
                    >
                      {item.unit}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: 13, textAlign: "left", padding: 1 }}
                    >
                      {item.item_no}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: 13, textAlign: "left", padding: 1 }}
                    >
                      {item.description}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: 13, padding: 1, textAlign: "right" }}
                    >
                      {/* ₱ {parseFloat(item.price).toFixed(2)} */}
                      {JSON.parse(item.price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>

                    <TableCell
                      sx={{ fontSize: 13, padding: 1, textAlign: "right" }}
                    >
                      {/* ₱ {parseFloat(item.netcost).toFixed(2)} */}
                      {JSON.parse(item.netcost).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: 14, padding: 1, textAlign: "right" }}
                    >
                      {item.inv_balance.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            display="flex"
            justifyContent="flex-end"
            mr={"15%"}
            gap={3}
            my={2}
          >
            <Typography fontWeight={600}>TOTAL</Typography>
            <Typography fontWeight={600}>₱ {sum.toLocaleString()}</Typography>
          </Box>
          <Box display="flex" gap={2} my={5}>
            <Typography>REMARKS: </Typography>
            <Typography fontWeight={600}>
              {remarks ? remarks : " -No data available-"}
            </Typography>
          </Box>
        </>
      )}
    </div>
  );
}

export default IssuanceBody;
