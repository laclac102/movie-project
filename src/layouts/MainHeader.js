import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { Avatar, InputAdornment, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { FTextField, FormProvider } from "../components/form";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";

function MainHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const auth = useAuth();
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit((q) => {
        q.search ? navigate("/search/" + q.search) : navigate("/");
      })}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div">
            Netflix & Chill
          </Typography>
          <FTextField
            name="search"
            label="Seacrh"
            sx={{ left: 10, maxWidth: 300 }}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LoadingButton type="submit">
                    <SearchIcon color="secondary" />
                  </LoadingButton>
                </InputAdornment>
              ),
            }}
          />
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
    </FormProvider>
  );
}

export default MainHeader;
