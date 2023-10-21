import { CssBaseline, Typography } from "@mui/material";

import AnimatedRoutes from "./Routes/AnimatedRoutes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RaleWayRegular from "../src/Style/fonts/Raleway-Regular.woff";
import "react-toastify/dist/ReactToastify.css";
import { useController } from "./Context/DataContext";

function App() {
  const { LogoutUser } = useController();
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#ADB7D7",
        lightPurple: "#ECF1FF",
        lightGray: "#F5F5F5",
        gray: "#969696",
      },
      myPrimary: {
        main: "#ffff",
      },

      tertiary: {
        main: "#0E185F",
        success: "#4BB543",
        successDark: "#539165",
        error: "#E74646",
        warning: "#E57C23",
      },
      fonts: {
        heading: `'Raleway', sans-serif`,
        body: `'Raleway', sans-serif`,
      },
      sidebarColor: {
        neutral: "#6E768A",
        active: "#986FF6",
        heading: "#A4A8C3",
        onhover: "#F7F7F9",
      },
      chartColor: {
        blue: "#165BAA",
        purple: "#A155B9",
        pink: "#F765A3",
      },
    },
    typography: {
      fontFamily: "Raleway, Arial", // specify the default font family
      fontSize: 14, // specify the default font size
      // you can also override individual font styles like h1, h2, etc.
      h1: {
        fontFamily: "Raleway",
        fontWeight: 800,
        fontSize: 48,
        lineHeight: 1.5,
      },
      h2: {
        fontFamily: "Raleway",
        fontWeight: 700,
        fontSize: 36,
        lineHeight: 1.5,
      },
      sidehead: {
        fontFamily: "Raleway",
        fontWeight: 800,
        fontSize: 15,
        lineHeight: 1.5,
      },
      sidebarfont: {
        fontFamily: "Raleway",
        fontWeight: 500,
        fontSize: 12,
        lineHeight: 1.5,
      },
      // and so on for other typography variants
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Raleway';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Raleway'), local('Raleway-Regular'), url(${RaleWayRegular}) format('woff');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography>
        <AnimatedRoutes />
      </Typography>
    </ThemeProvider>
  );
}

export default App;
