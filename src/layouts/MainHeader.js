import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import {
  Avatar,
  Badge,
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FTextField, FormProvider } from "../components/form";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import QueueIcon from "@mui/icons-material/Queue";
import styled from "@emotion/styled";
import apiService from "../api/apiService";
import MoreIcon from "@mui/icons-material/MoreVert";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function MainHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const auth = useAuth();
  const methods = useForm();
  const { handleSubmit } = methods;
  //Check for movie in favorite list
  const [result, setResult] = React.useState();
  React.useEffect(() => {
    const fetch = async () => {
      try {
        //Fetch favorite list
        const favorite = await apiService.get(
          `/account/20024063/favorite/movies?language=en-US`,
          {
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWU3MzBmZjQ5ZWEzNmU0MjcxYjA0NzkyZDg0M2IwYSIsInN1YiI6IjY0OGQ1NDYyNTU5ZDIyMDBhZDgxZDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QQEI7vSospxCzaxNtKVqm9CvyjKz_pzKmkatm1LZVAM",
            },
          }
        );
        const favList = favorite.data.results;
        setResult(favList);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetch();
  }, []);
  //Responsive menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem
        onClick={() => {
          auth.logout(() => navigate("/"));
        }}>
        Log out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      {result && result.length > 0 && (
        <MenuItem>
          <Badge badgeContent={result.length} color="primary">
            <QueueIcon
              color="secondary"
              onClick={() => navigate("/favorite")}
            />
          </Badge>
          <p style={{ marginLeft: 5 }}>Favorite playlist</p>
        </MenuItem>
      )}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <Avatar sx={{ bgcolor: "#FB2576" }}>
            {user?.username.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
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
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <MenuItem>
              {result && result.length > 0 && (
                <Badge badgeContent={result.length} color="noti">
                  <Tooltip title="Favorite playlist">
                    <QueueIcon
                      sx={{ width: "20px" }}
                      onClick={() => navigate("/favorite")}
                    />
                  </Tooltip>
                </Badge>
              )}
            </MenuItem>
            <Stack direction="row" spacing={1} alignItems="center">
              <MenuItem>
                <Avatar sx={{ bgcolor: "#FB2576" }}>
                  {user?.username.charAt(0).toUpperCase()}
                </Avatar>
              </MenuItem>

              <MenuItem>
                <Tooltip title="Log out">
                  <LogoutIcon
                    color="secondary"
                    variant="outlined"
                    sx={{ marginLeft: "5px" }}
                    onClick={() => {
                      auth.logout(() => navigate("/"));
                    }}
                  />
                </Tooltip>
              </MenuItem>
            </Stack>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon color="secondary" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default MainHeader;
