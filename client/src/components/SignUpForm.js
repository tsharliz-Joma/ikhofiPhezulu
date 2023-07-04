import React, { useState } from "react";

const SignUpForm = ({
  handleSubmit,
  nm,
  handleName,
  em,
  handleEmail,
  mn,
  handleNumber,
  ps,
  handlePassword,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="input-box">
          <label htmlFor="name">
            Name:
            <input
              onChange={handleName}
              value={nm}
              id="name"
              type="text"
              placeholder="Enter Your Full Name"
            />
          </label>
        </div>
        <div className="input-box">
          <label htmlFor="email">
            Email:
            <input
              onChange={handleEmail}
              value={em}
              id="email"
              type="text"
              placeholder="Enter Your Email Address"
            />
          </label>
        </div>
        <div className="input-box">
          <label htmlFor="mobile-number">
            Phone Number:
            <input
              onChange={handleNumber}
              value={mn}
              id="mobile-number"
              type="text"
              placeholder="Enter Mobile Number"
            />
          </label>
        </div>
        <div className="input-box">
          <label htmlFor="password">
            Password:
            <input
              onChange={handlePassword}
              value={ps}
              id="password"
              type={"password"}
              placeholder="Enter a Password"
            />
          </label>
        </div>
      </div>
      <button className="btn btn-outline-success">Register</button>
    </form>
  );
};

export default SignUpForm;
