import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Divider } from "@mui/material";
import { Completed } from "./Completed";
import moment from "moment";
export const TList = ({ translogs }) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: "90vh",
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {translogs.map((trans, index) => (
        <li key={`section-${trans.id}`} style={{ marginBottom: "50px" }}>
          <ul>
            <ListSubheader>
              {
                <>
                  <h4>
                    <div
                      style={{
                        fontSize: "10px",
                        marginBottom: "-24px",
                      }}
                    >
                      Approved By:
                    </div>
                    {`${trans.fname} ${trans.lname} ( ${trans.role} )`}
                    <br />
                    <div
                      style={{
                        fontSize: "11px",
                        marginTop: "-28px",
                      }}
                    >
                      {moment(trans.created_at).format("MMMM D YYYY, h:mm a")}
                    </div>
                    <div style={{ marginTop: "-20px", color: "#19A7CE" }}>
                      {trans.to}
                    </div>
                  </h4>
                </>
              }
            </ListSubheader>

            <ListItem
              key={`item-${trans.id}-${4}`}
              sx={{ backgroundColor: "#F8F6F4" }}
            >
              <ListItemText
                primary={
                  <>
                    <Completed trans={trans} />
                  </>
                }
                sx={{ cursor: "pointer" }}
              />
            </ListItem>
          </ul>
          <Divider />
        </li>
      ))}
    </List>
  );
};
