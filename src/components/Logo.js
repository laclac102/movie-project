import React from "react";
import logoImage from "../xingau.svg";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={logoImage} alt="logo" width="100%" />
    </Box>
  );
  if (disabledLink) {
    return <>{logo}</>;
  }
  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
