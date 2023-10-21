import { Box, Icon, Skeleton, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useTheme } from "@emotion/react";
import CountUp from "react-countup";

function BoxTiles({
  count,
  title,
  icon,
  percent,
  action,
  forMCC,
  isActive,
  isLoading,
}) {
  const theme = useTheme();

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: isActive ? 12 : 10,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: isActive
        ? theme.palette.primary.main
        : theme.palette.info.dark,
    },
  }));

  if (isLoading) {
    return (
      <Box
        sx={{
          my: { xs: 2, sm: 2, md: 0, lg: 0, xl: 0 },
          background: "white",
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Box p={3}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography variant="h4" fontWeight={"bolder"}>
                <Skeleton width={50} />
              </Typography>
              <Typography variant="body2">
                <Skeleton width={130} />
              </Typography>
            </Box>

            <Box mt={-2}>
              <Skeleton width={50} height={75} pt={-3} />
            </Box>
          </Box>

          <Box mt={1.3} fontWeight={600} fontSize={10} align="right">
            <Skeleton width={"5%"} />
          </Box>
          <Skeleton />
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        my: { xs: 2, sm: 2, md: 0, lg: 0, xl: 0 },
        background: "white",
        width: "100%",
        borderRadius: 2,
        color: isActive
          ? theme.palette.primary.main
          : theme.palette.tertiary.main,
        boxShadow: isActive
          ? "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"
          : "none",
        "&:hover": {
          cursor: forMCC && !isActive ? "pointer" : "",
          backgroundColor: isActive
            ? "none"
            : forMCC
              ? theme.palette.grey[50]
              : "",
          // color: "white",
        },
      }}
      onClick={action}
    >
      <Box p={3}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Typography variant="h4" fontWeight={"bolder"}>
              <CountUp end={count} />
            </Typography>
            <Typography variant="body2">{title}</Typography>
          </Box>
          <Box display={forMCC ? "none" : ""}>
            <Box
              sx={{
                background: theme.palette.secondary.lightPurple,
                borderRadius: 1,
                padding: "8px 8px 2px 8px",
              }}
            >
              <Icon as={icon} />
            </Box>
          </Box>
        </Box>
        {/* 
        <Typography
          align="right"
          mt={1.3}
          fontWeight={600}
          mb={0.5}
          fontSize={12}
        >
          {percent == null ? "NOT APPLICABLE" : percent + "%"}
        </Typography> */}

        {/* <BorderLinearProgress
          variant="determinate"
          value={percent}
          sx={{ zIndex: 0 }}
        /> */}
      </Box>
    </Box>
  );
}

export default BoxTiles;
