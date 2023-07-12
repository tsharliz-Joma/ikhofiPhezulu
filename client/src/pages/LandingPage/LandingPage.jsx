import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import "./LandingPage.css";
import LoginForm from "../../components/LoginForm/LoginForm";

const LandingPage = () => {
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
    <div id="LandPageCont">
      <div id="LandPageInn">
        <div className="Header">
          <p className="h-text">Table Talk</p>
        </div>
        <div id="btn-div">
          <div id="btn-div-inn">
            {userPresent && (
              <div id="order-button-container">
                <Link to="/order-coffee" id="order" className="ord_btn">
                  Order Coffee
                </Link>
                <button onClick={LogoutUser} className="ord_btn">
                  Logout
                </button>
              </div>
            )}
            {!userPresent && (
              <div>
                <LoginForm />
                <div id="reg_btn_div">
                  <Link to="/register" className="btn reg_btn">
                    Register Account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
