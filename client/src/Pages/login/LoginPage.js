import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import LoginForm from "../../forms/loginForm/LoginForm";
import { StyledContainer } from "../../styles/globals";
import axios from "axios";
import { useNavigate } from "react-router";
import { useData } from "../../hooks/useData";
import jwt from "jsonwebtoken";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import ErrorDisplay from "@/components/error/ErrorDisplay";

// const backEndUserLogin = "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/login";
const backEndUserLogin = "http://localhost:1969/api/login";

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
    console.log("Login Failed", error);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess,
    onError,
  });

  const handleGoogleError = (error) => {
    console.log("Google Login Error", error);
  };

  const handleSubmit = async (FormData) => {
    setIsLoading(true);
    const submitData = {
      email: FormData.get("email"),
      password: FormData.get("password"),
    };
    try {
      const response = await axios.post(backEndUserLogin, submitData);
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
      {showError && <ErrorDisplay />}
      <LoginForm
        handleSubmit={handleSubmit}
        handleGoogleLogin={handleGoogleLogin}
        handleGoogleError={handleGoogleError}
        onSuccess={onSuccess}
        onError={onError}
      />
    </StyledContainer>
  );
};
export default LoginPage;
