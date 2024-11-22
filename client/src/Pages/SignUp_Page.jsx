import React from "react";
import SignUpForm from "../Forms/SignUp_Form";
import Header from "../components/header/Header.component";
import { Box, CssBaseline, useTheme, Container } from "@mui/material";

const SignUpPage = () => {
  const theme = useTheme();

  return (
    <Box>
      <CssBaseline />
      <Header title="Late Registration" theme={theme} fontSize={36} color={theme.palette.primary.main} />
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
