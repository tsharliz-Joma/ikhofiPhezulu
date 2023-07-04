import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

const backEndUserRegister = `http://localhost:1969/api/register`;

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

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
      navigate("/login");
    } else {
      console.error("error");
    }
  };

  return (
    <div className="create-user-div">
      <h1>Register</h1>
      <SignUpForm
        nm={name}
        handleName={handleName}
        em={email}
        handleEmail={handleEmail}
        ps={password}
        handlePassword={handlePassword}
        mn={mobileNumber}
        handleNumber={handleNumber}
        handleSubmit={registerUser}
      />
      <Link to="/" className="btn btn-outline-success">
        Home
      </Link>
    </div>
  );
};

export default SignUp;
