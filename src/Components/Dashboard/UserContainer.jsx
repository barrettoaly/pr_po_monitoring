import {
  Avatar,
  Box,
  Chip,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

function UserContainer({ name, department, bgColor, textColor, label }) {
  const theme = useTheme();

  return (
    <Link
      href="/user"
      sx={{ textDecoration: "none", color: theme.palette.grey[900] }}
    >
      <Box display="flex" justifyContent={"space-between"}>
        <Box display="flex" alignItems={"center"}>
          <Avatar src="/broken-image.jpg" />
          <Stack ml={2}>
            <Typography fontWeight={"bold"} fontSize={15}>
              {name}
            </Typography>
            <Typography fontSize={12}>{department}</Typography>
          </Stack>
        </Box>

        <Chip
          label={label}
          variant="solid"
          sx={{
            backgroundColor: bgColor,
            color: textColor,
            fontWeight: 600,
            fontSize: 12,
          }}
        />
      </Box>
    </Link>
  );
}

export default UserContainer;
