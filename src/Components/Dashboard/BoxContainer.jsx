import { MoreHoriz } from "@mui/icons-material";
import { useState } from "react";

import {
  Box,
  Divider,
  Icon,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Skeleton,
  Chip,
  Select,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useRef } from "react";

function BoxContainer({
  width,
  icon,
  header,
  content,
  options,
  isLoading,
  list_title,
  list,
  isCategorylist,
  withList = false,
  setValue,
  value,
  action,
}) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [alignment, setAlignment] = useState("left");
  const ref = useRef(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  if (isLoading) {
    return (
      <Box
        backgroundColor="white"
        width={width}
        borderRadius={2}
        height={"100%"}
      >
        {/* <Box style={{ maxHeight: 300, overflow: "auto" }}></Box> */}
        <Box
          display="flex"
          justifyContent={"space-between"}
          sx={{ px: 2, py: 0 }}
          alignItems={"center"}
        >
          <Box display="flex" alignItems={"center"}>
            <Skeleton width={20} />
            <Typography
              ml={1}
              fontSize={14}
              fontWeight={600}
              color={theme.palette.tertiary.main}
            >
              <Skeleton width={200} />
            </Typography>
          </Box>
          <IconButton
            aria-label="more"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Skeleton width={40} />
          </IconButton>
        </Box>
        {/* <Divider /> */}

        <Box align="center" width={"100%"} sx={{ px: 3 }}>
          <Skeleton width={"90%"} height={"40vh"} />
        </Box>
      </Box>
    );
  }
  return (
    <Box backgroundColor="white" width={width} height={"100%"} borderRadius={2}>
      {/* <Box style={{ maxHeight: 300, overflow: "auto" }}></Box> */}
      <Box
        display="flex"
        justifyContent={"space-between"}
        sx={{ px: 2, py: withList ? 0.5 : 1 }}
        alignItems={"center"}
      >
        <Box display="flex" alignItems={"center"}>
          <Icon as={icon} sx={{ fontSize: 19 }} />
          <Typography
            ml={1}
            fontSize={14}
            fontWeight={600}
            color={theme.palette.tertiary.main}
          >
            {header}
          </Typography>
        </Box>
        {/* <IconButton
          aria-label="more"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHoriz />
        </IconButton> */}

        {withList ? (
          <FormControl
            variant="standard"
            size="small"
            sx={{
              // my: 1,
              width: 310,
              // backgroundColor: "white",
              border: "none",
              borderRadius: 1.5,
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {list_title}
            </Typography>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              onChange={(e) => {
                setValue(e.target.value);
                action(e.target.value);
              }}
              value={value}
              label={list_title}
              // renderValue={(value) => {
              //   <Box sx={{ display: "flex", flexWrap: "wrap", p: 0.5 }}>
              //     <Chip
              //       key={value}
              //       label={value}
              //       sx={{
              //         backgroundColor: "#E6F8F9",
              //         color: "#7F7C82",
              //         fontWeight: 600,
              //       }}
              //     />
              //   </Box>;
              // }}
              sx={{ backgroundColor: "white" }}
            >
              {list.map((cat) => (
                <MenuItem key={cat.id} value={cat.id} sx={{ fontSize: 12 }}>
                  {cat.name.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          ""
        )}
      </Box>

      <Divider />

      <Box width={"100%"} sx={{ px: 3, py: 3 }}>
        {content}
      </Box>
    </Box>
  );
}

export default BoxContainer;
