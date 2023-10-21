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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetRequest } from "../API/api";
import { ChevronLeft } from "@mui/icons-material";
import IssuanceBody from "./IssuanceBody";

function ViewIssuance(props) {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  function handleGoBack() {
    navigate("/issuance");
  }
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetchData().finally(() => setIsLoading(false));
  // }, []);

  return (
    <div>
      <Container maxWidth="xl" sx={{ padding: "120px" }}>
        <Box display="flex" alignItems="center" pb={5}>
          <ChevronLeft
            color={theme.palette.tertiary.main}
            style={{ fontSize: 15 }}
          />
          <Link
            underline="none"
            onClick={handleGoBack}
            sx={{
              ":hover": { textDecoration: "underline" },
              fontSize: 13.5,
            }}
            color={theme.palette.tertiary.main}
          >
            Back to Issuance
          </Link>
        </Box>
        <Box sx={{ lineHeight: 0.5, mb: 10 }}>
          <p style={{ fontWeight: 600, fontSize: 20 }}>
            Zamboanga City Medical Center
          </p>

          <p style={{ fontSize: 16 }}>
            Dr. Evangelista Street, Sta. Catalina, Zamboanga City, Zamboanga del
            Sur, Philippines 7000
          </p>
          <p style={{ fontSize: 16 }}>Tel. No.: 991-2934; 991-0573; 991-0052</p>
        </Box>
        <IssuanceBody id={id} />
      </Container>
    </div>
  );
}

export default ViewIssuance;
