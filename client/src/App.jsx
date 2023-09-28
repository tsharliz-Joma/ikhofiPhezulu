import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import LoginForm from "./LoginForm/LoginForm";
import Header from "./components/Header/Header.component";
import { Button, Card, Container, Col, Row } from "react-bootstrap";
import UserAuthenticatedComponent from "./components/user-Authenticed-component/User.authenticated.component";
// Teams
import { useIsAuthenticated } from "@azure/msal-react";
import { Stack } from "react-bootstrap";
import "./App.css";

// const socket = socketIO.connect("http://localhost:4000");

function App() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const [userName, setUsername] = useState("");
  const [userPresent, setUserPresent] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      // console.log(user);
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
    <>
      <Header title="Table Talk" isAuthenticated={isAuthenticated} />

      <div className="bg-light col-12 col-lg-4 mx-lg-auto mx-auto font-monospace">
        {isAuthenticated || userPresent ? (
          <div className="cream text-center col-12 col-lg-4 mx-auto max-height">
            <UserAuthenticatedComponent userName={userName} />
          </div>
        ) : (
          <div className="cream col-12 col-lg-4 mx-auto max-height">
            <LoginForm />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
