import React from "react";
import SignUpForm from "./SignUpForm";
import Header from "../components/Header/Header.component";

const SignUpPage = () => {
  // Okay so here
  return (
    <div className="cream max-height col-12">
      <Header title="Reg Deets" />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
