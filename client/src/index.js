import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import App from "./App";
import OrderPage from "./pages/order/OrderPage";
import AdminSignUp from "./pages/admin/signUpPage/Page";
import AdminLogin from "./pages/admin/loginPage/Page";
import Dashboard from "./pages/dashboard/Dashboard";
import LoginPage from "./pages/login/LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SignUpPage from "./pages/signup/SignupPage";
import { ThemeProvider, createTheme } from "@mui/material";
import { ContextProvider } from "./context/ContextProvider";
import { DisplayUserPage } from "./pages/displayUser/DisplayUserPage";

// const socket = io(
//   "https://ikhofiphezulu-server-19652a0dabe7.herokuapp.com",
// );
const socket = io("http://localhost:1969");

const themeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#f2e2c5",
      light: "rgb(242, 171, 96)",
      dark: "rgb(167, 105, 39)",
      white: "#FFF",
    },
    secondary: {
      main: "#ef9739",
      light: "rgb(244, 231, 208)",
      dark: "rgb(169, 158, 137)",
    },
    info: {
      main: "#2196f3",
      dark: "#00473d",
      light: "#a9fbda",
    },
  },
  typography: {
    fontsize: 14,
    fontFamily: "IBM Plex Mono",
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
            <Routes>
              <Route
                // @ts-ignore
                exact
                path="/"
                element={
                  <ThemeProvider theme={theme}>
                    <App socket={socket} />
                  </ThemeProvider>
                }
              />
              <Route path="/display-user" element={<DisplayUserPage />} />
              <Route path="/order-coffee" element={<OrderPage socket={socket} />} />
              <Route path="/register" element={<SignUpPage />} />
              <Route path="/adminRegister" element={<AdminSignUp />} />
              <Route path="/adminLogin" element={<AdminLogin />} />
              <Route path="/dashboard" element={<Dashboard socket={socket} />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </ContextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
