import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header/Header.component";
import { useGoogleLogin } from "@react-oauth/google";
import Typography from "@mui/material/Typography";

import "./App.css";
import { ThemeProvider, useTheme } from "@mui/material";
import axios from "axios";
import { ContextProvider } from "./Context/ContextProvider";
import { DisplayUser } from "./components/displayUser/DisplayUser";
import jwt from "jsonwebtoken";

const getServerData = (url) => async () => {};

const getLocalStorageData = (primaryKey, secondaryKey) => () => {
  const localToken = localStorage.getItem(primaryKey);
  const googleToken = localStorage.getItem(secondaryKey);
  if (!localToken && googleToken) {
    const user = JSON.parse(googleToken);
    return { user };
  }
  if (!googleToken && localToken) {
    const user = jwt.decode(localToken);
    return { user };
  }
};

const App = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [googleUserData, setGoogleUserData] = useState([]);
  const [userPresent, setUserPresent] = useState(false);
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

  const [contextValue, setContextValue] = useState(null);

  useEffect(() => {
    const value = getDataFunc()();
    setContextValue(value);
    // console.log("Context Value:", value);
  }, [getDataFunc]);

  return (
    <ThemeProvider theme={theme}>
      <ContextProvider getDataFunc={getDataFunc}>
        {/* <Header title="Coffee up" theme={theme} color={theme.palette.primary.main} fontSize={42} /> */}
        <DisplayUser handleGoogleError={handleGoogleError} handleGoogleLogin={handleGoogleLogin} />
      </ContextProvider>
    </ThemeProvider>
  );
};

export default App;
