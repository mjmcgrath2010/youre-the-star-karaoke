import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#031054",
    },
    secondary: {
      main: "#c300bf",
      dark: "#92238f",
    },
    error: {
      main: "#c62828",
    },
    warning: {
      main: "#ef6c00",
    },
    info: {
      main: "#64b5f6",
    },
    success: {
      main: "#2e7d32",
    },
  },
  typography: {
    h2: {
      fontFamily: "Montserrat",
    },
    h1: {
      fontFamily: "Montserrat",
    },
    h3: {
      fontFamily: "Montserrat",
    },
    h4: {
      fontFamily: "Montserrat",
    },
    h5: {
      fontFamily: "Montserrat",
    },
    h6: {
      fontFamily: "Montserrat",
    },
    subtitle1: {
      fontFamily: "Raleway",
      fontWeight: 300,
    },
    subtitle2: {
      fontFamily: "Raleway",
      fontWeight: 300,
    },
    body1: {
      fontFamily: "Lato",
    },
    body2: {
      fontFamily: "Lato",
    },
    button: {
      fontFamily: "Montserrat",
      fontWeight: 700,
    },
    caption: {
      fontFamily: "Slabo 27px",
      fontWeight: 600,
    },
    overline: {
      fontFamily: "Droid Serif",
      fontWeight: 600,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
};
const lightTheme = createTheme(themeOptions);

export default lightTheme;
