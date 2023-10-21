import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from "@mui/material";
import { PostRequest } from "../API/Api";
import { Esection, Etitle, Ecard } from "../Components/Ecomponents";
import zcmclogo from "../Assets/zcmc_header.PNG";
import SendIcon from "@mui/icons-material/Send";
import LinearProgress from "@mui/material/LinearProgress";
import { Eloader } from "../Components/Eloader";
import { LoadingButton } from "@mui/lab";
import swal from "sweetalert";

export const E_Feedback = () => {
  const { id: accessID } = useParams();
  const location = useLocation();

  const { userID } = location.state || {};

  const [setofOptions, setSetofoptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [appliedopt, setAppliedopt] = useState([]);
  const [title, setTitle] = useState([]);
  const [sections, setSections] = useState([]);
  const [comp, setComp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formID, setFormID] = useState();
  const [formTitle, setFormTitle] = useState();
  const [evaluatorID, setevaluatorID] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [successful, setSuccessful] = useState("");

  const handleValidation = async () => {
    PostRequest(
      { url: "api/check/userResponse" },
      { userID: userID, accessID: accessID }
    )
      .then((res) => {
        const {
          statusText,
          data: {
            formTitle,
            formID: eformid,
            status,
            evaluatorID: evaluatorIDs,
          },
        } = res;
        if (status == 0) {
          setSuccessful("You have already submitted a response.");
        }
        if (status == 1) {
          swal(
            "Request Not Found",
            "We apologize, but the form you requested could not be found. It appears that the form may have been removed or disabled.",
            "error"
          );
          window.history.back();
        }
        setFormTitle(formTitle);
        setFormID(eformid);
        setevaluatorID(evaluatorIDs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFetch_section = async () => {
    PostRequest({ url: "api/fetch/sections" }, { id: formID })
      .then((res) => {
        const {
          statusText,
          data: { message, data },
        } = res;
        setSections(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFetch_title = async () => {
    PostRequest({ url: "api/fetch/title" })
      .then((res) => {
        const {
          statusText,
          data: { message, data },
        } = res;
        setTitle(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFetch_Options = () => {
    PostRequest({ url: "api/fetch/eoptions" }, { id: formID })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setOptions(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    PostRequest({ url: "api/fetch/appliedopt" }, { id: formID })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setAppliedopt(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFetch_SetofOptions = () => {
    PostRequest({ url: "api/fetch/setOfeoptions" }, { id: formID })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setSetofoptions(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFetch_components = async () => {
    PostRequest({ url: "api/fetch/components" })
      .then((res) => {
        const {
          statusText,
          data: { message, data },
        } = res;
        setComp(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setAnswers(
      localStorage.getItem("answers")
        ? JSON.parse(localStorage.getItem("answers"))
        : []
    );
    handleValidation();
    handleFetch_Options();
    handleFetch_SetofOptions();
    handleFetch_section();
    handleFetch_title();
    handleFetch_components();
  }, [formID]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (localStorage.getItem("answers")) {
      PostRequest(
        { url: "api/submit/evaluation" },
        {
          data: JSON.parse(localStorage.getItem("answers")),
          formID: formID,
          userID: userID,
          evaluatorID: evaluatorID,
        }
      )
        .then((res) => {
          const {
            statusText,
            data: { message, status },
          } = res;
          if (res.statusText !== "OK") {
            throw new Error("Bad response.", { cause: res });
          }
          if (status == 1) {
            setSuccessful("You have Successfully submitted your response.");
          }

          localStorage.removeItem("answers");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      swal(
        "There's a problem in submittion",
        "You have submitted empty forms , Please fill all forms",
        "error"
      );
      setLoading(false);
    }
    //  PostRequest({ url: "api/fetch/sections" }, { id: formID })
    //   .then((res) => {
    //     const {
    //       statusText,
    //       data: { message, data },
    //     } = res;
    //     setSections(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const itemsPerPage = 1;
  const SECTIONS = sections.filter((sec) => sec.FK_Eid == formID);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedSections = SECTIONS.slice(startIndex, endIndex);

  const totalPages = Math.ceil(SECTIONS.length / itemsPerPage);
  const percentage = (currentPage / totalPages) * 100;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const MAX_LENGTH = 15;
  const shortenText = (text) => {
    if (text.length > MAX_LENGTH) {
      return text.slice(0, MAX_LENGTH) + "...";
    }
    return text;
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form action="#" onSubmit={handleFormSubmit}>
        <Box
          mt={5}
          sx={{
            width: "50vw",
            padding: "40px",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <img src={zcmclogo} alt="" />
          </Box>

          {successful ? (
            <Box
              sx={{
                padding: "20px",
                borderRadius: "10px",
                marginTop: "20px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                marginBottom: "10px",
                backgroundColor: "white",
              }}
            >
              <Alert severity="success">{successful}</Alert>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <h4
                  style={{
                    fontWeight: "normal",
                    textAlign: "center",
                    fontSize: "12px",
                  }}
                >
                  Thank you for your Response. <br />
                </h4>
              </div>
            </Box>
          ) : (
            <>
              {displayedSections.length >= 1 ? (
                <>
                  <h4 style={{ textAlign: "center" }}>{formTitle}</h4>
                  <Box sx={{ width: "100%", marginBottom: "40px" }}>
                    <Stepper activeStep={currentPage - 1} alternativeLabel>
                      {[...Array(totalPages)].map((label, key) => (
                        <Step key={label}>
                          <StepLabel>
                            {" "}
                            {shortenText(SECTIONS[key].name)}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>

                  {displayedSections.map((section) => {
                    const {
                      name: sectionName,
                      FK_Eid: Eformid,
                      id: sectionId,
                    } = section;
                    const setofoptionID = appliedopt
                      .filter((x) => x.sectionID == sectionId)
                      .map((d) => {
                        return d.setofoptionID;
                      });
                    return (
                      <Box>
                        <Esection
                          section={sectionName}
                          view={true}
                          Eformid={Eformid}
                          sectionId={sectionId}
                          //  handleChangeContent={handleChangeContent}
                          //   setFetch={setFetch}
                        />

                        {title
                          .filter((ttl) => ttl.FK_EsectionID == sectionId)
                          .map((item) => {
                            const { title: titlename, id: titleID } = item;
                            return (
                              <Box>
                                <Etitle
                                  title={titlename}
                                  view={true}
                                  titleID={titleID}
                                  //   handleChangeContent={handleChangeContent}
                                />
                                {comp
                                  .filter((x) => x.FK_EtitleID == titleID)
                                  .map((row) => {
                                    const {
                                      id: componentID,
                                      FK_EtitleID,
                                      FK_Eid,
                                      content,
                                    } = row;
                                    return (
                                      <>
                                        <Ecard
                                          content={content}
                                          view={true}
                                          FK_EtitleID={FK_EtitleID}
                                          sectionId={sectionId}
                                          componentID={componentID}
                                          Feedback={true}
                                          //   handleChangeContent={handleChangeContent}
                                          setofoptionID={setofoptionID}
                                          options={options}
                                          answers={answers}
                                          setAnswers={setAnswers}
                                        />
                                      </>
                                    );
                                  })}
                              </Box>
                            );
                          })}
                      </Box>
                    );
                  })}
                  {currentPage === totalPages && (
                    <>
                      <Box sx={{ marginTop: "20px" }}>
                        <Alert severity="info">
                          Feel free to review your evaluation before submitting.
                        </Alert>
                      </Box>
                    </>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "10px",
                    }}
                  >
                    {/* Previous button */}
                    <Button
                      variant="outlined"
                      disabled={currentPage === 1}
                      onClick={(event) => {
                        event.preventDefault();
                        setCurrentPage(currentPage - 1);
                        scrollToTop();
                      }}
                      sx={{
                        marginRight: "10px",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Previous
                    </Button>

                    {/* Next button */}
                    {currentPage === totalPages ? (
                      <LoadingButton
                        variant="contained"
                        type="submit"
                        color="info"
                        loading={loading}
                        sx={{
                          marginLeft: "1px",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        Submit{" "}
                        <SendIcon fontSize="small" sx={{ marginLeft: "5px" }} />
                      </LoadingButton>
                    ) : (
                      <Button
                        variant="contained"
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          setCurrentPage(currentPage + 1);
                          scrollToTop();
                        }}
                        size="small"
                        sx={{
                          marginLeft: "1px",
                          padding: "5px 40px",
                          borderRadius: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </>
              ) : (
                <Eloader />
              )}
            </>
          )}
        </Box>
      </form>
    </div>
  );
};
