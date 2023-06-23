import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const PRIMARY = {
  lighter: "#20262E",
  light: "#20262E",
  main: "#171b20",
  dark: "#20262E",
  darker: "#20262E",
  contrastText: "#FB2576",
};
const SECONDARY = {
  lighter: "#270082",
  light: "#270082",
  main: "#FB2576",
  dark: "#270082",
  darker: "#270082",
  contrastText: "#FDEFF4",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF",
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
    },
    shape: { borderRadius: 2 },
    typography: {
      h3: {
        fontSize: "1.2rem",
        "@media (min-width:600px)": {
          fontSize: "1.5rem",
        },
        breakpoints: {
          up: {
            fontSize: "2.rem",
          },
        },
      },
      h2: {
        fontSize: "2.5rem",
        "@media (max-width:400px)": {
          fontSize: "2rem",
        },
        breakpoints: {
          up: {
            fontSize: "2rem",
          },
        },
      },
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
