import {
  Alert,
  Box,
  Grow,
  Icon,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import InputComponent from "../Components/FormControl/InputComponent";
import LoadingBtnComponent from "../Components/LoadingBtnComponent";
import { Code, LockOpen } from "@mui/icons-material";
import { PostRequest, GetRequest } from "../API/Api";
import { useNavigate } from "react-router-dom";
import Copyright from "../Components/Copyright";
import { useController } from "../Context/DataContext";
function ResetCode(props) {
  const [resetCode, setResetCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  let navigate = useNavigate();
  const { passreset } = useController();
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [severity, setSeverity] = useState("error");

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    PostRequest({ url: "api/validate" }, { reset_code: resetCode })
      .then((res) => {
        if (res.status === 200) {
          navigate("/new-password");
        } else {
          setIsLoading(false);
          setShowError(true);
          setMessage(res.data.message);
          setSeverity("error");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setMessage(err.response.data.message);
        setShowError(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const handleShowError = () => {
    setShowError(true);
  };
  const checkCookie = () => {
    GetRequest({ url: "api/checkEmailCookie" }).then((res) => {
      const { data } = res;
      if (data.message === "Nodata") {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    checkCookie();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack width="35vh">
          {/* <img src={illus`tration} height="140px" /> */}
          <Box textAlign="center">
            <Icon
              as={Code}
              sx={{
                backgroundColor: theme.palette.grey[50],
                width: "auto",
                fontSize: 60,
                borderRadius: 50,
                padding: 2,
                color: theme.palette.info.main,
              }}
            />
          </Box>

          <Box textAlign="center" mb={1}>
            <Typography
              fontSize={25}
              mt={3}
              fontWeight={theme.typography.fontWeightBold}
              color={theme.palette.grey[800]}
              //   color={theme.palette.tertiary.main}
            >
              Reset Code
            </Typography>
            <Typography fontSize={14} sx={{ color: theme.palette.grey[600] }}>
              A verification code has been sent to your email
              <br />
              <br />
              (NOTE:{" "}
              <span style={{ color: "#FF6666" }}>
                Please check your spam folder if the message is not found in
                your inbox.
              </span>
              )
            </Typography>
          </Box>

          {showError ? (
            <Grow in={handleShowError}>
              <Alert
                onClose={handleClose}
                // variant="filled"
                severity={severity}
                sx={{
                  width: "100%",
                  fontWeight: 600,
                  fontSize: 14,
                  mb: 2,
                }}
                onClick={() => {
                  setShowError(false);
                }}
              >
                {message}
              </Alert>
            </Grow>
          ) : (
            ""
          )}
          <InputComponent
            width={"100%"}
            value={resetCode}
            label="Reset Code"
            type="number"
            setValue={setResetCode}
          />
          <Box align="center" mt={2}>
            <LoadingBtnComponent
              name="Submit"
              variant="filled"
              type="submit"
              color={theme.palette.info.main}
              textColor="white"
              isLoading={isLoading}
            />
          </Box>
        </Stack>
        <Copyright />
      </Box>
    </form>
  );
}

export default ResetCode;
