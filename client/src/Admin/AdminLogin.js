import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import jwt from "jsonwebtoken";
import './admin.css'

const loginAdminUrl =
  "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/adminLogin";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // const adminLoginContainer = useRef(HTMLDivElement)

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
    <div id={"admin_login_container"}>
      <div id="admin_header"></div>
      <div id="admin_h_container">
        <p id="admin_h">Table Talk Admin</p>
      </div>
      <div id="circ"></div>
      <form onSubmit={LoginUser} id="admin_login_form">
        <div id="admin_login_form_inner">
          <div className="admin_input_box">
            <label htmlFor="email" className="details">
              Email:
            </label>
            <input
              onChange={handleName}
              value={name}
              id="name"
              type={"text"}
              placeholder="Enter Your Name"
            />
          </div>
          <div className="admin_input_box">
            <label htmlFor="pwd" className="details">
              Password:
            </label>
            <input
              onChange={handlePassword}
              value={password}
              placeholder="Password"
            />
          </div>
        </div>
        <div id="admin_btn_div">
          <button className="admin_btn">
            Login
          </button>
        </div>
      </form>
      <div id="admin_footer"></div>
    </div>
  );
};

export default AdminLogin;
