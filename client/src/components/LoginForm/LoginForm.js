import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './LoginForm.css'

const backEndUserLogin = "http://localhost:1969/api/login";

const LoginForm = () => {

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
    <div id="LoginFormContainer">
      <form onSubmit={LoginUser}>
        <div>
          <div className="input-box">
            <label htmlFor="email" className="details">
              Work Email{" "}
            </label>
            <input
              onChange={handleEmail}
              value={email}
              id="email"
              type={"text"}
              placeholder="Email"
            />
          </div>
          <div className="input-box">
            <label htmlFor="password" className="details"></label>
            <input
              onChange={handlePassword}
              value={password}
              id="password"
              type={"password"}
              placeholder="Password"
            />
          </div>
        </div>
        <button id="LoginButton">Login</button>
      </form>
    </div>
  );
};
export default LoginForm;
