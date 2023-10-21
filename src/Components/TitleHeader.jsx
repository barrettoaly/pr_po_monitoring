import React from "react";
import { Box, Breadcrumbs, Link, Typography, useTheme } from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledBreadcrumb = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  "&:hover, &:focus": {
    textDecoration: "underline",
  },
  "&:active": {
    color: theme.palette.secondary,
  },

  padding: 5,
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  gap: 3,
}));

function TitleHeader({ title, icon, withBreadCrumbs = true }) {
  const theme = useTheme();

  return (
    <Box sx={{ paddingTop: "60px" }}>
      <Typography
        sx={{
          color: theme.palette.tertiary.main,
          fontSize: 32,
          fontWeight: "bolder",
        }}
        pb="10px"
      >
        {title}
      </Typography>
      {withBreadCrumbs ? (
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb href="/" sx={{ fontSize: 14 }}>
            <Dashboard sx={{ fontSize: "small" }} />
            Dashboard
          </StyledBreadcrumb>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: 14,
            }}
          >
            {icon}
            {title}
          </Typography>
        </Breadcrumbs>
      ) : (
        ""
      )}
    </Box>
  );
}

export default TitleHeader;
