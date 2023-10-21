import React from "react";
import { Button, Modal, Box, Typography, useTheme } from "@mui/material";
import ButtonComponent from "../ButtonComponent";

const CustomedModal = ({
  modalW,
  open,
  title,
  content,
  withImage,
  img,
  imgWidth,
  link,
}) => {
  const theme = useTheme();
  const color = theme.palette;
  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 5,
          px: 10,
          py: 8,
          borderRadius: 1,
          width: modalW,
          maxWidth: 1000,
          transition: "transform .3s ease-in-out",
        }}
      >
        <Box align="center" justifyContent={"center"}>
          {withImage ? <img src={img} width={imgWidth} /> : ""}
          <Box my={5}>
            <h3>{title}</h3>
            <Typography fontSize={16}>{content}</Typography>
          </Box>

          <ButtonComponent
            name="Log in here"
            variant="filled"
            type="button"
            // color={color.tertiary.main}
            action={(e) => (window.location.href = "/login")}
            color="	#2E8B57"
            textColor="white"
            width={150}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomedModal;
