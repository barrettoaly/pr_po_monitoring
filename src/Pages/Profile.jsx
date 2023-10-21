import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Avatar,
  Stack,
  CircularProgress,
} from "@mui/material";
import Dialog from "../Components/Popups/DialogComponent";
import TitleHeader from "../Components/TitleHeader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import { PutRequest, GetRequest, DeleteRequest, PostRequest } from "../API/api";
import approve from "../Assets/animation/87833-approved.json";
import moment from "moment";
import { Cancel, Check, CheckCircle, Edit, Mail } from "@mui/icons-material";
import InputComponent from "../Components/FormControl/InputComponent";
import ButtonComponent from "../Components/ButtonComponent";
import { useTheme } from "@emotion/react";
import LoadingBtnComponent from "../Components/LoadingBtnComponent";
import Swal from "sweetalert2";
import { useController } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";
import "../src/Assets/css/sweetAlert.css";

function Profile(props) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(null);
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [mName, setMname] = useState("");
  const [extName, setExtName] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [dateReg, setDateReg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const navigate = useNavigate();
  const handleCloseApprove = () => {
    setOpenDialog(false);
  };
  const animationOptions = {
    loop: 1,
    autoplay: true,
    animationData: approve,
  };

  const { user } = useController();

  const theme = useTheme("");

  const getData = () => {
    setIsLoading(true);
    GetRequest({ url: `api/profile` })
      .then((res) => {
        let profile = res.data.data[0];

        setName(profile.fname + " " + profile.mname[0] + ". " + profile.lname);
        setFname(profile.fname);
        setLname(profile.lname);
        setMname(profile.mname);
        setExtName(profile.ext_name);
        setStreet(profile.street);
        setBarangay(profile.barangay);
        setCity(profile.city);
        setContact(profile.contact);
        setEmail(profile.email);
        setDateReg(profile.updated_at);
        setDepartment(profile.department);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    //
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    let form = new FormData();
    form.append("fname", fName);
    form.append("mname", mName);
    form.append("lname", lName);
    form.append("ext_name", extName);
    form.append("contact", contact);
    form.append("street", street);
    form.append("barangay", barangay);
    form.append("city", city);
    form.append("email", email);

    PutRequest({ url: "api/profile" }, form)
      .then((res) => {
        if (res.status === 200) {
          // SUCCESS
          setOpenDialog(true);
          setEdit(false);
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  // DEACT
  const deactivate = () => {
    console.log("deactivate clicked");
    Swal.fire({
      title: "Deactivate account",
      text: "Are you sure you want to deactivate your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      customClass: {
        container: "my-swal-container",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("deactivate is accepted");
        // Request here
        DeleteRequest({ url: "api/profile" }).then((res) => {
          if (res.status == 200) {
            Swal.fire({
              title: "Account Deactivated",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                container: "my-swal-container",
              },
            }).then((result) => {
              // Request here
              PostRequest({ url: "api/logout" }).then((res) => {
                navigate("/login");
              });
              localStorage.clear();
            });
          }
        });
      }
    });
  };

  const handleEdit = () => {
    setEdit(true);
  };
  const handleNotEdit = () => {
    setEdit(false);
  };

  useEffect(() => {
    getData();
  }, [name, dateReg]);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Dialog
        usedType="submitMessage"
        open={openDialog}
        onClose={handleCloseDialog}
        actionProceed={handleCloseApprove}
        title={"Successfully Updated"}
        message={"You succcessfully updated your aaccount thanks uwu"}
        buttonColor={theme.palette.tertiary.main}
        textColor="white"
        icon={
          <CheckCircle
            sx={{ color: theme.palette.tertiary.main, fontSize: 100 }}
          />
        }
        animation={animationOptions}
        imgWidth={180}
        imgHeight={180}
      // iframe={
      //   <iframe src="https://embed.lottiefiles.com/animation/68673"></iframe>
      // }
      />
      {isLoading ? (
        <Box sx={{ position: "absolute", left: "50%", top: "50%" }}>
          <CircularProgress
            size={50}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      ) : (
        <Container maxWidth="xl" sx={{ padding: "40px" }}>
          <Box paddingBottom="4px">
            <TitleHeader
              title="Account Settings"
              icon={<AccountCircleIcon sx={{ fontSize: "small" }} />}
            />

            {!edit ? (
              <Stack direction={"row"} alignItems={"center"} gap={4}>
                <Avatar size="xl" sx={{ width: 150, height: 150, mt: 4 }} />
                <Stack>
                  <ButtonComponent
                    variant="contained"
                    name="Deactivate"
                    color={theme.palette.error.main}
                    icon={<Cancel />}
                    width={180}
                    action={deactivate}
                  />
                  <ButtonComponent
                    variant="contained"
                    name="Update details"
                    color={theme.palette}
                    icon={<Edit />}
                    width={180}
                    action={handleEdit}
                  />
                </Stack>
              </Stack>
            ) : (
              <Typography mt={5} fontSize={30} fontWeight={600}>
                Edit Details
              </Typography>
            )}

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Box mb={5}>
                  <Typography variant="h5" gutterBottom>
                    {edit ? (
                      <Stack direction="row" gap={2}>
                        <InputComponent
                          width={"100%"}
                          value={lName}
                          label="Last name"
                          setValue={setLname}
                        />

                        <InputComponent
                          width={"100%"}
                          value={fName}
                          label="First name"
                          setValue={setFname}
                        />
                        <InputComponent
                          width={"100%"}
                          value={mName}
                          label="Middle name"
                          setValue={setMname}
                        />
                      </Stack>
                    ) : (
                      <>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant=" h3" fontWeight={"bold"}>
                            {name}
                          </Typography>
                          <span
                            style={{
                              padding: "4px 9px",
                              borderRadius: "50px",
                              fontSize: "12px",
                              backgroundColor: "#609966",
                              color: "white",
                            }}
                          >
                            Online
                          </span>
                        </Box>
                        <Typography
                          mb={3}
                          textTransform={"uppercase"}
                          fontSize={13}
                        >
                          {department}
                        </Typography>
                      </>
                    )}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {edit ? (
                      <Stack direction={"row"} gap={2}>
                        <InputComponent
                          width={"100%"}
                          value={email}
                          label="Email"
                          setValue={setEmail}
                        />
                        <InputComponent
                          width={"100%"}
                          value={contact}
                          label="Contact No"
                          setValue={setContact}
                        />
                      </Stack>
                    ) : (
                      <Stack>
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <Mail sx={{ fontSize: "small", ml: 1 }} />{" "}
                          <Typography> {email}</Typography>
                        </Box>

                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <PhoneIcon sx={{ fontSize: "small", ml: 1 }} />{" "}
                          {contact}
                        </Box>
                      </Stack>
                    )}
                  </Typography>
                </Box>

                <Box>
                  {edit ? (
                    <Stack>
                      <InputComponent
                        width={"100%"}
                        value={street}
                        label="Street/Drive"
                        setValue={setStreet}
                      />

                      <InputComponent
                        width={"100%"}
                        value={barangay}
                        label="Barangay"
                        setValue={setBarangay}
                      />

                      <InputComponent
                        width={"100%"}
                        value={city}
                        label="City"
                        setValue={setCity}
                      />
                    </Stack>
                  ) : (
                    <>
                      {/* <Typography variant="body2" fontWeight={600} gutterBottom>
                        ADDRESS
                      </Typography>{" "} */}
                      {/* <Typography variant="body2">{`${street ?? ''}, ${barangay ?? ''}, ${city ? ''`}</Typography>{" "} */}
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        gutterBottom
                        mt={2}
                      >
                        DATE REGISTERED
                      </Typography>
                      <Typography variant="body2">
                        {moment(dateReg).format("lll")}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        gutterBottom
                        mt={2}
                        sx={{
                          color: theme.palette.info.main,
                          fontStyle: "italic",
                        }}
                      >
                        Profile updated {moment(dateReg).fromNow()}
                      </Typography>
                      <br />
                    </>
                  )}
                </Box>

                <Box>
                  {edit ? (
                    <Box
                      display={"flex"}
                      justifyContent={"right"}
                      alignItems="center"
                      mt={3}
                    >
                      <ButtonComponent
                        variant="contained"
                        name="Cancel"
                        color={theme.palette.error.main}
                        icon={<Cancel />}
                        width={"auto"}
                        action={handleNotEdit}
                      />

                      <LoadingBtnComponent
                        variant="contained"
                        name="Save changes"
                        type="submit"
                        width={"auto"}
                        isHover={false}
                        color={theme.palette.info}
                        icon={<Check />}
                        isLoading={isSubmitting}
                        isDisabled={isSubmitting ? true : false}
                      />
                    </Box>
                  ) : (
                    ""
                    // <ButtonComponent
                    //   variant="contained"
                    //   name="Update details"
                    //   color={theme.palette.tertiary.main}
                    //   icon={<Edit />}
                    //   width="auto"
                    //   action={() => {
                    //     setEdit(true);
                    //   }}
                    // />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </form>
  );
}

export default Profile;
