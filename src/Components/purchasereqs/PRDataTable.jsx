import React, { useEffect, useState } from "react";
import { Box, Chip, Typography, Avatar, CircularProgress } from "@mui/material";
import "../../Style/data-table.css";
import { useNavigate, useParams } from "react-router-dom";
import CustomDataTable from "../MUItable/CustomDataTable";
import { GetRequest, PostRequest } from "../../API/Api";
import moment from "moment";
import Lottie from "react-lottie";
import animationData from "../../Assets/animation/38171-status.json";
import { Circle } from "@mui/icons-material";
import { status } from "../../Functions/status";
import StepperEnduser from "../../Pages/StepperEnduser";
import { useController } from "../../Context/DataContext";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const statusToStep = {
  [`PENDING`]: 1,
  [`Approve by MMS`]: 2,
  [`Approve by Procurement`]: 3,
  [`Approve by Budget`]: 4,
  [`Approve by Accounting`]: 5,
  [`Approve by Finance`]: 6,
  [`On Bidding`]: 7,
  [`COMPLETE`]: 8,
};

const activeStep = statusToStep[status] || "";

function DataTable({ enduser }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { user } = useController();
  const [name, setName] = useState("");
  const [stepperData, setStepperData] = useState(null);
  const [activeSteps, setActiveSteps] = useState(1);
  const fetchPR = () => {
    GetRequest({ url: "/api/pr_relation/UsersPR" })
      .then((res) => {
        console.log(JSON.stringify(res.data.data, null, 2))
        const {
          data: { data },
        } = res;
        setRows(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  // const handleRowClick = (params, event) => {
  //   const prno = params.row.pr_no;
  //   const relid = params.row.id;
  //   navigate(`/track-pr/${params.id}`, {
  //     state: {
  //       date: "sample date",
  //       name: "sample name",
  //       prno: prno,
  //       relid: relid,
  //     },
  //   });
  // };

  const handleClickStepper = (step) => {
    setActiveSteps(step.id);
    // if (step.id !== 0) {
    //   GetRequest({ url: `/api/pr_relation/${step.id}` }).then((res) => {
    //     const data = res.data.data;
    //     const filteredRows = data.filter(
    //       (item) => item.stageID === (step.id == 1 ? null : step.id)
    //     );

    //     setRows(filteredRows);
    //   });
    // } else {
    //   fetchPR();
    // }
  };

  const handleRowClick = (params) => {
    const prno = params.row.pr_no;
    const relid = params.row.id;
    const data = params.row;
    console.log(data);
    navigate(`/track-pr/${params.id}`, { state: { name, prno, relid, data } });
  };

  const fetchStepperData = () => {
    ///TESTING PRID 31
    GetRequest({ url: `/api/pr_stage` }).then((res) => {
      setStepperData(res.data.data);
    });
  };
  useEffect(() => {
    fetchPR();
    fetchStepperData();
  }, []);

  const columns = [
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
      field: "pr_status",
      headerName: "Status",
      headerClassName: "header-class",
      renderCell: (params) => <>{status(params, user.role)}</>,
      flex: 1,
    },
  ];

  return (
    <div>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress
            size={50}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      ) : (
        <>
          <Box style={{ paddingBottom: "1rem" }}>
            <StepperEnduser
              enduser={enduser}
              activeStep={activeStep}
              orientation="horizontal"
              onTouch={handleClickStepper}
              rows={rows}
              stepperData={stepperData}
            />
          </Box>
          <CustomDataTable
            rows={rows.filter(x => x.stageID == activeSteps - 1 || activeSteps == 1)}
            columns={columns}
            onRowClick={handleRowClick}
            columnVisibilityModel={{ id: false }}
            pageSize={15}
          />
        </>
      )}
    </div>
  );
}

export default DataTable;
