import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grow,
  Icon,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import InputComponent from "../Components/FormControl/InputComponent";
import { PostRequest, GetRequest } from "../API/Api";
import { useNavigate } from "react-router-dom";
import LoadingBtnComponent from "../Components/LoadingBtnComponent";
import Copyright from "../Components/Copyright";
import { PasswordValidator } from "../Components/PasswordValidator";

function NewPassword(props) {
  const theme = useTheme();
  const color = theme.palette;

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const [severity, setSeverity] = useState("error");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [error, setError] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [observe, setObserve] = useState(false);
  const [passnotValid, setPassnotvalid] = useState(true);

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password === password2) {
      let form = new FormData();
      form.append("email", email);
      form.append("password", password);

      PostRequest({ url: "api/ChangePassword" }, form)
        .then((res) => {
          if (res.status === 200) {
            setShowError(true);
            setMessage("Password Changed Successfully!");
            setSeverity("success");
            setTimeout(() => {
              navigate("/login");
            }, 4000);
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
    } else {
      setShowError(true);
      setMessage("Password doesn't match");
      setSeverity("warning");
    }

    setIsLoading(false);
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
        <Stack width="40vh">
          {/* <img src={illus`tration} height="140px" /> */}

          <Box textAlign="center" mb={4}>
            <Typography
              fontSize={25}
              mt={3}
              mb={1.3}
              fontWeight={theme.typography.fontWeightBold}
              color={theme.palette.grey[800]}
              //   color={theme.palette.tertiary.main}
            >
              Set new password
            </Typography>
            <Typography fontSize={14} sx={{ color: theme.palette.grey[600] }}>
              Kindly double check your email and create a new password
            </Typography>
          </Box>

          {showError && (
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
          )}

          <InputComponent
            isRequired={true}
            width={"100%"}
            value={password}
            label="New password"
            type={showPassword ? "password" : "text"}
            setValue={setPassword}
            error={duplicate ? true : error && password === ""}
            onFocus={() => {
              setObserve(true);
            }}
            onBlur={() => {
              setObserve(false);
            }}
          />

          <InputComponent
            isRequired={true}
            width={"100%"}
            value={password2}
            label="Confirm password"
            type={showPassword ? "password" : "text"}
            setValue={setPassword2}
            isDisabled={passnotValid ? true : false}
          />

          <PasswordValidator
            observe={observe}
            password={password}
            setPassnotvalid={setPassnotvalid}
          />

          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                size="small"
                sx={{ fontSize: 12 }}
              />
            }
            label="Show password"
          />

          <Box align="center" mt={3}>
            <LoadingBtnComponent
              name="update password"
              variant="filled"
              type="submit"
              color={theme.palette.info.main}
              textColor="white"
              isLoading={isLoading}
              isDisabled={passnotValid ? true : false}
            />
          </Box>
        </Stack>
        <Copyright />
      </Box>
    </form>
  );
}

export default NewPassword;
