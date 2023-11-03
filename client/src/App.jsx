import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import LoginForm from "./LoginForm/LoginForm";
import Header from "./components/Header/Header.component";
import UserAuthenticatedComponent from "./components/user-Authenticed-component/User.authenticated.component";
import Image from "./components/Imag∑/ImageComponent";
import phone from "./images/phone.png";
// GOOGLE LOGIN
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
// MATERIAL UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "./App.css";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import { LogoutUser } from "./components/user-Authenticed-component/User.authenticated.component";
import { Button } from "react-bootstrap";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright ©"}
      <Link color="inherit" href="#">
        Doka Pty Ltd.
      </Link>
    </Typography>
  );
};

const App = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [userPresent, setUserPresent] = useState(false);
  const theme = useTheme();

  const handleGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUserData(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  }); 

  const failGoogle = async (message) => {
    console.log(message)
  }

  const logout = () => {
    googleLogout()
    // LogoutUser()
  }
console.log(localStorage.getItem('token'))
  useEffect(() => {
    const localToken = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : false;
    if (!localToken) {
      navigate("/");
    }
    if (localToken) {
      const user = jwt.decode(localToken);
      if (user) {
        setUserData(user);
        setUserPresent(true);
      }
      if (!user) {
        setUserPresent(false);
        return;
      }
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Header title="Table Talk" theme={theme} />
      {userPresent ? (
        <UserAuthenticatedComponent userData={userData} theme={theme} />
      ) : (
        <Grid container>
          <Image imgSrc={phone} alt="2000s cellphone" />
          <LoginForm />
          <GoogleLogin onSuccess={handleGoogle} onError={failGoogle} />
          {/* <Button onClick={logout}>Log out</Button> */}
          <Copyright sx={{ mt: 14 }} />
        </Grid>
      )}
    </ThemeProvider>
  );
};

export default App;
