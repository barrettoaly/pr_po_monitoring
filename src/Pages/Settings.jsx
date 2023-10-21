import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Avatar,
} from "@mui/material";
import TitleHeader from "../Components/TitleHeader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
function Settings(props) {
  return (
    <div>
      <Container maxWidth="xl" sx={{ padding: "40px" }}>
        <Box paddingBottom="1px">
          <TitleHeader
            title="Settings"
            icon={<ManageAccountsIcon sx={{ fontSize: "small" }} />}
          />

          <Avatar
            size="xl"
            sx={{ width: 150, height: 150, mt: 4 }}
            loading="lazy"
            // src={
            //   "https://th.bing.com/th/id/OIP.urs9CLtRNkSZtaP2K1uOIAHaHa?pid=ImgDet&rs=1"
            // }
            // loading="lazy"
            // style={{ width: "150px", marginBottom: "10px" }}
          />

          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <Box mb={5}>
                <Typography variant="h5" gutterBottom>
                  <Box>Reenjay Caimor </Box>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <Box>
                    reenjie17@gmail.com |{" "}
                    <PhoneIcon sx={{ fontSize: "small" }} /> 09557653775
                  </Box>
                </Typography>
              </Box>

              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" gutterBottom>
                      <span style={{ fontSize: "11px", fontWeight: "bold" }}>
                        ROLE
                      </span>
                      <br />
                      IT Administrator of The System ( JOHXW )
                    </Typography>

                    <Box mb={5}>
                      <Typography variant="body2" gutterBottom>
                        <span style={{ fontSize: "11px", fontWeight: "bold" }}>
                          DEPARTMENT
                        </span>
                        <br />
                        Office of Medical Center Chief ( OMCC )
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      fontWeight={"bold"}
                      variant="body2"
                      gutterBottom
                      color={"red"}
                    >
                      Daily Activities
                    </Typography>

                    <Typography variant="body2" gutterBottom fontSize={"11px"}>
                      [ DATETIME : 2023/04/23 | POST METHOD | Approved the user
                      ]
                    </Typography>
                    <Typography variant="body2" gutterBottom fontSize={"11px"}>
                      [ DATETIME : 2023/04/23 | POST METHOD | Approved the user
                      ]
                    </Typography>
                    <Typography variant="body2" gutterBottom fontSize={"11px"}>
                      [ DATETIME : 2023/04/23 | POST METHOD | Approved the user
                      ]
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="error" size="small">
                <Typography variant="body2" gutterBottom>
                  {" "}
                  DE-ACTIVATE ACCOUNT{" "}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Settings;
