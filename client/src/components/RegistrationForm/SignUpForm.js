import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registrationForm.css";
const backEndUserRegister = `http://localhost:1969/api/register`;

const SignUpForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);


  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleNumber = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await fetch(backEndUserRegister, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        mobileNumber,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      // I want a new state here, then i set a timeout, the new state will hold an overlay
      // this overlay div will play the animation of a coffee pouring and then it will redirect to the 
      // login page
      navigate("/");
    } else {
      console.error("error");
    }
  };
  return (
    <div id="regFormCon">
      <div id="regFormInner">
        <form id="regForm" onSubmit={registerUser}>
          <div className="Header">
            <p id="r-text">Registration Station</p>
          </div>
          <div className="input_container">
            <div className="reg_input_box">
              <label htmlFor="name">Name: </label>
              <input
                onChange={handleName}
                value={name}
                id="name"
                type="text"
                placeholder="Enter Your Full Name"
              />
            </div>
            <div className="reg_input_box">
              <label htmlFor="email">Email:</label>
              <input
                className="focusedBorder"
                onChange={handleEmail}
                value={email}
                id="email"
                type="text"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="reg_input_box">
              <label htmlFor="mobile-number">Phone Number:</label>
              <input
                onChange={handleNumber}
                value={mobileNumber}
                id="mobile-number"
                type="text"
                placeholder="Enter Mobile Number"
              />
            </div>
            <div className="reg_input_box">
              <label htmlFor="password">Password: </label>
              <input
                onChange={handlePassword}
                value={password}
                id="password"
                type={"password"}
                placeholder="Enter a Password"
              />
            </div>
            <div id="reg_btn_div">
              <button id="registerButton">Register</button>
              <Link to="/" className="btn" id="back_btn">
                Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
