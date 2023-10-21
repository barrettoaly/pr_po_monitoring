import { Download, FileCopy, MoreVert, ViewAgenda } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";

function FileListItem(props) {
  // MORE OPTIONS
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    {
      label: "View",
      href: "/view",
      icon: <ViewAgenda sx={{ fontSize: 16, mr: 1, color: "gray" }} />,
    },
    {
      label: "Download",
      href: "/download",
      icon: <Download sx={{ fontSize: 18, mr: 1, color: "gray" }} />,
    },
  ];

  return (
    <Box
      sx={{
        width: "90vh",
        height: "auto",
        backgroundColor: "white",
        py: 1.2,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FileCopy />
        <Stack ml={2}>
          <Typography fontSize={14}>File name here</Typography>
          <Typography variant={"caption"}>100 mb</Typography>
        </Stack>
      </Box>

      <Typography ml={1} fontSize={12} color="gray">
        {moment().fromNow()}
      </Typography>

      <IconButton
        aria-label="more"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert sx={{ fontSize: 20 }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option.href}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            {option.icon}
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default FileListItem;
