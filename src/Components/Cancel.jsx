import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Badge from "@mui/material/Badge";
import { Info } from "@mui/icons-material";
import { Box } from "@mui/material";
import moment from "moment";
import { status } from "../Functions/status";
import CustomDataTable from "./MUItable/CustomDataTable";
export const Cancel = ({ color, rowsCancelled, user, handleRowClick }) => {
  const columnsCancelled = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "header-class",
    },
    {
      field: "pr_no",
      headerName: "PR No.",
      headerClassName: "header-class",
      flex: 1,
    },
    {
      field: "pr_date",
      headerName: "PR Date",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {moment(params.value).format("LL")}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "requester",
      headerName: "Requested by",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },
    {
      field: "name",
      headerName: "Requesting Department",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
      flex: 1.5,
    },
    {
      field: "timestamp",
      headerName: "Cancelled Date",
      headerClassName: "header-class",
      renderCell: (params) => (
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          {moment(params.value).format("MMMM D YYYY, h:mm a")}
        </Typography>
      ),
      flex: 1.5,
    },
    {
      field: "status_desc",
      headerName: "Status",
      headerClassName: "header-class",
      renderCell: (params) => <>{status(params, user.role)}</>,
      flex: 1,
    },
  ];

  return (
    <div>
      <Accordion defaultExpanded={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Badge badgeContent={rowsCancelled.length} color="error">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 18,
                color: color.tertiary.main,
                px: 2,
                py: 1,
              }}
            >
              <span style={{ color: "#FF6666" }}>Cancelled</span> Purchase
              Requests
            </Typography>
            <br />
          </Badge>
        </AccordionSummary>
        <Box display="flex" sx={{ justifyContent: "space-between" }} pb={3}>
          <Box display="flex" px={2} justifyItems="center" gap={1}>
            <Info fontSize="12" sx={{ color: color.secondary.gray }} />
            <Typography
              fontSize={12}
              fontWeight={500}
              color={color.secondary.gray}
            >
              The list of Purchase Requests cancelled by your department.
            </Typography>
          </Box>
        </Box>
        <AccordionDetails>
          <CustomDataTable
            rows={rowsCancelled}
            columns={columnsCancelled}
            pageSize={5}
            onRowClick={(e) => {
              handleRowClick(e);
            }}
            checkboxSelection={user.role === 4 ? true : false}
            onRowSelectionModelChange={(id) => {
              //  setSelectedRows2(id);
              handleCheck(id);
            }}
            rowSelectionModel={[]}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
