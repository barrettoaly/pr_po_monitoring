import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function ToggleButtonComponent({ data, value, onChange }) {
  return (
    <ToggleButtonGroup size="small" value={value} exclusive onChange={onChange}>
      {data.map((view, index) => (
        <ToggleButton key={index} value={view.value}>
          {view.icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ToggleButtonComponent;
