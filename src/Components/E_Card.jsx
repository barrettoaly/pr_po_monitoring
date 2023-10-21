import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Etitle, Esection, Ecard } from "./Ecomponents";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { PostRequest } from "../API/Api";
export const E_Card = ({
  eformid,
  fetch,
  setFetch,
  sections,
  title,
  appliedopt,
  options,
}) => {
  const [toUpdate, setToUpdate] = useState([]);
  const [comp, setComp] = useState([]);
  const handleChangeContent = async ({ id, value, entity }) => {
    PostRequest(
      { url: "api/change/Contents" },
      { id: id, value: value, entity: entity }
    )
      .then((res) => {})
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
    handleFetch_components();
  }, [fetch]);
  const SECTIONS = sections.filter((sec) => sec.FK_Eid == eformid);
  return (
    <div>
      {SECTIONS.length >= 1 ? (
        SECTIONS.map((section) => {
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
                view={false}
                Eformid={Eformid}
                sectionId={sectionId}
                handleChangeContent={handleChangeContent}
                setFetch={setFetch}
              />

              {title
                .filter((ttl) => ttl.FK_EsectionID == sectionId)
                .map((item) => {
                  const { title: titlename, id: titleID } = item;
                  return (
                    <Box>
                      <Etitle
                        sectionId={sectionId}
                        section={SECTIONS}
                        title={titlename}
                        view={false}
                        titleID={titleID}
                        handleChangeContent={handleChangeContent}
                        setFetch={setFetch}
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
                              view={false}
                              FK_EtitleID={FK_EtitleID}
                              componentID={componentID}
                              handleChangeContent={handleChangeContent}
                              setofoptionID={setofoptionID}
                              options={options}
                              allTitle={title}
                              setFetch={setFetch}
                            />
                          );
                        })}
                    </Box>
                  );
                })}
            </Box>
          );
        })
      ) : (
        <>
          <h4>No Contents yet..</h4>
          <h3>
            To start with , Press{" "}
            <span
              style={{
                fontSize: "12px",
                padding: "5px",
                backgroundColor: "#3C79F5",
                color: "white",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            >
              SECTION <AddCircleOutlineIcon sx={{ fontSize: "small" }} />
            </span>
            to create a section.
            <br />
            <span style={{ fontSize: "14px", color: "gray" }}>
              {" "}
              Example : General , Operational Performance , Maintenance ,
              Sustainability
            </span>
            <br />
            <br />
            Next, Press{" "}
            <span
              style={{
                fontSize: "12px",
                padding: "5px",
                backgroundColor: "#3C79F5",
                color: "white",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            >
              TITLE <AddCircleOutlineIcon sx={{ fontSize: "small" }} />
            </span>
            to create a title of a specific section .
            <br />
            <span style={{ fontSize: "14px", color: "gray" }}>
              {" "}
              Example : Packaging , Technical specification , User manual,
              Installation , functionality , durability , flexibility etc.
            </span>
            <br />
            <br />
            Next, Press{" "}
            <span
              style={{
                fontSize: "12px",
                padding: "5px",
                backgroundColor: "#3C79F5",
                color: "white",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            >
              COMPONENT <AddCircleOutlineIcon sx={{ fontSize: "small" }} />
            </span>
            to create a detailed description for the reference of the end users
            evaluation.
            <br />
            <span style={{ fontSize: "14px", color: "gray" }}>
              {" "}
              Note : Components are childs of the TITLE
            </span>
            <br />
            <br />
            <h5>Feel Free to Test.</h5>
          </h3>
        </>
      )}
      {/* 
      <Etitle title={"PACKAGING"} />
       */}
      {/* {eformid} */}
      {/**/}
    </div>
  );
};
