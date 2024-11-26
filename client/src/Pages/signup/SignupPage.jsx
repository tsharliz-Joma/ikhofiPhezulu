import React from "react";
import SignUpForm from "../../forms/SignUp_Form";
import Header from "../../components/header/Header.component";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const SignUpPage = () => {
  return (
    <Box>
      <CssBaseline />
      <Header fontSize={36} />
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
            typography: "h6",
            padding: "25px 0",
            fontFamily: "monospace",
          }}
        ></Box>
      </Container>
      <SignUpForm />
    </Box>
  );
};

export default SignUpPage;
