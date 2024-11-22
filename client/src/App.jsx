import React from "react";
import { DisplayUserPage } from "./Pages/displayUser/DisplayUserPage";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import useTheme from "@mui/material/styles/useTheme";

import "./App.css";
import { useData } from "./hooks/useData";
import LoginPage from "./Pages/login/LoginPage";
import Header from "./components/header/Header.component";
import Container from "@mui/material/Container";

const App = () => {
  const { state } = useData();

  return (
    <>
      <Container maxWidth={"sm"}>
        <Header title="Coffee up" fontSize={42} />
        {state.user ? <DisplayUserPage {...state} /> : <LoginPage />}
      </Container>
    </>
  );
};

export default App;
