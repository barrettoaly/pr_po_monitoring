import React, { useState } from "react";
import { Echeckbox, Eradiobutton, Etextfield } from "./Ecomponents";
import { Button, Menu, MenuItem } from "@mui/material";
export const E_options = ({
  options,
  handleDeleteopt,
  handleUpdateOptionText,
  handleCreateOption,
  setofeoptionsid,
  formID,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        color="info"
        size="small"
      >
        Add Option
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
        <MenuItem
          onClick={() => {
            handleCreateOption("check", setofeoptionsid);
            handleClose();
          }}
        >
          Checkbox
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCreateOption("radio", setofeoptionsid);
            handleClose();
          }}
        >
          RadioButton
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCreateOption("text", setofeoptionsid);
            handleClose();
          }}
        >
          Textfield
        </MenuItem>
      </Menu>

      {options.map((row) => {
        const { option, optionType, id } = row;

        switch (optionType) {
          case "check":
            return (
              <Echeckbox
                id={id}
                content={option}
                handleDeleteopt={handleDeleteopt}
                handleUpdateOptionText={handleUpdateOptionText}
              />
            );

          case "radio":
            return (
              <Eradiobutton
                id={id}
                content={option}
                handleDeleteopt={handleDeleteopt}
                handleUpdateOptionText={handleUpdateOptionText}
              />
            );

          case "text":
            return (
              <Etextfield
                id={id}
                content={option}
                handleDeleteopt={handleDeleteopt}
                handleUpdateOptionText={handleUpdateOptionText}
              />
            );
        }
      })}
    </div>
  );
};
