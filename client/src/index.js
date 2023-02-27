import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import Order  from "./components/Order"
import SignUp from './Login/SignUp';
import Login from './Login/Login.js';
import AdminSignUp from './AdminPages/AdminSignUp';
import AdminLogin from './AdminPages/AdminLogin';
import Dashboard from './AdminPages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/order-coffee" element={<Order />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/adminRegister" element={<AdminSignUp />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path='/dashboard' element={<Dashboard />} /> 
        <Route path='/login' element={<Login />} />
        {/* <App /> */}
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);
