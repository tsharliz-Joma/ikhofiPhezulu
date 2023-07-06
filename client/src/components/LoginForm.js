import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h1>Login</h1>
      {/* <LoginForm
        onClick={handleSubmit}
        onSubmit={LoginUser}
        email={email}
        password={password}
      /> */}
      <form onSubmit={LoginUser}>
        <div>
          <div className="input-box">
            <label htmlFor="email" className="details">
              Username:
              <input
                onChange={handleEmail}
                value={email}
                id="email"
                type={"text"}
                placeholder="Enter Your Email"
              />
            </label>
          </div>
          <div className="input-box">
            <label htmlFor="password" className="details">
              Password:
              <input
                onChange={handlePassword}
                value={password}
                id="password"
                type={"password"}
                placeholder="Enter Password"
              />
            </label>
          </div>
        </div>
        <button className="btn btn-outline-success">Login</button>
      </form>
    </div>
  );
};
export default LoginForm;
