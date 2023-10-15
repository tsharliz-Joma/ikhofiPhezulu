import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Stack, Button } from "react-bootstrap";
import "../App.css";

// import "./registrationForm.css";
// const backEndUserRegister = `https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/register`;
const backEndUserRegister = `http://localhost:1969/api/register`;

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch(backEndUserRegister, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
      className="font-monospace col-10 col-lg-3 mx-auto">
      <Form.Group className="mt-1">
        <Form.Label className="text-muted" htmlFor="name">
          Name
        </Form.Label>
        <Form.Control
          className="fw-bold py-3"
          onChange={handleInputChange}
          value={formData.name}
          id="name"
          name="name"
          type="text"
          placeholder="Enter Your Full Name"
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          className="fw-bold py-3"
          onChange={handleInputChange}
          value={formData.email}
          id="email"
          type="text"
          placeholder="Enter Your Email Address"
          name="email"
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label className="text-muted" htmlFor="mobile-number">
          Phone Number
        </Form.Label>
        <Form.Control
          className="fw-bold py-3"
          onChange={handleInputChange}
          value={formData.number}
          id="mobile-number"
          type="number"
          placeholder="Enter Mobile Number"
          name="number"
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label htmlFor="password">Password </Form.Label>
        <Form.Control
          className="fw-bold py-3"
          onChange={handleInputChange}
          value={formData.password}
          id="password"
          name="password"
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
