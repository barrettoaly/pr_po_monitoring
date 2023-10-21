import React from "react";
import { Chip } from "@mui/material";

const MuiChip = ({ variant, label, icon, action, onDelete }) => {
  return (
    <div>
      <Chip
        variant={variant}
        label={label}
        onClick={action}
        onDelete={onDelete}
        icon={icon}
      />
    </div>
  );
};

export default MuiChip;
