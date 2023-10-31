import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import LoginForm from "./LoginForm/LoginForm";
import Header from "./components/Header/Header.component";
import UserAuthenticatedComponent from "./components/user-Authenticed-component/User.authenticated.component";
import Image from "./components/Imag∑/ImageComponent";
import phone from "./images/phone.png";
// GOOGLE LOGIN
// MATERIAL UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "./App.css";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";

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
  const theme = useTheme();

 
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
    <ThemeProvider theme={theme}>
      <Header title="Table Talk" theme={theme} />
      {userPresent ? (
        <UserAuthenticatedComponent userName={userName} theme={theme} />
      ) : (
        <Grid container>
          <Image imgSrc={phone} alt="2000s cellphone" />
          <LoginForm />
          <Copyright sx={{ mt: 14 }} />
        </Grid>
      )}
    </ThemeProvider>
  );
}

export default App;
