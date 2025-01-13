import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import App from "./App";
import AdminLogin from "./pages/admin/loginPage/Page";
import Dashboard from "./pages/dashboard/Page";
import LoginPage from "./pages/user/loginPage/Page";
import MenuPage from "./pages/menu/Page";
import PasswordProtection from "./modules/passwordProtection/PasswordProtection";
import ProtectedRoute from "./modules/protectedRoute/ProtectedRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import CssBaseline from "@mui/material/CssBaseline";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material";
import { ContextProvider } from "./context/ContextProvider";
import CartPage from "./pages/cart/Page";

const socket = io(process.env.REACT_APP_SOCKET);

const themeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#f2e2c5",
      light: "rgb(242, 171, 96)",
      dark: "rgb(167, 105, 39)",
      contrastText: "#FFF",
      black: "#000",
    },
    secondary: {
      main: "#ef9739",
      light: "rgb(244, 231, 208)",
      dark: "rgb(169, 158, 137)",
      contrastText: "#000",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
    },
    info: {
      main: "#2196f3",
      dark: "#00473d",
      light: "#a9fbda",
    },
    error: {
      main: "#CF6679",
    },
    warning: {
      main: "#FFC107",
    },
    success: {
      main: "#4CAF50",
    },
  },
  typography: {
    fontFamily: "IBM Plex Mono, sans-serif",
    fontSize: 14,
    h1: { fontSize: "2.25rem", fontWeight: 700 },
    h2: { fontSize: "1.875rem", fontWeight: 600 },
    h3: { fontSize: "1.5rem", fontWeight: 500 },
    h4: { fontSize: "1.25rem", fontWeight: 500 },
    h5: { fontSize: "1rem", fontWeight: 500 },
    h6: { fontSize: "0.875rem", fontWeight: 500 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#1E1E1E",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            color: "#B3B3B3",
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);
const root = ReactDOM.createRoot(document.getElementById("root"));
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(link);

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GCLI_ID}>
    <React.StrictMode>
      <ContextProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  // @ts-ignore
                  exact
                  path="/"
                  element={
                    <>
                      <CssBaseline />
                      <App socket={socket} />
                    </>
                  }
                />
                <Route path={"/cart"} element={<CartPage />} />
                <Route
                  path="/menu"
                  element={
                    <>
                      <CssBaseline />
                      <MenuPage socket={socket} />
                    </>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <PasswordProtection>
                      <CssBaseline />
                      <AdminLogin />
                    </PasswordProtection>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <CssBaseline />
                      <Dashboard socket={socket} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <>
                      <CssBaseline />
                      <LoginPage />
                    </>
                  }
                />
              </Routes>
            </AnimatePresence>
          </ThemeProvider>
        </BrowserRouter>
      </ContextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
