import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { BsTrash } from "react-icons/bs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Box,
  Checkbox,
  FormGroup,
  TextField,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { PostRequest } from "../API/Api";

const textf = {
  textAlign: "center",
  width: "100%",
  padding: "5px",
  fontSize: "24px",
  border: "none",
  outline: "none",
  borderBottom: "1px solid #0081C9",
};
const textftitle = {
  padding: "10px",
  marginTop: "10px",
  marginBottom: "10px",
  color: "#7AA874",
  fontWeight: "bold",
  fontSize: "18px",
  border: "none",
  outline: "none",
  borderBottom: "1px solid #617A55",
  width: "100%",
};

const focusedTextf = {
  borderBottom: "1px solid #FD8A8A",
};

export const Esection = ({
  section,
  view,
  Eformid,
  sectionId,
  handleChangeContent,
  setFetch,
}) => {
  const [focused, setFocused] = useState(false);
  const [hide, setHide] = useState(false);
  return (
    <div>
      {" "}
      {view ? (
        <Box
          sx={{
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            marginBottom: "10px",
            backgroundColor: "white",
            cursor: "grab",
            borderLeft: "10px solid #D0F5BE",
          }}
        >
          <h3 style={{ textAlign: "center", textDecoration: "underline" }}>
            {section}
          </h3>
        </Box>
      ) : (
        <Box>
          {hide ? (
            ""
          ) : (
            <Box
              sx={{
                padding: "60px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                marginBottom: "10px",
                backgroundColor: "white",
                cursor: "grab",
                borderLeft: "10px solid #D0F5BE",
              }}
            >
              <input
                type="text"
                defaultValue={section}
                style={focused ? { ...textf, ...focusedTextf } : textf}
                onFocus={() => setFocused(true)}
                onBlur={async (e) => {
                  handleChangeContent({
                    id: sectionId,
                    value: e.target.value,
                    entity: "section",
                  });
                  setFocused(false);
                }}
                onChange={(e) => {
                  if (e.target.value == "") {
                    swal({
                      title: "Do you want to remove this?",
                      text: "",
                      icon: "warning",
                      buttons: ["Edit only", true],
                      dangerMode: false,
                    }).then((willDelete) => {
                      if (willDelete) {
                        PostRequest(
                          { url: "api/delete/components" },
                          { types: "section", id: sectionId }
                        )
                          .then((res) => {
                            // setFetch(true);
                            setHide(true);
                          })
                          .catch((err) => console.log(err));
                      }
                    });
                    return;
                  }
                }}
              />
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};

export const Etitle = ({
  title,
  view,
  titleID,
  handleChangeContent,
  section,
  sectionId,
  setFetch,
}) => {
  const [focused, setFocused] = useState(false);
  const [hide, setHide] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      {" "}
      {view ? (
        <Box
          sx={{
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            marginBottom: "10px",
            backgroundColor: "white",
            cursor: "grab",
          }}
        >
          <h4 style={{ color: "#FD8A8A" }}>{title}</h4>
        </Box>
      ) : (
        <Box>
          {hide ? (
            ""
          ) : (
            <Box
              sx={{
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                marginBottom: "10px",
                backgroundColor: "white",
                cursor: "grab",
              }}
            >
              <span style={{ fontSize: "11px", color: "#146C94" }}>TITLE</span>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(e) => {
                  setFetch(true);
                  handleClick(e);
                }}
                variant="outlined"
                color="secondary"
                size="small"
                sx={{ color: "#19A7CE", float: "right" }}
              >
                Move To{" "}
                {anchorEl ? (
                  <ArrowDropUpIcon
                    fontSize="small"
                    style={{ marginLeft: "3px" }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    fontSize="small"
                    style={{ marginLeft: "3px" }}
                  />
                )}
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {section
                  .filter((x) => x.id != sectionId)
                  .map((row) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "14px" }}
                        onClick={() => {
                          alert(row.id);
                          handleClose();
                        }}
                      >
                        {row.name}
                      </MenuItem>
                    );
                  })}
              </Menu>
              <input
                type="text"
                onFocus={() => setFocused(true)}
                onBlur={async (e) => {
                  handleChangeContent({
                    id: titleID,
                    value: e.target.value,
                    entity: "title",
                  });
                  setFocused(false);
                }}
                style={
                  focused ? { ...textftitle, ...focusedTextf } : textftitle
                }
                defaultValue={title}
                onChange={(e) => {
                  if (e.target.value == "") {
                    swal({
                      title: "Do you want to remove this?",
                      text: "",
                      icon: "warning",
                      buttons: ["Edit only", true],
                      dangerMode: false,
                    }).then((willDelete) => {
                      if (willDelete) {
                        PostRequest(
                          { url: "api/delete/components" },
                          { types: "title", id: titleID }
                        )
                          .then((res) => {
                            // setFetch(true);
                            setHide(true);
                          })
                          .catch((err) => console.log(err));
                      }
                    });
                    return;
                  }
                }}
              />
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};

export const Ecard = ({
  content,
  options,
  view,
  FK_EtitleID,
  componentID,
  handleChangeContent,
  setofoptionID,
  sectionId,
  Feedback,
  answers,
  setAnswers,
  allTitle,
  setFetch,
}) => {
  const [hide, setHide] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [thisValue, setThisvalue] = useState();
  const Options = options.filter((o) => o.setofOptionID == setofoptionID);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      {hide ? (
        ""
      ) : (
        <Box
          sx={{
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            marginBottom: "10px",
            backgroundColor: "white",
            cursor: "grab",
          }}
        >
          {view ? (
            <h4 style={{ marginBottom: "10px" }}>{content}</h4>
          ) : (
            <Box>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(e) => {
                  setFetch(true);
                  handleClick(e);
                }}
                variant="outlined"
                color="secondary"
                size="small"
                sx={{ color: "#19A7CE", float: "right", marginBottom: "5px" }}
              >
                Move To{" "}
                {anchorEl ? (
                  <ArrowDropUpIcon
                    fontSize="small"
                    style={{ marginLeft: "3px" }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    fontSize="small"
                    style={{ marginLeft: "3px" }}
                  />
                )}
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={(e) => {
                  handleClose();
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {allTitle
                  .filter((x) => x.id != FK_EtitleID)
                  .map((row) => {
                    return (
                      <MenuItem
                        sx={{
                          fontSize: "14px",
                          color: "#7AA874",
                          fontWeight: "bold",
                        }}
                        onClick={handleClose}
                      >
                        {row.title}
                      </MenuItem>
                    );
                  })}
              </Menu>
              <TextField
                fullWidth
                sx={{ marginBottom: "10px" }}
                defaultValue={content}
                onBlur={async (e) => {
                  handleChangeContent({
                    id: componentID,
                    value: e.target.value,
                    entity: "components",
                  });
                }}
                onChange={(e) => {
                  if (e.target.value == "") {
                    swal({
                      title: "Do you want to remove this?",
                      text: "",
                      icon: "warning",
                      buttons: ["Edit only", true],
                      dangerMode: false,
                    }).then((willDelete) => {
                      if (willDelete) {
                        PostRequest(
                          { url: "api/delete/components" },
                          { types: "components", id: componentID }
                        )
                          .then((res) => {
                            // setFetch(true);
                            setHide(true);
                          })
                          .catch((err) => console.log(err));
                      }
                    });
                    return;
                  }
                }}
              />
            </Box>
          )}

          <Box display={"flex"} marginBottom={5} flexWrap="wrap">
            {Options.length >= 1 ? (
              Options.map((row) => {
                switch (row.optionType) {
                  case "radio":
                    return (
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedValue}
                        onChange={(event) => {
                          setSelectedValue(event.target.value);
                        }}
                      >
                        <FormControlLabel
                          value={row.id}
                          control={
                            <Radio
                              checked={
                                answers
                                  ? answers.filter(
                                      (x) =>
                                        x.componentID === componentID &&
                                        x.optionID === row.id &&
                                        x.optionType === "radio"
                                    ).length >= 1
                                    ? true
                                    : false
                                  : false
                              }
                            />
                          }
                          label={row.option}
                          onClick={(e) => {
                            const validateitems = answers.filter(
                              (x) =>
                                x.componentID == componentID &&
                                x.optionType == "radio"
                            );

                            if (validateitems.length >= 1) {
                              const removable = answers.findIndex(
                                (x) =>
                                  x.componentID === componentID &&
                                  x.optionType === "radio"
                              );

                              console.log(removable);

                              console.log(answers);
                              const newItems = answers.filter(
                                (q, index) => index != removable
                              );

                              const updatedItems = [
                                ...newItems,
                                {
                                  componentID,
                                  value: e.target.value,
                                  optionID: row.id,
                                  optionType: row.optionType,
                                },
                              ];

                              setAnswers(updatedItems);
                              localStorage.setItem(
                                "answers",
                                JSON.stringify(updatedItems)
                              );
                            } else {
                              setAnswers([
                                ...answers,
                                {
                                  componentID,
                                  value: e.target.value,
                                  optionID: row.id,
                                  optionType: row.optionType,
                                },
                              ]);
                              localStorage.setItem(
                                "answers",
                                JSON.stringify([
                                  ...answers,
                                  {
                                    componentID,
                                    value: e.target.value,
                                    optionID: row.id,
                                    optionType: row.optionType,
                                  },
                                ])
                              );
                            }
                          }}
                        />
                      </RadioGroup>
                    );

                  case "text":
                    return (
                      <Box
                        display="block"
                        sx={{ flexBasis: "100%", marginTop: "8px" }}
                      >
                        {view ? (
                          <>
                            <TextField
                              placeholder={row.option}
                              fullWidth
                              value={
                                answers
                                  ? answers.filter(
                                      (x) =>
                                        x.componentID == componentID &&
                                        x.optionID == row.id
                                    ).length >= 1
                                    ? answers
                                        .filter(
                                          (x) =>
                                            x.componentID == componentID &&
                                            x.optionID == row.id
                                        )
                                        .map((val) => {
                                          return val.value;
                                        })
                                    : ""
                                  : ""
                              }
                              variant="outlined"
                              onChange={(e) => {
                                setThisvalue(e.target.value);
                                const existingAnswerIndex = answers.findIndex(
                                  (answer) =>
                                    answer.componentID === componentID &&
                                    answer.optionID === row.id
                                );

                                if (existingAnswerIndex !== -1) {
                                  // If componentID already exists in answers array, update the existing answer object
                                  const updatedAnswers = [...answers];
                                  updatedAnswers[existingAnswerIndex] = {
                                    ...updatedAnswers[existingAnswerIndex],
                                    value: e.target.value,
                                    optionID: row.id,
                                    optionType: row.optionType,
                                  };
                                  setAnswers(updatedAnswers);
                                  localStorage.setItem(
                                    "answers",
                                    JSON.stringify(updatedAnswers)
                                  );
                                } else {
                                  // If componentID does not exist in answers array, add a new answer object
                                  setAnswers([
                                    ...answers,
                                    {
                                      componentID,
                                      value: e.target.value,
                                      optionID: row.id,
                                      optionType: row.optionType,
                                    },
                                  ]);
                                  localStorage.setItem(
                                    "answers",
                                    JSON.stringify([
                                      ...answers,
                                      {
                                        componentID,
                                        value: e.target.value,
                                        optionID: row.id,
                                        optionType: row.optionType,
                                      },
                                    ])
                                  );
                                }
                              }}
                            />
                          </>
                        ) : (
                          <TextField
                            placeholder={row.option}
                            fullWidth
                            disabled
                            variant="standard"
                          />
                        )}
                      </Box>
                    );

                  case "check":
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              answers
                                ? answers.filter(
                                    (x) =>
                                      x.componentID == componentID &&
                                      x.optionID == row.id
                                  ).length >= 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label={row.option}
                        value={row.id}
                        onClick={(e) => {
                          setThisvalue(e.target.value);
                          const existingAnswerIndex = answers.findIndex(
                            (answer) =>
                              answer.componentID === componentID &&
                              answer.optionID === row.id
                          );

                          if (e.target.checked) {
                            // If the checkbox is checked
                            if (existingAnswerIndex !== -1) {
                              // If componentID already exists in answers array, update the existing answer object
                              const updatedAnswers = [...answers];
                              updatedAnswers[existingAnswerIndex] = {
                                ...updatedAnswers[existingAnswerIndex],
                                value: e.target.value,
                                optionID: row.id,
                                optionType: row.optionType,
                              };
                              setAnswers(updatedAnswers);
                              localStorage.setItem(
                                "answers",
                                JSON.stringify(updatedAnswers)
                              );
                            } else {
                              // If componentID does not exist in answers array, add a new answer object
                              setAnswers([
                                ...answers,
                                {
                                  componentID,
                                  value: e.target.value,
                                  optionID: row.id,
                                  optionType: row.optionType,
                                },
                              ]);
                              localStorage.setItem(
                                "answers",
                                JSON.stringify([
                                  ...answers,
                                  {
                                    componentID,
                                    value: e.target.value,
                                    optionID: row.id,
                                    optionType: row.optionType,
                                  },
                                ])
                              );
                            }
                          } else {
                            // If the checkbox is unchecked
                            if (existingAnswerIndex !== -1) {
                              // If componentID exists in answers array, remove the answer object
                              const updatedAnswers = [...answers];
                              updatedAnswers.splice(existingAnswerIndex, 1);
                              setAnswers(updatedAnswers);
                              localStorage.setItem(
                                "answers",
                                JSON.stringify(updatedAnswers)
                              );
                            }
                          }
                        }}
                      />
                    );
                }
              })
            ) : (
              <span style={{ fontSize: "13px", color: "#E76161" }}>
                No Set Options
              </span>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {view ? null : (
              <Button
                sx={{ fontSize: "17px" }}
                color="error"
                onClick={() => {
                  swal({
                    title: "Do you want to remove this?",
                    text: "",
                    icon: "warning",
                    buttons: ["No", "Yes"],
                    dangerMode: true,
                  }).then((willDelete) => {
                    if (willDelete) {
                      PostRequest(
                        { url: "api/delete/components" },
                        { types: "components", id: componentID }
                      )
                        .then((res) => {
                          // setFetch(true);
                          setHide(true);
                        })
                        .catch((err) => console.log(err));
                    }
                  });
                }}
              >
                <BsTrash />
              </Button>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
};

export const Echeckbox = ({
  id,
  content,
  handleDeleteopt,
  handleUpdateOptionText,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <FormControlLabel
        control={<Checkbox disabled defaultChecked />}
        label={
          <TextField
            variant="standard"
            defaultValue={content}
            fullWidth
            sx={{
              width: "100%",
            }}
            onBlur={(e) => {
              handleUpdateOptionText(id, e.target.value);
            }}
          />
        }
      />
      <Button
        variant="text"
        size="small"
        color="error"
        onClick={() => {
          handleDeleteopt(id);
        }}
      >
        <CancelIcon />
      </Button>
    </Box>
  );
};

export const Eradiobutton = ({
  id,
  content,
  handleDeleteopt,
  handleUpdateOptionText,
}) => {
  return (
    <Box>
      <FormControlLabel
        control={<Radio disabled defaultChecked />}
        label={
          <TextField
            variant="standard"
            defaultValue={content}
            fullWidth
            sx={{
              width: "100%",
            }}
            onBlur={(e) => {
              handleUpdateOptionText(id, e.target.value);
            }}
          />
        }
      />
      <Button
        variant="text"
        size="small"
        color="error"
        onClick={() => {
          handleDeleteopt(id);
        }}
      >
        <CancelIcon />
      </Button>
    </Box>
  );
};

export const Etextfield = ({
  id,
  content,
  handleDeleteopt,
  handleUpdateOptionText,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <FormControlLabel
        control={
          <Radio disabled sx={{ visibility: "hidden" }} defaultChecked />
        }
        label={
          <TextField
            variant="standard"
            defaultValue={content}
            fullWidth
            sx={{
              width: "100%",
            }}
            onBlur={(e) => {
              handleUpdateOptionText(id, e.target.value);
            }}
          />
        }
      />
      <Button
        variant="text"
        size="small"
        color="error"
        onClick={() => {
          handleDeleteopt(id);
        }}
      >
        <CancelIcon />
      </Button>
    </Box>
  );
};
