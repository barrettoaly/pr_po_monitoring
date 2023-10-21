import React, { useState, useEffect } from "react";
import { Container, Box, Grid, Typography, Button, Chip } from "@mui/material";
import TitleHeader from "../Components/TitleHeader";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TuneIcon from "@mui/icons-material/Tune";
import { E_Card } from "../Components/E_Card";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { E_options } from "../Components/E_options";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GetRequest, PostRequest } from "../API/Api";
import { E_apply } from "../Components/E_apply";
import { useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
export const EditForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [setofOptions, setSetofoptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [appliedopt, setAppliedopt] = useState([]);
  const [fetch, setFetch] = useState(false);
  const { data } = location.state || {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [sections, setSections] = useState([]);
  const [title, setTitle] = useState([]);

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const containerRef = useRef();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    handleFetch_section();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
    handleFetch_title();
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleFetch_section = async () => {
    PostRequest({ url: "api/fetch/sections" }, { id: data.id })
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

  const ITEM_HEIGHT = 48;
  const handleFetch_Options = () => {
    PostRequest({ url: "api/fetch/eoptions" }, { id: data.id })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setOptions(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    PostRequest({ url: "api/fetch/appliedopt" }, { id: data.id })
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
    PostRequest({ url: "api/fetch/setOfeoptions" }, { id: data.id })
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

  useEffect(() => {
    handleFetch_Options();
    handleFetch_SetofOptions();
    handleFetch_section();
    handleFetch_title();
    setFetch(false);
  }, [fetch]);

  const handleDeleteopt = async (id) => {
    PostRequest({ url: "api/delete/eoptions" }, { id: id })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setFetch(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateOption = async (optionT, optionID) => {
    PostRequest(
      { url: "api/create/eoptions" },
      { optionType: optionT, id: data.id, optionID: optionID }
    )
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setFetch(true);
        setAnchorEl(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateOptionText = async (id, value) => {
    PostRequest({ url: "api/update/texteoptions" }, { id: id, value: value })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setFetch(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddsetOfOptions = async () => {
    PostRequest({ url: "api/store/setOfeoptions" }, { formid: data.id })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setFetch(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveSetofoptions = async (id) => {
    PostRequest({ url: "api/delete/setOfeoptions" }, { id: id })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setFetch(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddComponents = async ({ types, sectionID, titleID }) => {
    const formid = data.id;
    PostRequest(
      { url: "api/store/components" },
      { id: formid, types: types, sectionID: sectionID, titleID: titleID }
    )
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setFetch(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeFixed = {
    position: "fixed",
    backgroundColor: "white",
    zIndex: "5",
    top: "70px",
  };

  const makeFixed2 = {
    position: "fixed",
    zIndex: "5",
    top: "280px",
    height: "70vh",
    width: containerRef.current ? containerRef.current.offsetWidth : null,
    overflowY: "scroll",
  };
  const [scrollHeight, setScrollHeight] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const y = window.pageYOffset;
      setScrollHeight(y);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const size = () => {
    return Math.floor(scrollHeight) > 400 && true;
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ padding: "40px" }}>
        <Box paddingBottom="1px"></Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box
              p={3}
              border={"1px dotted #E8E2E2"}
              borderRadius={"10px"}
              // sx={{ position: "fixed" }}
              ref={containerRef}
              sx={makeFixed}
            >
              {" "}
              <span
                style={{
                  position: "absolute",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              >
                {data.title}
              </span>
              <Chip
                label="Advance Settings"
                color="warning"
                variant="outlined"
                size="small"
                sx={{ marginBottom: "5px", float: "right" }}
              />
              <Button
                size="medium"
                sx={{ marginBottom: "5px" }}
                fullWidth
                variant="contained"
                onClick={() => {
                  handleAddComponents({ types: "section" });
                }}
              >
                Section{" "}
                <AddCircleOutlineIcon
                  sx={{ fontSize: "small", marginLeft: "5px" }}
                />
              </Button>
              <Button
                size="medium"
                sx={{ marginBottom: "5px" }}
                fullWidth
                variant="contained"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                Title{" "}
                <AddCircleOutlineIcon
                  sx={{ fontSize: "small", marginLeft: "5px" }}
                />
              </Button>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "40ch",
                    backgroundColor: "#F6F1F1",
                  },
                }}
              >
                {sections
                  .filter((x) => x.FK_Eid == data.id)
                  .sort((a, b) => b.id - a.id)
                  .map((option) => (
                    <MenuItem
                      key={option.id}
                      selected={option === "Pyxis"}
                      onClick={() => {
                        handleAddComponents({
                          types: "title",
                          sectionID: option.id,
                        });
                        handleClose();
                      }}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
              </Menu>
              <Button
                size="medium"
                sx={{ marginBottom: "5px" }}
                fullWidth
                variant="contained"
                aria-controls={open2 ? "long-menu" : undefined}
                aria-expanded={open2 ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick2}
              >
                Component{" "}
                <AddCircleOutlineIcon
                  sx={{ fontSize: "small", marginLeft: "5px" }}
                />
              </Button>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose2}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "40ch",
                    backgroundColor: "#F6F1F1",
                  },
                }}
              >
                {title

                  .filter((x) => x.FK_Eid == data.id)
                  .sort((a, b) => b.id - a.id)
                  .map((option) => (
                    <MenuItem
                      key={option.id}
                      selected={option === "Pyxis"}
                      onClick={() => {
                        handleAddComponents({
                          types: "components",
                          titleID: option.id,
                        });
                        handleClose2();
                      }}
                    >
                      <Box display={"flex"}>
                        <span>{option.title}</span>

                        <span
                          style={{
                            fontSize: "9px",
                            padding: "5px",
                            borderRadius: "10px",
                            marginLeft: "3px",
                            backgroundColor: "#FFD95A",
                          }}
                        >
                          {sections
                            .filter((e) => e.id == option.FK_EsectionID)
                            .map((sec) => {
                              return sec.name;
                            })}
                        </span>
                      </Box>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>

            <Box mb={5} sx={makeFixed2}>
              {/**/}
              <h5>
                Manage Options{" "}
                <FormatListBulletedRoundedIcon
                  sx={{ fontSize: "small", marginLeft: "5px" }}
                />
              </h5>
              <Button
                size="small"
                variant="contained"
                onClick={handleAddsetOfOptions}
              >
                Add Set of Options
              </Button>
              <Box mt={1}>
                {setofOptions
                  .filter((x) => x.EformID == data.id)
                  .map((row, key) => {
                    const { id } = row;

                    return (
                      <Box
                        sx={{
                          backgroundColor: "#F7F7F7",
                          padding: "20px",
                          borderRadius: "10px",
                          marginBottom: "5px",
                        }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ float: "right", fontSize: "10px" }}
                          color="error"
                          onClick={() => handleRemoveSetofoptions(id)}
                        >
                          Remove
                        </Button>
                        <h5>
                          Set of Options #
                          <span style={{ fontSize: "20px" }}>{key + 1}</span>
                        </h5>
                        <E_apply
                          sections={sections}
                          data={data}
                          handleFetch_section={handleFetch_section}
                          setFetch={setFetch}
                          setofOptionID={id}
                          appliedopt={appliedopt}
                        />
                        <E_options
                          options={options.filter((x) => x.setofOptionID == id)}
                          formID={data.id}
                          handleDeleteopt={handleDeleteopt}
                          handleUpdateOptionText={handleUpdateOptionText}
                          handleCreateOption={handleCreateOption}
                          setofeoptionsid={id}
                        />
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box p={5}>
              <Box
                sx={{
                  display: "Flex",
                  marginBottom: "20px",
                  color: "#146C94 !important",
                }}
              >
                <Box
                  sx={{
                    padding: "5px 10px",
                    borderRadius: "40px",
                    backgroundColor: "#F6F1F1",
                  }}
                >
                  <DriveFileRenameOutlineIcon />
                </Box>
                <input
                  type="text"
                  defaultValue={data.title}
                  style={{
                    width: "100%",
                    fontSize: "23px",
                    color: "#7286D3",
                    outline: "none",
                    border: "none",
                  }}
                  onBlur={(e) => {
                    PostRequest(
                      { url: "api/change/Contents" },
                      { id: data.id, value: e.target.value, entity: "eforms" }
                    )
                      .then((res) => {
                        setFetch(true);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                />
              </Box>
              <E_Card
                eformid={data.id}
                fetch={fetch}
                setFetch={setFetch}
                sections={sections}
                title={title}
                appliedopt={appliedopt}
                options={options}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
