import React from "react";
import ReactToPrint from "react-to-print";
import ButtonComponent from "./ButtonComponent";
import { Button } from "@mui/material";
import { Print } from "@mui/icons-material";

const PrintButton = ({ printableRef }) => {
  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <Button
            sx={{
              borderRadius: 2,
              border: "1px solid #1976d2",
              color: "#1976d2", // Optional, this sets the text color to white
              textTransform: "capitalize",
              borderRadius: 10,
            }}
            variant="outline"
            startIcon={<Print />}
          >
            Print
          </Button>
          //   <ButtonComponent name="Print" action={printableRef} />
        )}
        pageStyle={`@page { margin: 0.5cm; }`}
        content={() => printableRef.current}
        documentTitle={"Purchase Request"}
      />
    </div>
  );
};

export default PrintButton;
