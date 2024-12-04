import React, { useState } from "react";
import { useData } from "@/hooks/useData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StyledContainer } from "@/styles/globals";
import Header from "@/components/header/Header.component";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import LoginForm from "@/forms/loginForm/LoginForm";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import Container from "@mui/material/Container";

const AdminLogin = () => {
  const { dispatch, state } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (FormData) => {
    setIsLoading(true);
    const submitData = {
      email: FormData.get("email"),
      password: FormData.get("password"),
    };
    try {
      const response = await axios.post(process.env.REACT_APP_ADMIN_LOGIN_API, submitData);
      console.log(response);
      const adminKey = sessionStorage.getItem(process.env.REACT_APP_ADMIN_KEY);
      if (response.status === 200 && adminKey === "true") {
        console.log(response);
        const adminData = response.data;
        sessionStorage.setItem("adminToken", adminData.user);
        dispatch({ type: "LOGIN", payload: adminData });
        navigate("/dashboard");
      } else {
        setError(true);
        setShowError({ response });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(state);
  return (
    <StyledContainer>
      <Container maxWidth="xs" sx={{ display: "grid", gap: "4rem" }}>
        {isLoading && <LoadingSpinner />}
        {showError && <ErrorDisplay />}
        <Header title="Admin" />
        <LoginForm handleSubmit={handleSubmit} />
        <ErrorDisplay error={error} />
      </Container>
    </StyledContainer>
  );
};

export default AdminLogin;
