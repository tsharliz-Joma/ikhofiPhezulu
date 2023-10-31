import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Order from "./OrderForm/Order-Page";
import AdminSignUp from "./Admin/AdminSignUp";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Pages/Dashbaord/Dashboard";
import { GoogleOAuthProvider } from '@react-oauth/google'
import "bootstrap/dist/css/bootstrap.min.css";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import * as io from "socket.io-client";
// import LoginForm from "./LoginForm/LoginForm";
import SignUpPage from "./SignupForm/SignUp";
import { ThemeProvider, createTheme } from "@mui/material";


const socket = io.connect(
  "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com",
);
// const socket = io.connect("http://localhost:1969");

const themeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#f2e2c5",
      light: "rgb(242, 171, 96)",
      dark: "rgb(167, 105, 39)",
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
    
  },
};

const theme = createTheme(themeOptions)

const root = ReactDOM.createRoot(document.getElementById("root"));
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(link);

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GCLI_ID}>
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              // @ts-ignore
              exact
              path="/"
              element={<App />}
            />
            <Route path="/order-coffee" element={<Order socket={socket} />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/adminRegister" element={<AdminSignUp />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard socket={socket} />} />
            <Route path="/login" element={<App />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>,
);
