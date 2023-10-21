import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 200,
    cursor: "pointer",
    backgroundColor: theme.palette.background.paper,
  },
}));

function DragAndDropFileUpload() {
  const classes = useStyles();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const files = [...event.dataTransfer.files];
    console.log(files);
  };

  return (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        elevation={isDragging ? 10 : 2}
      >
        <Typography variant="h6">
          {isDragging ? "Drop your files here" : "Drag and drop your files"}
        </Typography>
      </Paper>
    </div>
  );
}

export default DragAndDropFileUpload;
