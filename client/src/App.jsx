import React from "react";
import "./App.css";
import { ThemeProvider, useTheme } from "@mui/material";
import { DisplayUser } from "./Pages/displayUser/DisplayUserPage";
import { useData } from "./hooks/useData";
import LoginPage from "./Pages/login/LoginPage";
import Header from "./components/Header/Header.component";
import { DisplayUserPage } from "./Pages/displayUser/DisplayUserPage";

const App = () => {
  const theme = useTheme();
  const { state } = useData();

  return (
    <ThemeProvider theme={theme}>
      <Header title="Coffee up" theme={theme} color={theme.palette.primary.main} fontSize={42} />
      {state.user ? <DisplayUserPage /> : <LoginPage />}
    </ThemeProvider>
  );
};

export default App;
