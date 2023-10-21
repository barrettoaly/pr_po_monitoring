import {
  Grid,
  Box,
  Stack,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  AlertTitle,
  Grow,
} from "@mui/material";
import { useTheme } from "@mui/material";
import illustration from "../Assets/Illustrations/login.svg";
import React, { useRef, useState } from "react";
import InputComponent from "../Components/FormControl/InputComponent";
import Button from "../Components/ButtonComponent";
import { Link } from "@material-ui/core";
import GoogleLoginButton from "../Components/GoogleLoginButton";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";
import { PostRequest } from "../API/Api";
import LoadingBtnComponent from "../Components/LoadingBtnComponent";
import { useController } from "../Context/DataContext";

const LoginPage = () => {
  const { setUser } = useController();
  const theme = useTheme();
  const color = theme.palette;
  let navigate = useNavigate();

  // FUNCTIONS
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [isLoading, setIsLoading] = useState(false);

  // DATA
  // const [email, setEmail] = useState("mms@gmail.com");
  // const [password, setPassword] = useState("CIIS2022");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [severity, setSeverity] = useState("error");

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    setShowError(false);
    e.preventDefault();
    setIsLoading(true);

    let form = new FormData();
    form.append("email", email);
    form.append("password", password);
    form.append("authType", "any"); //google by default

    PostRequest({ url: "/api/login" }, form)
      .then((res) => {
        const {
          data: { message, data },
        } = res;

        if (res.data.message === "Login Success") {
          setIsLoading(false);
          setUser(res.data);
          navigate("/");
          handleReset();
        } else if (res.data.message === "Pending for Approval") {
          setIsLoading(false);
          setShowError(true);
          setMessage(`Account is still ${res.data.message}`);
          setSeverity("warning");
          setUser(null);
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
  return (
    <>
      <Box
        backgroundColor={{
          sm: "white",
          md: color.secondary.lightPurple,
          lg: color.secondary.lightPurple,
        }}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: color.tertiary.main,
        }}
      >
        <Box
          width={{ xs: "80vw", sm: "80vw", md: "60vw", lg: "70vw", xl: "55vw" }}
          sx={{
            height: "auto",

            background: color.myPrimary.main,

            borderRadius: 1.1,
          }}
          boxShadow={{
            sm: "none",
            md: "0px 2px 4px rgba(0, 0, 0, 0.13)",
            lg: "0px 2px 4px rgba(0, 0, 0, 0.13)",
          }}
        >
          <Grid container columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
            <Grid
              item
              sx={{
                // background: `linear-gradient( ${color.secondary.main}, ${color.secondary.lightPurple})`,
                background: color.secondary.main,
                width: "50%",
                height: "auto",
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
              display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={illustration} height="300px" />
              </Box>
            </Grid>

            <Grid
              item
              width={{ xs: "100%", sm: "100%", md: "100%", lg: "50%" }}
            >
              <form onSubmit={(e) => handleSubmit(e)}>
                <Box
                  position="relative"
                  padding={{ xs: 0, sm: 3, md: 4, lg: 4, xl: 4 }}
                >
                  <Typography
                    mt={3}
                    fontSize={{
                      xs: 30,
                      sm: 30,
                      md: 25,
                      lg: 35,
                      xl: 30,
                    }}
                    fontWeight={700}
                  >
                    Login
                  </Typography>
                  <Typography fontSize={15}>
                    PR-PO-Issuance Monitoring System
                  </Typography>

                  <Stack direction={"column"} my={5} spacing={2}>
                    {/* INPUTS */}

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
                      label="Email address"
                      type="email"
                      color={color.tertiary.main}
                      setValue={setEmail}
                    />

                    <InputComponent
                      width={"100%"}
                      value={password}
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      color={color.tertiary.main}
                      setValue={setPassword}
                      rightIcon={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff sx={{ fontSize: 20 }} />
                            ) : (
                              <VisibilityIcon sx={{ fontSize: 20 }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {/* INPUTS */}
                    <Link href="/forgot-password" underline="hover">
                      <Typography
                        sx={{
                          fontSize: 13,
                          textAlign: "right",
                          fontWeight: 600,
                          color: color.tertiary.main,
                        }}
                      >
                        Forgot password?
                      </Typography>
                    </Link>
                  </Stack>
                  <Box align="center">
                    {/* <Button name="Login" variant="filled" type="submit" /> */}
                    <LoadingBtnComponent
                      name="Login"
                      variant="filled"
                      type="submit"
                      color={color.tertiary.main}
                      textColor="white"
                      isLoading={isLoading}
                      isDisabled={isLoading ? true : false}
                    />

                    <Typography my={1.2} fontSize={12}>
                      or
                    </Typography>
                    <GoogleLoginButton
                      clientId="YOUR_CLIENT_ID_HERE"
                      buttonText="Sign in with Google"
                      cookiePolicy={"single_host_origin"}
                    />
                  </Box>
                  <Box position="inherit" align="center" sx={{ marginTop: 7 }}>
                    <Typography fontSize={13}>
                      No account?{" "}
                      <Link href="/sign-up" sx={{ color: color.tertiary.main }}>
                        <b>Sign up here</b>
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
