import { Chip, Avatar } from "@mui/material";
import { Circle } from "@mui/icons-material";

export const status = (params, role, newTransRecords) => {
  let label = "";
  let color = "";
  let bgColor = "";
  let result = "";

  const inprocess = () => {
    label = "In Process";
    color = "#526D82";
    bgColor = "#E3F2C1";
    return { label, color, bgColor };
  };

  const pending = () => {
    label = "Pending";
    color = "#C07F00";
    bgColor = "#FCFFB2";
    return { label, color, bgColor };
  };

  const returned = () => {
    label = "Returned";
    color = "#FF6666";
    bgColor = "#FFEADD";
    return { label, color, bgColor };
  };

  const completed = () => {
    label = "Completed";
    color = "#1A5D1A";
    bgColor = "#E9FFC2";
    return { label, color, bgColor };
  };
  const byDefault = ({ label, color, bgcolor }) => {
    label = label ? label : "pending";
    color = color ? color : "#146C94";
    bgColor = bgcolor ? bgcolor : "#EAFDFC";

    return { label, color, bgcolor };
  };

  const ValidateStatus = ({ label, color, bgcolor }) => {
    if (role == 7) {
      if (label == "For Procurement Approval") {
        if (params.row.status == 5) {
          result = returned();
        } else {
          result = inprocess();
        }
      } else {
        if (params.row.status_desc == "cancelled") {
          result = byDefault({
            label: "Cancelled",
            color: "#FF6666",
            bgcolor: "#FCAEAE",
          });
        } else {
          if (params.row.status == 3) {
            result = inprocess();
          } else if (params.row.status == 5) {
            result = returned();
          } else {
            result = pending();
          }
        }
      }
    } else {
      if (newTransRecords) {
        if (
          newTransRecords.filter((x) => x.FK_PR_relation == params.id).length >=
          1
        ) {
          if (params.row.status == 5) {
            result = returned();
          } else {
            if (params.row.onBid == 1) {
              result = byDefault({
                label: "On Bidding",
                color: "#1F8A70",
                bgcolor: "#1F8A70",
              });
            } else {
              result = inprocess();
            }
          }
        } else {
          if (params.row.pr_status == "On Returned") {
            result = byDefault({
              label: label,
              color: "#F86F03",
              bgcolor: "#FFEADD",
            });
          } else if (params.row.pr_status == "Returned") {
            result = returned();
          } else if (params.row.status_desc == "cancelled") {
            result = byDefault({
              label: "Cancelled",
              color: "#FF6666",
              bgcolor: "#FCAEAE",
            });
          } else {
            if (params.row.status == 3) {
              if (params.row.onBid == 1) {
                result = byDefault({
                  label: "On Bidding",
                  color: "#1F8A70",
                  bgcolor: "#1F8A70",
                });
              } else {
                result = inprocess();
              }
            } else {
              if (role == 4) {
                if (params.row.status == null) {
                  result = pending();
                } else {
                  result = byDefault({ label: label, color: "", bgcolor: "" });
                }
              } else {
                if (params.row.pr_status == "RE-APPROVAL") {
                  result = byDefault({
                    label: "For RE-APPROVAL",
                    color: "#F29727",
                    bgcolor: "#FFB07F",
                  });
                } else {
                  result = byDefault({ label: label, color: "", bgcolor: "" });
                }
              }
            }
          }
        }
      } else {
        if (params.row.status_desc == "cancelled") {
          result = byDefault({
            label: "Cancelled",
            color: "#FF6666",
            bgcolor: "#FCAEAE",
          });
        } else {
          if (params.row.onBid == 1) {
            result = byDefault({
              label: "On Bidding",
              color: "#1F8A70",
              bgcolor: "#1F8A70",
            });
          } else {
            if (params.row.pr_status == "Completed") {
              result = completed();
            } else {
              if (params.row.status == null) {
                result = pending();
              } else {
                console.log(params.row);
                result = byDefault({ label: label, color: "", bgcolor: "" });
              }
            }
          }
        }

        //result = inprocess();
      }
    }
  };

  switch (params.value) {
    case "PENDING":
      result = byDefault("For MMS approval");
      break;
    default:
      ValidateStatus({ label: params.value });
      break;
  }

  return (
    <>
      <Chip
        label={result.label}
        sx={{
          bgcolor: result.bgColor,
          color: result.color,
          fontSize: 11,
          letterSpacing: 1,
        }}
        avatar={
          <Avatar style={{ backgroundColor: bgColor }}>
            <Circle style={{ color: result.color, fontSize: 8 }} />
          </Avatar>
        }
        size="small"
      />
    </>
  );
};
