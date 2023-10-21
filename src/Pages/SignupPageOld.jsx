import {
  Grid,
  Box,
  Stack,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { useTheme } from "@mui/material";
import illustration from "../Assets/Illustrations/signup.svg";
import React, { useRef, useState } from "react";
import InputComponent from "../Components/FormControl/InputComponent";
import ButtonComponent from "../Components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CustomSelect from "../Components/FormControl/CustomSelect";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";

const SignupPage = () => {
  const theme = useTheme();
  const color = theme.palette;

  let navigate = useNavigate();

  // DATA
  const [dept, setDept] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [mName, setMname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const [departmentList, setDepartmentList] = useState([
    { key: 1, label: "MMS", value: 123 },
    { key: 2, label: "CSS", value: 124 },
  ]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      fName: fName,
      lName: lName,
      mName: mName,
      email: email,
      contact: contact,
      pass1: pass1,
      pass2: pass2,
    });

    // let form = new FormData();
    // form.append("email", email.trim());
    // form.append("password", password);

    // let response = null;
    // Pop-up error message and message
    // setOpen(true);
    // setMessage("Error occurred");

    // RESPONSE

    // if (response.statusText === "OK") {
    //   navigate("/<route here>");
    // } else {

    // }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: color.tertiary.main,
          background: color.secondary.lightPurple,
        }}
      >
        <Box
          sx={{
            height: "auto",
            width: "67vw",
            background: color.primary.main,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.13)",
            borderRadius: 1.1,
          }}
        >
          <Grid container columns={{ xs: 1, sm: 1, md: 1, lg: 3 }}>
            <Grid
              item
              sx={{
                // background: `linear-gradient( ${color.secondary.main}, ${color.secondary.lightPurple})`,
                background: color.secondary.main,
                width: "40%",
                height: "auto",
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}
              display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
              order={{ lg: 1 }}
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

            <Grid item width={{ sn: "100%", md: "100%", lg: "60%" }}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Box position="relative" padding={{ xs: 4, md: 5, lg: 6 }}>
                  <Typography
                    mt={1}
                    fontSize={{ sm: "25px", md: "25px", lg: "36px" }}
                    fontWeight={700}
                  >
                    Signup
                  </Typography>
                  <Typography fontSize={15}>
                    Create new account or{" "}
                    <Link href="/" sx={{ color: color.tertiary.main }}>
                      <b>log in here</b>
                    </Link>
                  </Typography>

                  <Stack my={1} justifyContent={"center"} sx={{ my: 6 }}>
                    {/* INPUTS */}

                    <Stack my={1}>
                      <CustomSelect
                        data={departmentList}
                        label="Area"
                        setValue={setDept}
                      />
                    </Stack>

                    <Stack
                      my={1}
                      direction={{ xs: "column", lg: "row" }}
                      spacing={1}
                    >
                      <InputComponent
                        required={true}
                        width="100%"
                        label="First Name"
                        type="fname"
                        color={color.tertiary.main}
                        setValue={setFname}
                      />
                      <InputComponent
                        required={true}
                        width="100%"
                        label="Last Name"
                        type="lname"
                        color={color.tertiary.main}
                        setValue={setLname}
                      />
                      <InputComponent
                        required={true}
                        width={{ sm: "100%", lg: "30%" }}
                        label="MI"
                        type="mname"
                        color={color.tertiary.main}
                        setValue={setMname}
                      />
                    </Stack>
                    <Stack
                      my={1}
                      direction={{ xs: "column", lg: "row" }}
                      spacing={1}
                    >
                      <InputComponent
                        width="100%"
                        my={1}
                        required={true}
                        label="Contact Number"
                        type="contact"
                        color={color.tertiary.main}
                        setValue={setContact}
                      />
                      <InputComponent
                        width="100%"
                        required={true}
                        label="Email"
                        type="email"
                        color={color.tertiary.main}
                        setValue={setEmail}
                      />
                    </Stack>

                    <Stack
                      my={1}
                      direction={{ xs: "column", lg: "row" }}
                      spacing={1}
                    >
                      <InputComponent
                        required={true}
                        width="100%"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        color={color.tertiary.main}
                        setValue={setPass1}
                        rightIcon={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
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
                      <InputComponent
                        required={true}
                        width="100%"
                        label="Confirm Password"
                        type={showPassword2 ? "text" : "password"}
                        color={color.tertiary.main}
                        setValue={setPass2}
                        rightIcon={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword2}
                              edge="end"
                            >
                              {showPassword2 ? (
                                <VisibilityOff sx={{ fontSize: 20 }} />
                              ) : (
                                <VisibilityIcon sx={{ fontSize: 20 }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Stack>

                    {/* INPUTS */}

                    <FormControlLabel
                      sx={{ fontSize: "12px", my: 1 }}
                      control={<Checkbox required size="small" />}
                      label={
                        <Typography variant="body2" color="textSeco">
                          I agree to the <b>Terms</b> and have read the
                          acknowledge of the <b>Privacy Statement</b>.
                        </Typography>
                      }
                      color={color.tertiary.main}
                    />
                  </Stack>
                  <Box align="center">
                    <ButtonComponent
                      name="Submit"
                      variant="filled"
                      type="submit"
                    />
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

export default SignupPage;
