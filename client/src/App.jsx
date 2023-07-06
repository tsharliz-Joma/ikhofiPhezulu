import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// const socket = socketIO.connect("http://localhost:4000");

function App() {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [userPresent, setUserPresent] = useState(false);

  // const [loggedIn, setLoggedIn] = useState(
  //   <button className="btn btn-outline-success">Logout</button>,
  // );

  const LogoutUser = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      window.location.reload();
      console.log("Logged out");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt.decode(token);
      if (user) {
        setUsername(user.name);
        setUserPresent(true);
      }
      if (!user) {
        setUserPresent(false);
        return;
      }
    }
  }, []);

  return (
    <div className="App">
      <div className="">
        <h1 className="kanit bg-secondary">Coffee Up</h1>
        <p> Good Morning {userName} </p>

        {userPresent && (
          <Link
            to="/order-coffee"
            id="order"
            className="btn btn-outline-success">
            Order Coffee
          </Link>
        )}
        <br></br>
        <Link to="/register" className="btn btn-outline-success">
          Register Account
        </Link>
        <br></br>
        {!userPresent && (
          <div>
            <Link to="/login" className={`btn btn-outline-success`}>
              Login
            </Link>
            <Link to="/microsoftApp" className={"btn btn-outline-secondary"}>
              Microsoft Login
            </Link>
          </div>
        )}
        {userPresent && (
          <button
            onClick={LogoutUser}
            className="btn btn-outline-success col-10">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
