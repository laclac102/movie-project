import { Stack } from "@mui/material";
import React from "react";
import Logo from "../components/Logo";
import styled from "@emotion/styles";
import { Outlet } from "react-router-dom";

const HeaderStyle = styled("header")(({ theme }) => ({
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  position: "absolute",
}));

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <HeaderStyle>
        <Logo sx={{ width: 70, height: 70 }} />
      </HeaderStyle>
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
