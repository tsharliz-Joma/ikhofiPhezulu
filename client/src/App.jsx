import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header/Header.component";
import { useGoogleLogin } from "@react-oauth/google";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "./App.css";
import { ThemeProvider, useTheme } from "@mui/material";
import axios from "axios";
import { ContextProvider } from "./Providers/ContextProvider";
import { DisplayUser } from "./components/dashboard/DisplayUser";

const getServerData = (url) => async () => {};

const getLocalStorageData = async (primaryKey, secondaryKey) => {
  // const localToken = localStorage.getItem(primaryKey);
  const googleToken = localStorage.getItem(secondaryKey);
  const user = JSON.parse(googleToken);
  return { state: user };
  // if (localToken) {
  //   const user = jwt.decode(localToken);
  //   return { key: user};
  // } else if (googleToken) {
  //   const user = JSON.parse(googleToken);
  //   return { key: user};
  // }
};

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright ©"}
      <Link color="inherit" href="#">
        Doka Pty Ltd.
      </Link>
    </Typography>
  );
};

const App = (props) => {
  const navigate = useNavigate();
  const [, setUserData] = useState([]);
  const [, setGoogleUserData] = useState([]);
  const [, setUserPresent] = useState(false);
  const theme = useTheme();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`, {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: "application/json",
          },
        })
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

  const getDataFunc = useCallback(() => getLocalStorageData("token", "googleToken"), []);

  return (
    <ThemeProvider theme={theme}>
      <ContextProvider getDataFunc={getDataFunc}>
        <Header title="Coffee up" theme={theme} color={theme.palette.primary.main} fontSize={42} />
        <DisplayUser handleGoogleError={handleGoogleError} handleGoogleLogin={handleGoogleLogin} />
      </ContextProvider>
    </ThemeProvider>
  );
};

export default App;
