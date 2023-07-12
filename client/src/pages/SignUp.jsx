import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../components/RegistrationForm/SignUpForm";

const SignUp = () => {
  
  return (
    <div>
      <SignUpForm />
      {/* <Link to="/" className="btn btn-outline-success">
        Home
      </Link> */}
    </div>
  );
};

export default SignUp;
