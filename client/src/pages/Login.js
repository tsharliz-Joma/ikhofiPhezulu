import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import * as io from "socket.io-client"

const backEndUserLogin = "http://localhost:1969/api/login";

const Login = (e) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {};
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const LoginUser = async (e) => {
    e.preventDefault();

    const currentUser = {
      email: email,
      password: password,
    };
    const response = await axios.post(backEndUserLogin, currentUser);
    const data = response.data;
    if (data.user) {
      localStorage.setItem("token", data.user);
      // socket.emit("user_active", data.user )
      alert("Login Successful");
      navigate("/order-coffee");
    } else {
      alert("Please Check your username and password");
    }
  };

  return (
    <div>
      <LoginForm onSubmit={LoginUser} email={email} e={handleEmail} password={password} p={handlePassword} />
      <Link to="/" className="btn btn-outline-success">
        Home
      </Link>
    </div>
  );
};

export default Login;
