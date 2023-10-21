import React, { useState, useEffect } from "react";
import { Container, Box, Grid, Typography, Button } from "@mui/material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TitleHeader from "../Components/TitleHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ModalComponent from "../Components/Popups/ModalComponent";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { GetRequest, PostRequest } from "../API/Api";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { E_preview } from "../Components/E_preview";
import { E_Management } from "../Components/E_Management";

export const ManageEvaluation = () => {
  const [secondary, setSecondary] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [edata, setEdata] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [selectedPreview, setselectedPreview] = useState([]);
  const navigate = useNavigate();

  /* evaluationList */

  const handleFetch = () => {
    GetRequest({ url: "api/evaluationList" })
      .then((res) => {
        if (res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setEdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (e) => {
    const id = e.currentTarget.dataset.id;
    swal({
      title: "Are you sure?",
      text: "Once deleted, End user will no longer have access to this Evaluation form",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        PostRequest({ url: "api/delete/evaluation" }, { id: id })
          .then((res) => {
            if (res.statusText !== "OK") {
              throw new Error("Bad response.", { cause: res });
            }
            setFetch(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  useEffect(() => {
    handleFetch();
    setFetch(false);
  }, [fetch]);

  const handleEPReview = ({ formID }) => {
    setselectedPreview(edata.filter((x) => x.id == formID));
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ padding: "40px" }}>
        <Box paddingBottom="1px">
          <TitleHeader
            title="Manage Evaluation Form"
            icon={<FormatListNumberedIcon sx={{ fontSize: "small" }} />}
          />
        </Box>

        <E_Management
          edata={edata}
          selectedPreview={selectedPreview}
          handleDelete={handleDelete}
          handleEPReview={handleEPReview}
          setOpenModal={setOpenModal}
        />
      </Container>
      <ModalComponent
        usedType={"AddForm"}
        open={openModal ? true : false}
        setFetch={setFetch}
        onClose={() => {
          setOpenModal(false);
        }}
      />
    </div>
  );
};
