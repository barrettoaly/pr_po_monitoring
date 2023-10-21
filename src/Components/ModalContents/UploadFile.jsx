import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Attachment,
  Check,
  CheckCircle,
  CheckOutlined,
  Description,
  FilePresent,
  ImageOutlined,
  Padding,
  PictureAsPdf,
  RemoveCircleOutlineRounded,
  SendOutlined,
} from "@mui/icons-material";
import CustomFileInputButton from "../FormControl/CustomFileButton";
import ButtonComponent from "../ButtonComponent";
import { DeleteRequest, GetRequest, PostRequest } from "../../API/Api";
import InputComponent from "../FormControl/InputComponent";
import { useController } from "../../Context/DataContext";
import { useNavigate } from "react-router-dom";
import approve2 from "../../Assets/animation/74898-success-feedback-approved.json";
import Dialog from "../Popups/DialogComponent";

function UploadFile({ id, fetchPR, cafisSet, budget, prNo }) {
  // const { tempData, setTempData, caf, setCAF } = useController();
  const [tempData, setTempData] = useState([]);
  const [caf, setCAF] = useState("");
  const [file, setFile] = useState([]);
  const [approve, setApprove] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  //  SNACKBAR
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  useEffect(() => {
    setTimeout(() => {
      console.log(cafisSet);
    }, 3000);
    getFile();
  }, []);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const files = [...event.dataTransfer.files];
    const fileData = files[0];
    setTempData((current) => [...current, fileData]);
  };

  const handleFileSelected = (file) => {
    setTempData((current) => [...current, ...file]);
  };

  const handleRemoveFile = (e, key) => {
    let temp = [...tempData];
    temp.splice(key, 1);
    setTempData(temp);
  };
  const animationOptions = {
    loop: 1,
    autoplay: true,
    animationData: approve2,
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //back to purch-request on back button
  const handleCloseApprove = () => {
    setOpenDialog(false);
    navigate("/purch-requests");
  };

  // UPLOAD TO SERVER
  const getFile = () => {
    GetRequest({ url: `api/pr_downloadfiles/${id}` }).then((res) => {
      setFile(res.data);
    });
  };

  // UPLOAD TO SERVER
  const Upload = () => {
    let formdata = new FormData();
    tempData.length > 0 &&
      tempData.forEach((file) => {
        formdata.append("attachments[]", file);
      });
    caf.length > 0 && formdata.append("caf", caf);
    PostRequest({ url: `api/pr_files/${id}` }, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      if (res.status == 201) {
        getFile();
        setTempData([]);
        fetchPR();
        setMessage("Successfully Uploaded!");
        setSeverity("success");
        setOpenSnackbar(true);
        // navigate(`/track-pr/${id}`);
      }
    });
    console.log({ caf: caf, files: tempData });
  };
  const Approve = () => {
    PostRequest({ url: `api/purchase_relation/${id}` }).then((res) => {
      if (res.status == 200) {
        getFile();
        setTempData([]);
        // fetchData();
        setApprove(true);
        setOpenDialog(true);
        fetchPRData();
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // useEffect(() => {
  //   console.log(tempData);
  // }, [tempData]);
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Dialog
        usedType="submitMessage"
        open={openDialog}
        onClose={handleCloseDialog}
        actionProceed={handleCloseApprove}
        title={"Approved!"}
        message={`Successfully approved Purchase Request No. ${prNo}`}
        buttonColor={theme.palette.tertiary.main}
        textColor="white"
        animation={animationOptions}
        imgWidth={180}
        imgHeight={180}
      />{" "}
      <Box>
        <InputComponent
          label="Input CAF No. "
          type="text"
          value={caf}
          width="100%"
          isRequired={true}
          bgColor={theme.palette.secondary.lightGray}
          color={theme.palette.tertiary.main}
          fontSize={12}
          setValue={setCAF}
        />
        <Typography fontSize={12} mb={1} fontWeight={"bold"}>
          Upload File
        </Typography>
        <Stack
          backgroundColor={isDragging ? "grey.300" : "grey.100"}
          p={3}
          alignItems="center"
          justifyContent={"center"}
          textAlign={"center"}
          spacing={1}
          borderRadius={2}
          width={"100%"}
          height={"100%"}
          sx={{
            border: 1,
            borderColor: "grey.400",
            borderStyle: "dashed",
          }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          elevation={isDragging ? 10 : 2}
        >
          <Typography fontWeight={600} fontSize={12}>
            Drag and drop files here
          </Typography>
          <Typography fontSize={12}>OR</Typography>

          <CustomFileInputButton
            buttonText="Choose file"
            onFileSelected={handleFileSelected}
          />
          <Typography fontSize={12}>
            <b> Supported files:</b>
            <br />
            PDF, JPG, PNG, DOCX
          </Typography>
        </Stack>
        <Stack height={"100%"} width="100%">
          {file.length === 0 ? (
            ""
          ) : (
            <>
              <Typography fontSize={12} mt={2.5} fontWeight={"bold"}>
                Uploaded Files
              </Typography>

              <Box
              // sx={{
              //   background: "#f5f5f5",

              //   borderRadius: 2,
              // }}
              >
                <List>
                  {file &&
                    file.map((e, k) => {
                      return (
                        <>
                          <ListItem
                            sx={{
                              backgroundColor: "#F4F9F4",
                              borderRadius: 3,
                              mb: 1,
                              "&:hover": {
                                cursor: "pointer",
                              },
                              px: 2,
                            }}
                          >
                            <ListItemIcon>
                              <CheckCircle
                                sx={{ fontsize: 12, color: "#8AAE92" }}
                              />
                            </ListItemIcon>

                            <ListItemText>
                              <Typography
                                onClick={() =>
                                  window.open(e.file_url, "_blank")
                                }
                                fontWeight={600}
                                sx={{ fontSize: 11 }}
                              >
                                {e.filename}
                              </Typography>
                              <Typography variant="caption" fontSize={11}>
                                {e.size} kb
                              </Typography>
                            </ListItemText>
                            <IconButton
                              edge="end"
                              onClick={() => {
                                DeleteRequest({
                                  url: `api/pr_files/${e.id}`,
                                }).then((res) => {
                                  if (res.status == 204) {
                                    getFile();
                                  }
                                });
                              }}
                            >
                              <RemoveCircleOutlineRounded
                                style={{ fontSize: 18, color: "#E84A5F" }}
                              />
                            </IconButton>
                          </ListItem>
                        </>
                      );
                    })}
                </List>
              </Box>
            </>
          )}
          {console.log(file)}
          <Box
          // sx={{
          //   background: "#f5f5f5",
          //   padding: 1,
          //   marginTop: 2,
          //   borderRadius: 2,
          // }}
          >
            {tempData.length === 0 ? (
              ""
            ) : (
              <>
                {file.length === 0 ? (
                  ""
                ) : (
                  <>
                    {" "}
                    <Typography fontSize={12} mt={2.5} fontWeight={"bold"}>
                      To add
                    </Typography>
                  </>
                )}
                <List>
                  {tempData.map((e, k) => {
                    return (
                      <>
                        <ListItem
                          sx={{
                            backgroundColor: "grey.100",
                            borderRadius: 3,
                            mb: 1,
                            "&:hover": {
                              cursor: "pointer",
                            },
                            px: 2,
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar>
                              {e.type === "image/png" ? (
                                <ImageOutlined />
                              ) : e.type === "text/plain" ? (
                                <Attachment />
                              ) : e.type ==
                                "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                                <FilePresent />
                              ) : e.type == "application/pdf" ? (
                                <PictureAsPdf />
                              ) : e.type ==
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                                <Description />
                              ) : (
                                console.log(e.type)
                              )}
                            </Avatar>
                          </ListItemAvatar>

                          <ListItemText>
                            <Typography fontWeight={600} sx={{ fontSize: 11 }}>
                              {e.name}
                            </Typography>
                            <Typography variant="caption" fontSize={11}>
                              {e.size} kb
                            </Typography>
                          </ListItemText>
                          <IconButton
                            edge="end"
                            // style={{ float: "right" }}
                            onClick={() => handleRemoveFile(e, k)}
                          >
                            <RemoveCircleOutlineRounded
                              style={{ fontSize: 18, color: "red" }}
                            />
                          </IconButton>
                        </ListItem>
                      </>
                    );
                  })}
                </List>
              </>
            )}
          </Box>
          {tempData.length > 0 || caf.length > 0 ? (
            <Box py={1}>
              <ButtonComponent
                variant="contained"
                name="Submit"
                color={theme.palette.tertiary.success}
                icon={<SendOutlined />}
                width="100%"
                action={Upload}
              // action={handleSubmit}
              />
            </Box>
          ) : (
            ""
          )}
          {/* //fundisSet?.length > 0 && file?.length > 0 && !budget && */}

          <Typography
            sx={{
              fontSize: 13,
              textAlign: "left",
              mt: 3,
              mb: 1,
            }}
          >
            Please click button if you want to <strong>APPROVE</strong> this
            purchase request.
          </Typography>
          <Alert severity="warning" sx={{ mb: 2, fontSize: 12 }}>
            <AlertTitle sx={{ fontSize: 12, fontWeight: 600 }}>
              Warning
            </AlertTitle>
            This action cannot be undone.
          </Alert>
          <Box width="100%">
            <ButtonComponent
              variant="contained"
              name="Approve"
              color={theme.palette.tertiary.main}
              icon={<CheckOutlined />}
              width="100%"
              action={Approve}
            // action={handleSubmit}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default UploadFile;
