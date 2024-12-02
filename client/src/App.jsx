import "./App.css";
import React from "react";
import Header from "./components/header/Header.component";
import OrderPage from "./pages/order/OrderPage";
import { StyledContainer } from "./styles/globals";

const App = ({ socket }) => {

  return (
    <StyledContainer>
      <Header title="Coffee up" fontSize={42} />
      <OrderPage socket={socket} />
    </StyledContainer>
  );
};

export default App;
