import {
  Alert,
  Box,
  Grow,
  Icon,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import InputComponent from "../Components/FormControl/InputComponent";
import LoadingBtnComponent from "../Components/LoadingBtnComponent";
import { KeyboardBackspace, LockOpen } from "@mui/icons-material";
import { PostRequest } from "../API/Api";
import { useNavigate } from "react-router-dom";
import Copyright from "../Components/Copyright";
import { useController } from "../Context/DataContext";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Error occured. Please try again");
  const [showError, setShowError] = useState(false);
  const [severity, setSeverity] = useState("error");
  const { setPassreset } = useController();
  const theme = useTheme();
  let navigate = useNavigate();

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    PostRequest({ url: "api/resetlink" }, { email: email })
      .then((res) => {
        if (res.status === 200) {
          setPassreset(true);
          navigate("/reset");
        } else {
          setIsLoading(false);
          setShowError(true);
          setMessage(res.data.message);
          setSeverity("error");
        }
      })
      .catch((err) => {
        setIsLoading(false);
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
        <Stack width="40vh">
          {/* <img src={illus`tration} height="140px" /> */}
          <Box textAlign="center">
            <Icon
              as={LockOpen}
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

          <Box textAlign="center" mb={4}>
            <Typography
              fontSize={25}
              mt={3}
              mb={1.3}
              fontWeight={theme.typography.fontWeightBold}
              color={theme.palette.grey[800]}
              //   color={theme.palette.tertiary.main}
            >
              Forgot Password
            </Typography>
            <Typography fontSize={14} sx={{ color: theme.palette.grey[600] }}>
              Don't worry, we'll send you the instructions on how to reset your
              password.
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
            value={email}
            isRequired={true}
            label="Email address"
            type="email"
            setValue={setEmail}
          />
          <Box align="center" mt={2}>
            <LoadingBtnComponent
              name="Send email"
              variant="filled"
              type="submit"
              color={theme.palette.info.main}
              textColor="white"
              isLoading={isLoading}
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: 7, gap: 1 }}
          >
            <KeyboardBackspace sx={{ color: theme.palette.grey[600] }} />

            <Link
              sx={{ textDecoration: "none", color: theme.palette.grey[600] }}
              fontSize={13}
              href="/login"
            >
              Back to login
            </Link>
          </Box>
        </Stack>
        <Copyright />
      </Box>
    </form>
  );
}

export default ForgotPassword;
