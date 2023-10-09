import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Stack, Button } from "react-bootstrap";
import '../App.css'

// import "./registrationForm.css";
const backEndUserRegister = `https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/register`;

const SignUpForm = () => {
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
      // I want a new state here, then i set a timeout, the new state will hold an overlay
      // this overlay div will play the animation of a coffee pouring and then it will redirect to the
      // login page
      navigate("/");
    } else {
      console.error("error");
    }
  };

  return (
    <Form
      onSubmit={registerUser}
      className="font-monospace col-10 col-lg-4 mx-auto">
      <Form.Group className="mt-1">
        <Form.Label className="text-muted" htmlFor="name">
          Name
        </Form.Label>
        <Form.Control
          className="fw-bold py-3"
          onChange={handleName}
          value={name}
          id="name"
          type="text"
          placeholder="Enter Your Full Name"
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          className="fw-bold py-3"
          onChange={handleEmail}
          // value={email}
          id="email"
          type="text"
          placeholder="Enter Your Email Address"
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label className="text-muted" htmlFor="mobile-number">
          Phone Number
        </Form.Label>
        <Form.Control
          className="fw-bold py-3"
          onChange={handleNumber}
          value={mobileNumber}
          id="mobile-number"
          type="text"
          placeholder="Enter Mobile Number"
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label htmlFor="password">Password </Form.Label>
        <Form.Control
          className="fw-bold py-3"
          onChange={handlePassword}
          value={password}
          id="password"
          type={"password"}
          placeholder="Enter a Password"
        />
      </Form.Group>
      <Stack className="my-4">
        <Button type="submit" className="dropShadow cappuccino btn py-3 my-4">
          Register
        </Button>
        <Link to="/" className="btn bean py-3">
          Back
        </Link>
      </Stack>
    </Form>
  );
};

export default SignUpForm;
