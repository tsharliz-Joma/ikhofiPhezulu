import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import LoginForm from "../../../forms/loginForm/LoginForm";
import { StyledContainer } from "../../../styles/globals";
import axios from "axios";
import { useNavigate } from "react-router";
import { useData } from "../../../hooks/useData";
import jwt from "jsonwebtoken";
import LoadingSpinner from "@/modules/loadingSpinner/LoadingSpinner";
import ErrorDisplay from "@/modules/error/ErrorDisplay";

const LoginPage = () => {
  const { dispatch } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(null);
  const navigate = useNavigate();

  const onSuccess = (response) => {
    const user_data = jwt.decode(response.credential);
    sessionStorage.setItem("googleToken", JSON.stringify(user_data));
    dispatch({ type: "LOGIN", payload: user_data });
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
      const response = await axios.post(process.env.REACT_APP_USER_LOGIN_API, submitData);
      if (response.status === 200) {
        const userData = response.data;
        sessionStorage.setItem("token", userData.user);
        dispatch({ type: "LOGIN", payload: userData });
        navigate("/order-coffee");
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
    <StyledContainer>
      {isLoading && <LoadingSpinner />}
      <LoginForm
        handleSubmit={handleSubmit}
        handleGoogleLogin={handleGoogleLogin}
        handleGoogleError={handleGoogleError}
        onSuccess={onSuccess}
        onError={onError}
        error={showError ? <ErrorDisplay /> : null}
      />
    </StyledContainer>
  );
};
export default LoginPage;
