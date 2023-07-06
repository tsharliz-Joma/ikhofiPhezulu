import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div>
      <LoginForm />
      <Link to="/" className="btn btn-outline-success">
        Home
      </Link>
    </div>
  );
};

export default Login;
