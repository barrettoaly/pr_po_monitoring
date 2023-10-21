import { Box, Container, Stack, useTheme } from "@mui/material";
import React from "react";
import TitleHeader from "../Components/TitleHeader";
import { CloudUpload } from "@mui/icons-material";
import FileListItem from "../Components/FileListItem";

function Uploads(props) {
  const theme = useTheme();
  const color = theme.palette;

  return (
    <div
      style={{ backgroundColor: color.secondary.lightGray, height: "100vh" }}
    >
      <Container maxWidth="xl" sx={{ padding: "40px" }}>
        <Box paddingBottom="50px">
          <TitleHeader
            title="Uploaded Files"
            icon={<CloudUpload sx={{ fontSize: "small" }} />}
          />
        </Box>

        <Stack gap={1}>
          {[...Array(3)].map(() => {
            return <FileListItem />;
          })}
        </Stack>
      </Container>
      {/* </Box> */}
    </div>
  );
}

export default Uploads;
