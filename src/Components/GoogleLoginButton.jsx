import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { PostRequest } from "../API/Api";
import { Alert, Snackbar } from "@mui/material";
const clientId =
  "4077232619-oe3o453a9h1ba2vtlsk4nmggralmhcc5.apps.googleusercontent.com";
const GoogleLoginButton = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // SNACKBAR
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSuccess = (response) => {
    PostRequest({ url: "/api/login" }, response.profileObj)
      .then((res) => {
        const {
          statusText,
          data: { data },
        } = res;

        console.log({ statusText: statusText, data: res.data });

        // sessionStorage.setItem("token", data.token);
        // setUser(data);
        // navigate("/");
        // setShowError(false);
        // handleReset();
      })
      .catch((err) => {
        console.log(err);
        const {
          response: {
            status,
            data: { message, data },
          },
        } = err;

        let errResponse = err.response.data.message;
        setMessage(errResponse);
        setOpen(true);
      });
  };

  const onFailure = (response) => {
    console.log("Google Sign-In failed:", response.error);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default GoogleLoginButton;
