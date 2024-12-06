import React, { useState } from "react";
import { useData } from "@/hooks/useData";
import { useNavigate } from "react-router-dom";
import api, { sanitizeError } from "@/utils/uitls";
import { StyledContainer } from "@/styles/globals";
import Header from "@/components/header/Header.component";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import LoginForm from "@/forms/loginForm/LoginForm";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import Container from "@mui/material/Container";

const AdminLogin = () => {
  const { dispatch } = useData();
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
      const response = await api.post(process.env.REACT_APP_ADMIN_LOGIN_API, submitData);
      if (response.status === 200) {
        const adminKey = sessionStorage.getItem(process.env.REACT_APP_ADMINKEY);
        if (adminKey) {
          const adminData = response.data;
          sessionStorage.setItem("admin-access-token", adminData.user);
          dispatch({ type: "LOGIN", payload: adminData });
          navigate("/dashboard");
        }
      } else {
        setError(true);
        setShowError({ response });
      }
    } catch (e) {
      sanitizeError(e);
    } finally {
      setIsLoading(false);
    }
  };

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
