import { useEffect, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import MuiChip from "../../Pages/MuiChip";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import norows from "../../Assets/norows.png";
import { GetRequest } from "../../API/api";

import { Typography } from "@mui/material";

const CAFList = ({ action, trigger, fundClusters, setFundClusters, prNo }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [filteredData, setFilteredData] = useState([]);

  const fetchDatas = () => {
    return GetRequest({ url: `/api/fundcluster` })
      .then((res) => {
        const {
          data: { data },
        } = res;
        setFundClusters(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDatas().finally(() => setIsLoading(false));
  }, []);

  //render the label of CAF
  const renderLabel = (data) => {
    // console.log(data);
    const date = new Date(data.created_at);
    const formattedDate = date.toLocaleDateString();

    return (
      <>
        <strong>{data.caf_number}</strong> ($
        {formattedDate})
      </>
    );
  };

  const filteredFundClusters = fundClusters.filter(
    (data) => data.pr_number === prNo
  );

  // {
  //   filteredFundClusters.map((data) => (
  //     <MuiChip
  //       label={renderLabel(data)}
  //       action={(e) => action(e, data)}
  //       variant="outlined"
  //       icon={<DownloadOutlinedIcon sx={{ marginLeft: "auto" }} />} // Use marginLeft: 'auto' to float the icon to the right
  //     />
  //   ));
  // }

  return (
    <div>
      {isLoading ? (
        <Box
          align="center"
          my={5}
          height={200}
          //   mt={forMCC ? 30 : 0}
        >
          <CircularProgress
            size={30}
            style={{
              // position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: "none",
            display: "flex", // Add display: flex to create a flex container
            gap: "8px", // Adjust the gap between chips as per your preference
            flexWrap: "wrap", // Allow chips to wrap to the next line if needed
            justifyContent: "center",
          }}
        >
          {filteredFundClusters.length >= 1 ? (
            filteredFundClusters.map((data) => (
              <MuiChip
                label={renderLabel(data)}
                action={(e) => action(e, data)}
                variant="outlined"
                icon={<DownloadOutlinedIcon sx={{ marginLeft: "auto" }} />} // Use marginLeft: 'auto' to float the icon to the right
              />
            ))
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={norows}
                alt="No rows"
                style={{ width: 70, boxShadow: 50 }}
              />

              <Typography
                fontSize={14}
                fontWeight={600}
                sx={{ mt: 1, color: "#969696" }}
              >
                Empty Attachements
              </Typography>
            </div>
          )}

          {/* {fundClusters.length >= 1 &&
            filteredFundClusters.map((data) =>
                <MuiChip
                  label={renderLabel(data)}
                  action={(e) => action(e, data)}
                  variant="outlined"
                  icon={<DownloadOutlinedIcon sx={{ marginLeft: "auto" }} />} // Use marginLeft: 'auto' to float the icon to the right
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={norows}
                    alt="No rows"
                    style={{ width: 70, boxShadow: 50 }}
                  />

                  <Typography
                    fontSize={14}
                    fontWeight={600}
                    sx={{ mt: 1, color: "#969696" }}
                  >
                    Empty Attachements
                  </Typography>
                </div>
              )
            )} */}
        </Box>
      )}
    </div>
  );
};

export default CAFList;
