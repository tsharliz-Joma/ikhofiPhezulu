import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";

const loginAdminUrl = "http://localhost:1969/api/adminLogin";

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
      localStorage.setItem("token", data.user);
      alert("Welcome");
      navigate("/dashboard");
    } else {
      alert("Please Check Your Spelling");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={LoginUser}>
        <div>
          <div className="input-box">
            <label htmlFor="email" className="details">
              Name:
              <input
                onChange={handleName}
                value={name}
                id="name"
                type={"text"}
                placeholder="Enter Your Name"
              />
            </label>
          </div>
          <div className="input-box">
            <label htmlFor="pwd" className="details">
              Password:
              <input
                onChange={handlePassword}
                value={password}
                placeholder="Password"
              />
            </label>
          </div>
        </div>
        <button className="btn btn-outline-warning">Login</button>
      </form>
      <Link to={"/"} className="btn btn-outline-danger">
        Home
      </Link>
    </div>
  );
};

export default AdminLogin;
