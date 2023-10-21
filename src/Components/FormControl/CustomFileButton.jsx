import React, { useRef } from "react";
import { Button, useTheme } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

function CustomFileInputButton(props) {
  const theme = useTheme();
  const color = theme.palette;
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files;
    if (file) {
      props.onFileSelected(file);
    }
  };

  return (
    <>
      <input
        multiple
        type="file"
        ref={fileInputRef}
        style={{
          display: "none",
        }}
        onChange={handleFileInputChange}
      />
      <Button
        variant="contained"
        onClick={handleButtonClick}
        sx={{
          backgroundColor: color.tertiary.main,
          color: "white",
          width: "auto",
          px: 4,
          borderRadius: 5,
          opacity: 0.9,
          "&:hover": {
            backgroundColor: color.tertiary.main,
            opacity: 1,
            color: "white", // change the text color on hover
          },
          fontSize: 12,
          letterSpacing: 0.6,
        }}
      >
        {props.buttonText}
        <AddCircleOutlineRoundedIcon style={{ marginLeft: 5, fontSize: 20 }} />
      </Button>
    </>
  );
}

export default CustomFileInputButton;
