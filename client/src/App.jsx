import React from "react";
import { DisplayUserPage } from "./pages/displayUser/DisplayUserPage";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import useTheme from "@mui/material/styles/useTheme";

import "./App.css";
import { useData } from "./hooks/useData";
import Header from "./components/header/Header.component";
import OrderPage from "./pages/order/OrderPage";

const App = ({ socket }) => {
  const { state } = useData();

  return (
    <>
      <Header title="Coffee up" fontSize={42} />
      <OrderPage socket={socket} />
      {/* {state.user ? <DisplayUserPage {...state} /> : <LoginPage />} */}
    </>
  );
};

export default App;
