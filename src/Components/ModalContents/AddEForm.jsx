import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  FormControl,
  TextField,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import InventoryIcon from "@mui/icons-material/Inventory";
import CommentIcon from "@mui/icons-material/Comment";
import { Close } from "@mui/icons-material";
import ButtonComponent from "../ButtonComponent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { PostRequest, GetRequest } from "../../API/Api";
import { DataGrid } from "@mui/x-data-grid";

export const AddEForm = ({ onClose, setFetch }) => {
  const [checked, setChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState();
  const [error, setError] = useState(false);
  const [search, setSearch] = useState();
  const [items, setItems] = useState([]);

  const theme = useTheme();
  const navigate = useNavigate();
  const color = theme.palette;

  const handleFetch = async () => {
    GetRequest({ url: "api/items/allitems" }).then((res) => {
      setItems(res.data.data);
    });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleSaveNew = async () => {
    if (title == undefined || checked.length == 0) {
      setError(true);
      setIsLoading(false);
      return;
    }
    let form = new FormData();
    form.append("typeofequipments", checked);
    form.append("title", title);

    PostRequest({ url: "/api/store/evaluation" }, form)
      .then((res) => {
        const {
          statusText,
          data: { message, data },
        } = res;

        navigate("/manage/edit/evalutionForm", { state: { data: data } });

        setFetch(true);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    { field: "abbreviation", headerName: "ITEMS", width: "480" },
  ];

  const ALLITEMS = search
    ? items
      ? items.filter((x) =>
          x.abbreviation.toLowerCase().includes(search.toLowerCase())
        )
      : []
    : items;

  console.log(checked);
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Typography variant="h6" mb={4} gutterBottom>
        New Evaluation Forms
      </Typography>
      <Box
        sx={{
          width: ["80vw", "50vw", "30vw"],
          bgcolor: "background.paper",
        }}
      >
        <FormControl fullWidth>
          <TextField
            required
            id="outlined-required"
            label="Title"
            variant="filled"
            autoFocus
            name="lname"
            error={error ? (title ? false : true) : false}
            sx={{ marginBottom: "13px" }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </FormControl>
        <Typography variant="body2" gutterBottom>
          Type of Equipment
          <br />
          <span style={{ fontSize: "11px", color: "#9BA4B5" }}>
            Select the equipment type for this evaluation form
          </span>
          <br />
          {error && checked.length == 0 && (
            <span style={{ color: "#EB455F" }}>
              Please select one or more to continue
            </span>
          )}
        </Typography>
        <TextField
          fullWidth
          size="small"
          sx={{ marginBottom: "8px" }}
          placeholder="Search Items"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Box
          sx={{
            padding: "10px",
            height: checked.length >= 1 ? "200px" : "",
            overflowY: checked.length >= 1 ? "scroll" : "",
          }}
        >
          {checked.length >= 1
            ? ALLITEMS.map((v) => {
                return (
                  <>
                    {checked
                      .filter((c) => c == v.id)
                      .map((ec) => {
                        return (
                          <Chip
                            label={v.abbreviation}
                            variant="outlined"
                            color="warning"
                          />
                        );
                      })}
                  </>
                );
              })
            : ""}
        </Box>
        <Box sx={{ height: "350px" }}>
          {/*    const {
                description,
                price,
                item_no,
                barcodeid,
                abbreviation,
                id,
              } = value; */}

          <DataGrid
            rows={ALLITEMS}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            style={{ width: "100%" }}
            onRowSelectionModelChange={(e) => {
              setChecked(e);
            }}
          />
        </Box>
        <ButtonComponent
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          name="Add"
          variant="contained"
          color={color.tertiary.main}
          width="200px"
          action={handleSaveNew}
          float="right"
          marginTop="20px"
          type={"submit"}
          icon={<AddCircleIcon />}
        />
        <br /> <br /> <br />
      </Box>
    </div>
  );
};
