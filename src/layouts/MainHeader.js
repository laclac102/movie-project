import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { Avatar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MainHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const auth = useAuth();
  console.log(logout);
  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div">
            Netflix & Chill
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: "#FB2576" }}>
              {user?.username.charAt(0).toUpperCase()}
            </Avatar>
            <LogoutIcon
              color="secondary"
              variant="outlined"
              sx={{ marginLeft: "5px" }}
              onClick={() => {
                auth.logout(() => navigate("/"));
              }}
            />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
