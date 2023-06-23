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
import { useNavigate } from "react-router-dom";
import { FTextField, FormProvider } from "../components/form";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
function MainHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const auth = useAuth();
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ padding: "5px" }}>
          <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <KeyboardReturnIcon
              sx={{ color: "#FB2576" }}
              onClick={() => navigate(-1)}
            />
          </IconButton>
          <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <Logo />
          </IconButton>
          <Typography variant="h7" component="div">
            Netflix & Chill
          </Typography>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit((q) => {
              q.search ? navigate("/search/" + q.search) : navigate("/");
            })}>
            <FTextField
              name="search"
              label="Seacrh"
              sx={{ left: 10, maxWidth: 300, input: { color: "white" } }}
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
          </FormProvider>
          <Box sx={{ flexGrow: 1, width: "20px" }} />

          <Stack direction="row" spacing={1} alignItems="center">
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
