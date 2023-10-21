import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import { Etitle, Esection, Ecard } from "./Ecomponents";
import { PostRequest } from "../API/Api";
import { Box } from "@mui/material";
export const E_preview = ({ selectedPreview }) => {
  const { id: formID, title: formTitle, created_at } = selectedPreview[0];
  const [setofOptions, setSetofoptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [appliedopt, setAppliedopt] = useState([]);
  const [title, setTitle] = useState([]);
  const [sections, setSections] = useState([]);
  const [comp, setComp] = useState([]);

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
    handleFetch_Options();
    handleFetch_SetofOptions();
    handleFetch_section();
    handleFetch_title();
    handleFetch_components();
  }, []);
  const SECTIONS = sections.filter((sec) => sec.FK_Eid == formID);
  return (
    <div style={{ padding: "5px", height: "60vh", overflowY: "scroll" }}>
      <h3 style={{ color: "#146C94" }}>
        {formTitle}
        <br />
        <span style={{ fontSize: "10px" }}>
          {moment(created_at).format("MMMM DD YYYY, h:mm:ss a")}
        </span>
      </h3>

      {SECTIONS.map((section) => {
        const { name: sectionName, FK_Eid: Eformid, id: sectionId } = section;
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
                          <Ecard
                            content={content}
                            view={true}
                            FK_EtitleID={FK_EtitleID}
                            componentID={componentID}
                            //   handleChangeContent={handleChangeContent}
                            setofoptionID={setofoptionID}
                            options={options}
                          />
                        );
                      })}
                  </Box>
                );
              })}
          </Box>
        );
      })}
    </div>
  );
};
