import "./App.css";
import React from "react";
import Header from "./components/header/Header.component";
import OrderPage from "./pages/order/OrderPage";
import { StyledContainer } from "./styles/globals";
import Container from "@mui/material/Container";

const App = ({ socket }) => {
  return (
    <StyledContainer>
      <Container maxWidth="xs" sx={{ gap: "50px", display: "grid" }}>
        <Header title="Coffee up" fontSize={42} />
        <OrderPage socket={socket} />
      </Container>
    </StyledContainer>
  );
};

export default App;
