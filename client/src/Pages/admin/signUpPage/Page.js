import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignUp = () => {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    setPwd(e.target.value);
  };

  // REGISTER ADMINISTRATOR
  const registerAdmin = async (e) => {
    e.preventDefault();

    const response = await fetch(process.env.REACT_APP_ADMIN_REG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        pwd,
      }),
    });

    const data = await response.json();

    if (data.status) {
      alert("Registration Successful");
      navigate("/dashboard");
    } else {
      console.error("error");
    }
  };

  return (
    <div>
      <form onSubmit={registerAdmin}>
        <div>
          <div className="input-box">
            <label htmlFor="user">
              Name:
              <input
                onChange={handleName}
                value={name}
                id="user"
                type={"text"}
                placeholder="Enter the Users Name"
              />
            </label>
          </div>
          <div className="input-box">
            <label htmlFor="pwd">
              Password:
              <input
                onChange={handlePassword}
                value={pwd}
                id="pwd"
                type={"text"}
                placeholder="Enter a secure Password"
              />
            </label>
          </div>
        </div>
        <button className="btn btn-outline-warning">Register Adminstrator</button>
      </form>
    </div>
  );
};

export default AdminSignUp;
