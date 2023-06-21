import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function MainFooter() {
  return (
    <Typography variant="body2" sx={{ color: "white" }} align="center" p={1}>
      {"Copyright © "}
      <Link style={{ color: "#FB2576" }} href="https://github.com/laclac102">
        XingauLag
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;
