import React from "react";
import { Box, Chip, Button, Menu, MenuItem } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { PostRequest } from "../API/Api";
export const E_apply = ({
  sections,
  data,
  handleFetch_section,
  setFetch,
  setofOptionID,
  appliedopt,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    handleFetch_section();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAssign_options = async ({ id }) => {
    const formid = data.id;
    PostRequest(
      { url: "api/setOption/Global" },
      { formid: formid, sectionID: id, setofOptionID: setofOptionID }
    )
      .then((res) => {
        setFetch(true);
        handleClose();
      })
      .catch((err) => console.log(err));
  };
  const ITEM_HEIGHT = 48;
  const OPTIONS = appliedopt.filter(
    (x) => x.EformID == data.id && x.setofoptionID == setofOptionID
  );

  return (
    <div>
      {OPTIONS.length >= 1 ? (
        <span style={{ fontSize: "12px", color: "#5D9C59" }}>
          Applied to :{" "}
        </span>
      ) : (
        <span
          style={{
            fontSize: "11px",
            backgroundColor: "#E76161",
            padding: "5px 10px",
            color: "white",
            borderRadius: "10px",
          }}
        >
          Not Applied
        </span>
      )}

      <Box
        sx={{
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#EDEDED",
        }}
      >
        <Box sx={{ marginBottom: "10px" }}>
          {OPTIONS.map((row) => {
            const { sectionID, id } = row;

            return sections
              .filter((s) => s.id == sectionID)
              .map((f) => {
                return (
                  <Chip
                    label={f.name}
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => {}}
                    onDelete={() => {
                      PostRequest(
                        { url: "api/delete/components" },
                        { types: "appliedopt", id: id }
                      )
                        .then((res) => {
                          setFetch(true);
                        })
                        .catch((err) => console.log(err));
                    }}
                    sx={{ margin: "3px" }}
                  />
                );
              });
          })}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            Apply this
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
              .map((option) =>
                appliedopt.filter((x) => x.sectionID == option.id).length >=
                1 ? (
                  ""
                ) : (
                  <MenuItem
                    key={option.id}
                    selected={option === "Pyxis"}
                    onClick={() => {
                      handleAssign_options({ id: option.id });
                    }}
                  >
                    <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                      {option.name}
                    </span>
                  </MenuItem>
                )
              )}
          </Menu>
        </Box>
      </Box>
    </div>
  );
};
