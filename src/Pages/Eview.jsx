import React, { useState, useEffect } from "react";
import { Container, Box, Button, Grid } from "@mui/material";
import TitleHeader from "../Components/TitleHeader";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation } from "react-router-dom";
import zcmclogo from "../Assets/zcmc_header.PNG";
import { PostRequest } from "../API/Api";
import DoneIcon from "@mui/icons-material/Done";
import DownloadIcon from "@mui/icons-material/Download";
import moment from "moment";
import { Baseurl } from "../API/Api";
export const Eview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const [options, setOptions] = useState([]);
  const [appliedopt, setAppliedopt] = useState([]);
  const [title, setTitle] = useState([]);
  const [sections, setSections] = useState([]);
  const [comp, setComp] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const handleFetch_section = async () => {
    PostRequest({ url: "api/fetch/sections" }, { id: data.FK_EFormID })
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
    PostRequest({ url: "api/fetch/eoptions" }, { id: data.FK_EFormID })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setOptions(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    PostRequest({ url: "api/fetch/appliedopt" }, { id: data.FK_EFormID })
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
    PostRequest({ url: "api/fetch/setOfeoptions" }, { id: data.FK_EFormID })
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

  const handleFetch_feedback = async () => {
    PostRequest({ url: "api/fetch/_feedback" })
      .then((res) => {
        const {
          statusText,
          data: { message, data },
        } = res;
        setFeedback(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleFetch_Options();
    handleFetch_SetofOptions();
    handleFetch_section();
    handleFetch_title();
    handleFetch_components();
    handleFetch_feedback();
  }, []);

  const SECTION = sections.filter((x) => x.FK_Eid == data.FK_EFormID);
  const table = {
    width: "100%",
    borderCollapse: "collapse",
  };
  const th = {
    border: "1px solid gray",
    padding: "5px",
    margin: "0",
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ padding: "40px" }}>
        <Box paddingBottom="1px">
          <TitleHeader title={"Viewing"} icon={""} />
        </Box>

        <h4
          style={{
            fontWeight: "normal",
            fontSize: "14px",
            float: "right",
          }}
        >
          Evaluated By :{" "}
          <span
            style={{ fontWeight: "bold", fontSize: "16px" }}
          >{`${data.fname} ${data.mname} ${data.lname}`}</span>
          <br />
          <span style={{ fontSize: "13px" }}>
            {moment(data.submitted).format("h:mma , MMMM D YYYY ")}
          </span>
        </h4>
        <Button
          variant="contained"
          onClick={() => {
            PostRequest(
              { url: "api/download/evaluation" },
              {
                section: SECTION,
                title: title,
                appliedopt: appliedopt,
                comp: comp,
                options: options,
                formTitle: data.title,
                FormID: data.FK_EFormID,
                feedback: feedback,
                userID: data.FK_user_ID,
                userName: `${data.lname}_${data.title}`,
                fullname: `${data.fname} ${data.mname} ${data.lname}`,
              }
            )
              .then((res) => {
                const {
                  statusText,
                  data: { fileGenerated },
                } = res;

                window.open(
                  `${Baseurl}api/download/file/evaluation/${fileGenerated}`,
                  "_blank"
                );
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          size="small"
          sx={{ marginTop: "15px" }}
        >
          Download <DownloadIcon fontSize="small" />
        </Button>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            {" "}
          </Grid>
          <Grid item xs={10}>
            <Box
              p={5}
              sx={{
                fontSize: "14px",
                backgroundColor: "white",
                boxShadow: " 2px 2px 4px 2px rgba(0, 0, 0, 0.1);",
                borderRadius: "6px",
              }}
            >
              {" "}
              <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                <img src={zcmclogo} alt="" />
                <br />
                <h4>{data.title}</h4>
              </Box>
              <table style={table}>
                {SECTION.map((section) => {
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

                  const Options = options.filter(
                    (o) =>
                      o.setofOptionID == setofoptionID && o.EformID == Eformid
                  );
                  return (
                    <>
                      <thead>
                        <tr>
                          <th colSpan={2} style={th}>
                            {sectionName}
                          </th>

                          {Options.map((opt) => {
                            return <th style={th}>{opt.option}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {title
                          .filter((ttl) => ttl.FK_EsectionID == sectionId)
                          .map((item) => {
                            const { title: titlename, id: titleID } = item;
                            return (
                              <>
                                <tr
                                  style={{
                                    border: "1px solid gray",
                                  }}
                                >
                                  <td
                                    rowSpan={
                                      comp.filter(
                                        (x) => x.FK_EtitleID === titleID
                                      ).length + 1
                                    }
                                    style={{
                                      boxSizing: "border-box",
                                      border: "1px solid gray",
                                    }}
                                  >
                                    {" "}
                                    <div style={{ height: "100%" }}>
                                      <Box
                                        sx={{
                                          padding: "10px",
                                          height: "100%",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {titlename}
                                      </Box>
                                    </div>
                                  </td>
                                </tr>

                                {comp
                                  .filter((x) => x.FK_EtitleID === titleID)
                                  .map((row) => {
                                    const {
                                      id: componentID,
                                      FK_EtitleID,
                                      FK_Eid,
                                      content,
                                    } = row;
                                    return (
                                      <tr key={componentID} style={{}}>
                                        <td
                                          style={{
                                            padding: "5px",

                                            border: "1px solid gray",
                                          }}
                                        >
                                          {content}
                                        </td>

                                        {Options.map((opt) => {
                                          return (
                                            <td style={th}>
                                              {feedback.filter(
                                                (f) =>
                                                  f.FK_Eid == data.FK_EFormID &&
                                                  f.userID == data.FK_user_ID &&
                                                  f.componentID ==
                                                    componentID &&
                                                  f.FK_optionID == opt.id
                                              ).length >= 1
                                                ? feedback
                                                    .filter(
                                                      (f) =>
                                                        f.FK_Eid ==
                                                          data.FK_EFormID &&
                                                        f.userID ==
                                                          data.FK_user_ID &&
                                                        f.componentID ==
                                                          componentID &&
                                                        f.FK_optionID == opt.id
                                                    )
                                                    .map((e) => {
                                                      if (!isNaN(e.answer)) {
                                                        return (
                                                          <div
                                                            style={{
                                                              textAlign:
                                                                "center",
                                                            }}
                                                          >
                                                            <DoneIcon fontSize="small" />
                                                          </div>
                                                        );
                                                      } else {
                                                        return (
                                                          <span
                                                            style={{
                                                              fontStyle:
                                                                "italic",
                                                            }}
                                                          >
                                                            {e.answer}
                                                          </span>
                                                        );
                                                      }
                                                    })
                                                : ""}
                                            </td>
                                          );
                                        })}
                                      </tr>
                                    );
                                  })}
                              </>
                            );
                          })}
                      </tbody>
                    </>
                  );
                })}
              </table>
            </Box>
          </Grid>
          <Grid item xs={1}>
            {" "}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
