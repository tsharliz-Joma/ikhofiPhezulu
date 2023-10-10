// @ts-nocheck
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";
import SpinnerComponent from "../components/Spinner/Spinner.component";
// React-Bootstrap
import { Button, Form } from "react-bootstrap";

// const backEndUserLogin =
//   "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/login";
const backEndUserLogin = "http://localhost:1969/api/login";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    const currentUser = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await axios
        .post(backEndUserLogin, currentUser)
        .then(setLoading(true));
      const data = response.data;
      if (data.user) {
        localStorage.setItem("token", data.user);
        setLoading(false);
        navigate("/order-coffee");
      } else {
        alert("Please Check your username and password");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Form
        onSubmit={LoginUser}
        className="top col-10 col-md-4 col-lg-4 pt-5 mx-auto font-monospace">
        <Form.Group className="my-4">
          <Form.Label htmlFor="email" className="text-muted">
            Work Email{" "}
          </Form.Label>
          <Form.Control
            name="email"
            className="py-3 fw-bold"
            onChange={handleInputChange}
            value={formData.email}
            id="email"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label htmlFor="password" className="text-muted">
            Password
          </Form.Label>
          <Form.Control
            name="password"
            className="py-3 fw-bold"
            onChange={handleInputChange}
            value={formData.password}
            id="password"
            type={"password"}
            placeholder="Password"
          />
        </Form.Group>
        {loading ? (
          <Button
            type="submit"
            id="mocha"
            className="btn btn-outline-dark py-3 my-4 col-12"
            disabled>
            <SpinnerComponent
              as="span"
              size="sm"
              animation="grow"
              role="status"
            />
            Loading...
          </Button>
        ) : (
          <Button
            type="submit"
            className="dropShadow cappuccino btn btn-outline-dark py-3 my-4 col-12">
            Login
          </Button>
        )}
        <Link
          to="/register"
          className="dropShadow btn bean col-12 mx-auto py-3 ">
          Register Account
        </Link>
      </Form>
    </>
  );
};
export default LoginForm;
