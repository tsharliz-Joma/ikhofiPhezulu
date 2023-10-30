import React from "react";
import SignUpForm from "./SignUpForm";
import Header from "../components/Header/Header.component";
import { Box, CssBaseline, useTheme } from "@mui/material";
import { Container } from "react-bootstrap";

const SignUpPage = () => {
  const theme = useTheme();

  return (
    <Box>
      <Header title="Late Registration" theme={theme} />
      <Container>
        <Box
          sx={{
            bgcolor: "primary",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "77%",
            margin: "0 auto",
            borderRadius: "5px",
            typography: "h5",
            padding: "25px 0",
            fontFamily: "monospace",
          }}>
          Sign up to Table talk
        </Box>
      </Container>
      <SignUpForm />
    </Box>
  );
};

export default SignUpPage;
