import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grow,
  Alert,
} from "@mui/material";
import TitleHeader from "../Components/TitleHeader";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ButtonComponent from "../Components/ButtonComponent";
import { useTheme } from "@mui/material";
import { useController } from "../Context/DataContext";
import { PostRequest } from "../API/Api";
import { PasswordValidator } from "../Components/PasswordValidator";
function CreateAdmin(props) {
  const theme = useTheme();
  const color = theme.palette;
  const { department } = useController();
  const [error, setError] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertmessage, setAlertmessage] = useState("");
  const [notmatch, setNotmatch] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [removeRequired, setRemoveRequired] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [observe, setObserve] = useState(false);
  const [passnotValid, setPassnotvalid] = useState(true);
  const togglePasswordVisibility = () => setShowPass((prev) => !prev);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    lname: "",
    fname: "",
    mname: "",
    ext: "",
    department: "",
    contact: "",
    street: "",
    barangay: "",
    city: "",
    email: "",
    password: "",
    repassword: "",
  });

  const toggleRemoveRequired = () => {
    setRemoveRequired((prev) => !prev);
    setFormData({ ...formData, password: "", repassword: "" });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleSave(event) {
    event.preventDefault();

    // check if any required field is empty
    if (
      !formData.lname ||
      !formData.fname ||
      !formData.mname ||
      !formData.department ||
      !formData.contact ||
      !formData.street ||
      !formData.barangay ||
      !formData.city ||
      !formData.email ||
      !formData.password ||
      !formData.repassword
    ) {
      // show an error message to the user

      setSeverity("error");
      setError(true);
      setAlertmessage("Please fill out all required fields.");
      return;
    }
    const { password, repassword } = formData;

    if (password != repassword) {
      setNotmatch(true);
      return;
    }

    PostRequest({ url: "/api/createadmin" }, formData)
      .then((res) => {
        const {
          statusText,
          data: { message, data },
        } = res;

        if (statusText == "OK") {
          setError(false);
          setDuplicate(false);
          setSuccess(true);
          setSeverity("success");
          setAlertmessage("Administrator added successfully!");
          setIsLoading(false);
          setFormData({
            lname: "",
            fname: "",
            mname: "",
            ext: "",
            department: "",
            contact: "",
            street: "",
            barangay: "",
            city: "",
            email: "",
            password: "",
            repassword: "",
          });
          setShowPass(false);
          setRemoveRequired(false);
        }
      })
      .catch((err) => {
        // console.log(err);
        setDuplicate(true);
        //if(err.response.status == '')
      });
    setNotmatch(false);
    return;

    // submit the form if all required fields are filled out
    // ...
  }

  function handleSend() {
    PostRequest({ url: "/api/sendCredentials" }, formData)
      .then((res) => {
        const {
          statusText,
          data: { message, data },
        } = res;

        if (statusText == "OK") {
          setDuplicate(false);
          setError(false);
          setSuccess(true);
          setSeverity("success");
          setAlertmessage("Administrator added successfully!");
          setIsLoading(false);
          setFormData({
            lname: "",
            fname: "",
            mname: "",
            ext: "",
            department: "",
            contact: "",
            street: "",
            barangay: "",
            city: "",
            email: "",
            password: "",
            repassword: "",
          });
          setShowPass(false);
          setRemoveRequired(false);
        }
      })
      .catch((err) => {
        setDuplicate(true);
      });
  }
  const handleShowError = () => {
    setSuccess(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ padding: "40px" }}>
        <Box paddingBottom="1px">
          <TitleHeader
            title="Create Administrator"
            icon={<GroupAddIcon sx={{ fontSize: "small" }} />}
          />
        </Box>

        <form onSubmit={handleSave}>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={6}>
              <Grid container spacing={2} mt={3} style={{ padding: "40px" }}>
                {success && (
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
                        setSuccess(false);
                      }}
                    >
                      {alertmessage}
                    </Alert>
                  </Grow>
                )}
                <Grid item xs={12}>
                  <h4>BASIC INFORMATION</h4>
                  <h6>PERSONAL DATA</h6>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      id="outlined-required"
                      label="Last Name"
                      variant="outlined"
                      autoFocus
                      name="lname"
                      value={formData.lname}
                      onChange={handleInputChange}
                      error={error && formData.lname === ""}
                      helperText={
                        error && formData.lname === ""
                          ? "Last Name is required"
                          : ""
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      id="outlined-required"
                      label="First Name"
                      variant="outlined"
                      name="fname"
                      value={formData.fname}
                      onChange={handleInputChange}
                      error={error && formData.fname === ""}
                      helperText={
                        error && formData.fname === ""
                          ? "First Name is required"
                          : ""
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      id="outlined-required"
                      label="Middle Name"
                      variant="outlined"
                      name="mname"
                      value={formData.mname}
                      onChange={handleInputChange}
                      error={error && formData.mname === ""}
                      helperText={
                        error && formData.mname === ""
                          ? "Middle Name is required"
                          : ""
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-required"
                      label="Extension "
                      variant="outlined"
                      name="ext"
                      value={formData.ext}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Set Department
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Set Department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      error={error && formData.department === ""}
                      helperText={
                        error && formData.department === ""
                          ? "Department is required"
                          : ""
                      }
                    >
                      {department.map((row) => {
                        const { id, name, abbreviation } = row;
                        return (
                          <MenuItem value={id}>
                            {name} | {abbreviation}{" "}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} style={{ transition: "all ease-in-out .5s" }}>
              <Box p={3} border={"1px dashed gray"} borderRadius={5}>
                <Grid container spacing={2} mt={3}>
                  <Grid item xs={12}>
                    <h4>CONTACT INFORMATION</h4>
                    <h6>Cellphone No# | ADDRESS</h6>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="outlined-required"
                        label="Contact No"
                        variant="outlined"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        error={error && formData.contact === ""}
                        helperText={
                          error && formData.contact === ""
                            ? "Street is required"
                            : ""
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="outlined-required"
                        label="Street"
                        variant="outlined"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        error={error && formData.street === ""}
                        helperText={
                          error && formData.street === ""
                            ? "Street is required"
                            : ""
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="outlined-required"
                        label="Barangay"
                        variant="outlined"
                        name="barangay"
                        value={formData.barangay}
                        onChange={handleInputChange}
                        error={error && formData.barangay === ""}
                        helperText={
                          error && formData.barangay === ""
                            ? "Barangay is required"
                            : ""
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="outlined-required"
                        label="City"
                        variant="outlined"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        error={error && formData.city === ""}
                        helperText={
                          error && formData.city === ""
                            ? "City is required"
                            : ""
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <h6>LOGIN CREDENTIALS</h6>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={
                          duplicate ? true : error && formData.email === ""
                        }
                        helperText={
                          duplicate
                            ? "This email already exist in our database."
                            : error && formData.email === ""
                            ? "Email is required"
                            : ""
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} display={removeRequired && "none"}>
                    <FormControl fullWidth>
                      <TextField
                        required={removeRequired ? false : true}
                        id="outlined-required"
                        label="Password"
                        variant="outlined"
                        name="password"
                        disabled={removeRequired ? true : false}
                        value={removeRequired ? "" : formData.password}
                        onChange={handleInputChange}
                        error={
                          removeRequired
                            ? ""
                            : error && formData.password === ""
                        }
                        helperText={
                          removeRequired
                            ? ""
                            : error && formData.password === ""
                            ? "Password is required"
                            : ""
                        }
                        type={showPass ? "text" : "password"}
                        onFocus={() => {
                          setObserve(true);
                        }}
                        onBlur={() => {
                          setObserve(false);
                        }}
                      />
                      <PasswordValidator
                        observe={observe}
                        password={formData.password}
                        setPassnotvalid={setPassnotvalid}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} display={removeRequired && "none"}>
                    <FormControl fullWidth>
                      <TextField
                        required={removeRequired ? false : true}
                        id="outlined-required"
                        label="Re-Enter Password"
                        variant="outlined"
                        name="repassword"
                        disabled={removeRequired ? true : false}
                        value={removeRequired ? "" : formData.repassword}
                        onChange={handleInputChange}
                        error={
                          removeRequired
                            ? ""
                            : error && formData.repassword === ""
                            ? true
                            : notmatch
                            ? true
                            : false
                        }
                        helperText={
                          removeRequired
                            ? ""
                            : error && formData.repassword === ""
                            ? "Re-Enter Password is required"
                            : notmatch
                            ? "Password does not match"
                            : ""
                        }
                        type={showPass ? "text" : "password"}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormGroup sx={{ display: removeRequired && "none" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={showPass}
                            onChange={togglePasswordVisibility}
                          />
                        }
                        label="Show Password"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={removeRequired}
                            onChange={toggleRemoveRequired}
                          />
                        }
                        label="Send Generated Password through Email"
                      />
                    </FormGroup>

                    {removeRequired && (
                      <Box
                        sx={{
                          border: "1px solid #BACDDB",
                          padding: "10px",
                          borderRadius: "10px",
                        }}
                      >
                        <h6 style={{ fontSize: "13px", color: "#ED2B2A" }}>
                          Please note that it is possible that your message may
                          not be delivered or may be filtered into the
                          recipient's SPAM folder.
                          <br /> <br />
                          In case recepient did not received the message,
                          Default Password would be :{" "}
                          <span style={{ color: "#009FBD" }}>
                            prpo_
                            {"LASTNAME"}
                          </span>
                        </h6>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <ButtonComponent
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            name="Create"
            variant="contained"
            color={color.tertiary.main}
            width="200px"
            action={removeRequired ? handleSend : handleSave}
            float="right"
            marginTop="20px"
            marginBottom="50px"
            type={"submit"}
            isDisabled={removeRequired ? false : passnotValid}
          />
        </form>
      </Container>
    </div>
  );
}

export default CreateAdmin;
