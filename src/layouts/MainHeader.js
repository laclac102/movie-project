import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import Logo from "../components/Logo";

function MainHeader() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <Logo />
          </IconButton>
          <Typography variant="h6">Netflix and Chill</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography>Welcome</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
