import React, {useState} from "react";
import {useGoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router";
import {useData} from "hooks/useData";
import LoginForm from "form/loginForm/LoginForm";
import api from "utils/utils";
import jwt from "jsonwebtoken";
import LoadingSpinner from "components/loadingSpinner/LoadingSpinner";
import ErrorDisplay from "src/modules/error/ErrorDisplay";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Header from "components/header/Header.component";

const LoginPage = () => {
  const {dispatch} = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(null);
  const navigate = useNavigate();

  const onSuccess = (response) => {
    const user_data = jwt.decode(response.credential);
    sessionStorage.setItem("googleToken", JSON.stringify(user_data));
    dispatch({type: "LOGIN", payload: user_data});
  };

  const onError = (error) => {
    console.error("Login Failed", error);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess,
    onError,
  });

  const handleGoogleError = (error) => {
    console.error("Google Login Error", error);
  };

  const handleSubmit = async (FormData) => {
    setIsLoading(true);
    const submitData = {
      email: FormData.get("email"),
      password: FormData.get("password"),
    };
    try {
      const response = await api.post(
        process.env.REACT_APP_USER_LOGIN_API,
        submitData,
      );
      if (response.status === 200) {
        const userData = response.data;
        sessionStorage.setItem("token", userData.user);
        dispatch({type: "LOGIN", payload: userData});
        navigate("/menu");
      } else {
        setShowError(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{height: "100vh", backgroundColor: "background.default"}}>
      <Header title="coffee up" />
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Paper
          elevation={4}
          sx={{
            padding: "2rem",
            borderRadius: "16px",
            maxWidth: "400px",
            width: "100%",
            background: "#1d1d1d",
            color: "white",
          }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{fontWeight: "bold", color: "primary.main"}}>
            Login
          </Typography>
          {isLoading && <LoadingSpinner />}
          <LoginForm
            handleSubmit={handleSubmit}
            handleGoogleLogin={handleGoogleLogin}
            handleGoogleError={handleGoogleError}
            onSuccess={onSuccess}
            onError={onError}
            error={showError ? <ErrorDisplay /> : null}
          />
        </Paper>
      </Box>
    </Box>
  );
};
export default LoginPage;
