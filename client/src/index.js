import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Order from "./OrderForm/Order-Page";
import AdminSignUp from "./Admin/AdminSignUp";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Pages/Dashbaord/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import * as io from "socket.io-client";
import LoginForm from "./LoginForm/LoginForm";
import SignUpPage from "./SignupForm/SignUp";

// const msalInstance = new PublicClientApplication(msalConfig);

const socket = io.connect("http://localhost:1969/");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
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
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
