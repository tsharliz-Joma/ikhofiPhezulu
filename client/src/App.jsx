import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import LoginForm from "./LoginForm/LoginForm";
import Header from "./components/Header/Header.component";
import UserAuthenticatedComponent from "./components/user-Authenticed-component/User.authenticated.component";
import Image from "./components/Imag∑/ImageComponent";
import phLogo from './images/phLogo.png'
// MATERIAL UI
import Grid from "@mui/material/Grid";
import Typography  from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "./App.css";



function Copyright(props){
  return (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright ©'}
    <Link color="inherit" href="#">
      Jsphere Inc.
    </Link>
  </Typography>
  )
}

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
        <Grid>
          
            <Image imgSrc={phLogo} alt="2000s cellphone" />
            <LoginForm />
            <Copyright sx={{ mt: 14 }} />
          
        </Grid>
      )}
    </>
  );
}

export default App;
