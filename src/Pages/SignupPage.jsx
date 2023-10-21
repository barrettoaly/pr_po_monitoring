import {
  Alert,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import ButtonComponent from "../Components/ButtonComponent";
import { Stack } from "@mui/system";
import InputComponent from "../Components/FormControl/InputComponent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomSelect from "../Components/FormControl/CustomSelect";
import { VisibilityOff } from "@mui/icons-material";
import { PostRequest } from "../API/Api";
import { useController } from "../Context/DataContext";
import Modal from "../Components/Popups/CustomedModal";
import checked from "../Assets/checked.png";

function SignupPage(props) {
  const { department, FetchDepartment } = useController();
  const theme = useTheme();
  const color = theme.palette;

  // DATA
  const [dept, setDept] = useState(0);
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [mName, setMname] = useState("");
  const [extName, setExtName] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Philippines");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  //  ACTIONS
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const [openModal, setOpenModal] = useState(false);
  //   STEPPER
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = (e) => {
    e.preventDefault();

    if (
      !fName ||
      !mName ||
      !lName ||
      !contact ||
      !street ||
      !barangay ||
      !city
    ) {
      setOpenSnackbar(true);
      setMessage("Kindly input all required fields.");
    } else {
      if (contact.length != 11) {
        setMessage("Contact number is invalid.");
        setOpenSnackbar(true);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const steps = ["Basic Information", "Account Details"];

  // SUBMIT DATA
  const handleSubmit = (e) => {
    e.preventDefault();

    if (pass1.length < 8) {
      setMessage("Password is too short. Please again");
      setOpenSnackbar(true);
    } else {
      if (pass1 !== pass2) {
        setMessage("Password doesn't match. Please check and try again.");
        setOpenSnackbar(true);
      } else {
        let form = new FormData();
        form.append("fname", fName.trim());
        form.append("mname", mName.trim());
        form.append("lname", lName.trim());
        form.append("ext_name", extName.trim());
        form.append("contact", contact.trim());
        form.append("street", street.trim());
        form.append("barangay", barangay.trim());
        form.append("city", city.trim());
        form.append("department", dept);
        form.append("email", email.trim());
        form.append("password", pass1.trim());

        PostRequest({ url: "/api/register" }, form)
          .then((res) => {
            // const {
            //   statusText,
            //   data: { data },
            // } = res;
            // if (statusText === "OK") {
            //   navigate("/pending");
            // }
            // sessionStorage.setItem("token", data.token);
            // setUser(data);
            // return <ModalComponent open={true} description="Success" />;

            setOpenModal(true);
          })
          .catch((err) => {
            const {
              response: {
                data: { message, data },
              },
            } = err;

            // console.log(err);
            let errResponse = err.response.data.message;

            setMessage(errResponse);
            setOpenSnackbar(true);
          });
      }
    }
  };

  //   SNACKBAR
  const [openSnackbar, setOpenSnackbar] = useState(false);
  //   const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    FetchDepartment();
    // setDepartmentList(department);
  }, []);
  return (
    <Box height={"100%"}>
      <Modal
        open={openModal}
        title="Registration Successful!"
        content="You have successfully registered but your account is still pending for approval."
        withImage={true}
        img={checked}
        imgWidth={100}
        modalW={600}
        usedType="signup"
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          autoHideDuration={2000}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
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
          width={{ xs: "80vw", sm: "80vw", md: "60vw", lg: "70vw", xl: "57vw" }}
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
          position={"relative"}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Grid container columns={3}>
              <Grid
                item
                sx={{
                  // background: `linear-gradient( ${color.secondary.main}, ${color.secondary.lightPurple})`,
                  //   background: color.secondary.main,
                  width: "15%",
                  height: "auto",
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
                display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
              >
                <Box
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* <Stepper
                    activeStep={activeStep}
                    orientation="vertical"
                    completed={completed}
                    style={{ color }}
                  >
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};

                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}></StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper> */}
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                      return (
                        <Step key={label}>
                          <StepLabel />
                        </Step>
                      );
                    })}
                  </Stepper>
                </Box>
              </Grid>

              <Grid
                item
                width={{ xs: "100%", sm: "100%", lg: "85%" }}
                p={{ sm: 5, lg: 6 }}
                mb={10}
                pb={{ xs: 5 }}
                pl={{ sm: 5, lg: 0 }}
              >
                <form onSubmit={(e) => handleSubmit(e)}>
                  {activeStep === 0 ? (
                    <>
                      <Typography
                        mt={1}
                        fontSize={{
                          xs: "28px",
                          sm: "30px",
                          md: "25px",
                          lg: "30px",
                        }}
                        fontWeight={700}
                      >
                        Basic Information
                      </Typography>

                      <Typography fontSize={13}>
                        Create new account or{" "}
                        <Link href="/" sx={{ color: color.tertiary.main }}>
                          <b>log in here</b>
                        </Link>
                      </Typography>

                      <Stack
                        direction={{ sm: "column", lg: "row" }}
                        spacing={2}
                        mt={8}
                      >
                        <InputComponent
                          isRequired={true}
                          width="100%"
                          value={lName}
                          label="Last name"
                          type="text"
                          color={color.tertiary.main}
                          setValue={setLname}
                        />
                        <InputComponent
                          isRequired={true}
                          width="100%"
                          value={fName}
                          label="First name"
                          type="text"
                          color={color.tertiary.main}
                          setValue={setFname}
                        />
                        <InputComponent
                          width="100%"
                          value={mName}
                          label="Middle name"
                          type="text"
                          color={color.tertiary.main}
                          setValue={setMname}
                        />
                        <InputComponent
                          width={{ sm: "100%", md: "100%", lg: 300 }}
                          value={extName}
                          label="Ext name"
                          type="text"
                          color={color.tertiary.main}
                          setValue={setExtName}
                        />
                      </Stack>

                      <Stack
                        mt={2}
                        direction={{ sm: "column", lg: "row" }}
                        spacing={2}
                      >
                        <InputComponent
                          isRequired={true}
                          width="100%"
                          value={contact}
                          label="Contact number"
                          type="number"
                          color={color.tertiary.main}
                          setValue={setContact}
                          pattern="[0-9]{11}"
                        />
                      </Stack>

                      {/* ADDRESS */}
                      <Stack
                        mt={2}
                        direction={{ sm: "column", lg: "row" }}
                        spacing={2}
                      >
                        <InputComponent
                          isRequired={true}
                          value={street}
                          label="Street/Drive"
                          type="text"
                          color={color.tertiary.main}
                          setValue={setStreet}
                          width="100%"
                        />
                        <InputComponent
                          isRequired={true}
                          value={barangay}
                          label="Barangay"
                          type="text"
                          color={color.tertiary.main}
                          setValue={setBarangay}
                          width="100%"
                        />
                      </Stack>

                      <Stack
                        mt={2}
                        direction={{ sm: "column", lg: "row" }}
                        spacing={2}
                      >
                        <InputComponent
                          isRequired={true}
                          value={city}
                          label="City"
                          type="text"
                          color={color.tertiary.main}
                          setValue={setCity}
                          width="100%"
                        />
                        <InputComponent
                          value={country}
                          label="Country"
                          type="text"
                          color={color.tertiary.main}
                          setValue={setCountry}
                          width="100%"
                        />
                      </Stack>
                    </>
                  ) : (
                    <>
                      {/* STEP 2 */}
                      <Typography
                        mt={1}
                        fontSize={{ sm: "25px", md: "25px", lg: "30px" }}
                        fontWeight={700}
                      >
                        Account Details
                      </Typography>
                      <Typography fontSize={13}>
                        Provide your email and password
                      </Typography>

                      <Stack spacing={2} mt={8}>
                        <CustomSelect
                          data={department}
                          label="Department/Area"
                          setValue={setDept}
                          value={dept}
                          isRequired={true}
                        />
                        <InputComponent
                          isRequired={true}
                          value={email}
                          label="Email address"
                          type="email"
                          color={color.tertiary.main}
                          setValue={setEmail}
                        />
                      </Stack>

                      <Stack
                        mt={2}
                        direction={{ sm: "column", lg: "row" }}
                        spacing={2}
                      >
                        <InputComponent
                          isRequired={true}
                          min={8}
                          value={pass1}
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
                          isRequired={true}
                          value={pass2}
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
                    </>
                  )}

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    align="right"
                    position={"absolute"}
                    bottom={40}
                    right={50}
                  >
                    <ButtonComponent
                      name="Back"
                      variant="filled"
                      width={100}
                      isDisabled={activeStep === 0}
                      action={(e) => {
                        handleBack(e);
                      }}
                    />
                    <ButtonComponent
                      name={activeStep === steps.length - 1 ? "Submit" : "Next"}
                      variant="filled"
                      type={activeStep === steps.length - 1 ? "submit" : ""}
                      color={color.tertiary.main}
                      textColor="white"
                      width={120}
                      action={
                        activeStep === 0
                          ? (e) => {
                              handleNext(e);
                            }
                          : ""
                      }
                    />
                  </Box>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignupPage;
