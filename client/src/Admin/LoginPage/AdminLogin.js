import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import LoginForm from "../../Forms/loginForm/LoginForm";
import Header from "../../components/Header/Header.component";

// const loginAdminUrl =
//   "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/adminLogin";
const loginAdminUrl = `http://localhost:1969/api/adminLogin`;

const AdminLogin = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    const currentAdmin = {
      user: name,
      pwd: password,
    };
    const response = await axios.post(loginAdminUrl, currentAdmin);
    const data = response.data;

    if (data.user) {
      sessionStorage.setItem("token", data.user);
      alert("Welcome");
      navigate("/dashboard");
    } else {
      alert("Please Check Your Spelling");
    }
  };

  return (
    <div>
      <h1>Coffee up admin</h1>
      <LoginForm />
    </div>
  );
};

export default AdminLogin;
