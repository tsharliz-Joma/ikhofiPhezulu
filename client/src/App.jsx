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
import axios from "axios";

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
  const [googleUserData, setGoogleUserData] = useState([]);
  const [userPresent, setUserPresent] = useState(false);
  const theme = useTheme();

  const handleSubmit = useGoogleLogin({
    onSuccess: (response) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
              Accept: "application/json",
            },
          },
        )
        .then((res) => {
          localStorage.setItem("googleToken", JSON.stringify(res.data));
          setUserPresent(true);
          setUserData(res.data);
          setGoogleUserData(res.data);
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed", error),
  });

  const handleGoogleError = (response) => {
    // console.log(response);
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : false;
    const localGoogleToken = localStorage.getItem("googleToken")
      ? localStorage.getItem("googleToken")
      : false;
    if (localToken) {
      const user = jwt.decode(localToken);
      if (user) {
        setUserData(user);
        setUserPresent(true);
      }
    } else if (localGoogleToken) {
      setUserData(JSON.parse(localGoogleToken));
      setUserPresent(true);
    }
  }, [userPresent]);

  return (
    <ThemeProvider theme={theme}>
      <Header title="Table Talk" theme={theme} />
      {userPresent ? (
        <UserAuthenticatedComponent userData={userData} theme={theme} />
      ) : (
        <Grid container>
          <Image imgSrc={phone} alt="2000s cellphone" />
          <LoginForm />
          <GoogleLogin onSuccess={handleSubmit} onError={handleGoogleError} />
          <Copyright sx={{ mt: 14 }} />
        </Grid>
      )}
    </ThemeProvider>
  );
};

export default App;
