import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Order from "./pages/Order";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AdminSignUp from "./admin_pages/AdminSignUp";
import AdminLogin from "./admin_pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:1969/")

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/order-coffee" element={<Order socket={socket} />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/adminRegister" element={<AdminSignUp />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard socket={socket} />} />
          <Route path="/login" element={<Login />} />
          {/* <App /> */}
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
