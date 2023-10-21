import { Check, Close } from "@mui/icons-material";
import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import moment from "moment";
import React from "react";

function BoxList({ title, date, items, isDelivered, isLoading, action }) {

  const theme = useTheme();

  if (isLoading) {
    return (
      <Box sx={{ backgroundColor: "white", p: 1.5, borderRadius: 1 }}>
        {console.log(isLoading)}
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack width={"400"}>
            <Skeleton animation="wave" width={200} />
            <Skeleton animation="wave" width={100} />
          </Stack>

          <Stack>
            <Box align="right" mb={0.5}>
              <Skeleton animation="wave" width={50} />
            </Box>

            <Skeleton
              animation="wave"
              variant="circular"
              width={80}
              sx={{ borderRadius: 10 }}
            />
          </Stack>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        p: 1.5,
        borderRadius: 1,
        ":hover": {
          cursor: "pointer",
          backgroundColor: theme.palette.grey[50],
          boxShadow:
            "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",

          // color: "white",
        },
      }}
      onClick={action}
    >
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Typography fontWeight={600} fontSize={14}>
            {title}
          </Typography>
          <Typography fontSize={15}>
            No. of Items: <b>{items}</b>
          </Typography>
        </Stack>

        <Stack>
          <Typography fontSize={13} align="right" mb={0.5}>
            <b>{moment(date).format("ll")}</b>
          </Typography>

          <Box
            sx={{
              pl: 1.2,
              fontSize: 11,
              py: 0.5,
              backgroundColor: isDelivered
                ? theme.palette.success.light
                : theme.palette.error.main,
              color: "white",
              borderRadius: 10,
            }}
            color={isDelivered ? "success" : "warning"}
          >
            {isDelivered ? "Delivered" : "Undelivered"}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default BoxList;
