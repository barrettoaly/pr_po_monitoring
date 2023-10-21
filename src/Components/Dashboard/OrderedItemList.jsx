import { Box, Icon, Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";

const OrderedItemList = ({
  withIcon,
  name,
  count,
  icon,
  bgColor,
  textColor,
  value,
}) => {
  const theme = useTheme();
  return (
    <Tooltip title={`Total orders: ${value}`} arrow>
      <Box display="flex" alignItems={"center"}>
        <Box backgroundColor={bgColor} borderRadius={50} width={35} height={34}>
          <Typography
            align="center"
            pt={0.6}
            color={textColor}
            fontWeight={600}
            fontSize={15}
          >
            {count}
          </Typography>
        </Box>
        <Box>
          <Typography fontWeight={600} ml={3} fontSize={14}>
            {name}
          </Typography>
        </Box>
        {withIcon ?? ""}
      </Box>
    </Tooltip>
  );
};

export default OrderedItemList;
