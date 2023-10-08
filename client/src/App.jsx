import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import LoginForm from "./LoginForm/LoginForm";
import Header from "./components/Header/Header.component";
import UserAuthenticatedComponent from "./components/user-Authenticed-component/User.authenticated.component";
import "./App.css";

function App() {
  const navigate = useNavigate();

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
  }, [navigate]);

  return (
    <>
      <Header title="Table Talk" />
      {userPresent ? (
        <div className="cream text-center col-12 mx-auto max-height">
          <UserAuthenticatedComponent userName={userName} />
        </div>
      ) : (
        <div className="cream col-12 col-lg-4 mx-auto max-height">
          <LoginForm />
        </div>
      )}
    </>
  );
}

export default App;
