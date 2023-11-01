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

function App(props) {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [userPresent, setUserPresent] = useState(false);
  const [googleUser, setGoogleUser] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const theme = useTheme();

  const login = useGoogleLogin({
    onSuccess: (response) => setGoogleUser(response),
    onError: (error) => console.log("Login failed", error),
  });

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

  useEffect(() => {
    if (googleUser) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleUser.access_token}`,
              Accept: "application/json",
            },
          },
        )
        .then((res) => {
          console.log(res);
          setGoogleUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [googleUser]);

  return (
    <ThemeProvider theme={theme}>
      <Header title="Table Talk" theme={theme} />
      {userPresent ? (
        <UserAuthenticatedComponent userName={userName} theme={theme} />
      ) : (
        <Grid container>
          <Image imgSrc={phone} alt="2000s cellphone" />
          <LoginForm />
          <GoogleLogin onClick={() => login()} />
          <Copyright sx={{ mt: 14 }} />
        </Grid>
      )}
    </ThemeProvider>
  );
}

export default App;
