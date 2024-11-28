import "./App.css";
import React from "react";
import Header from "./components/header/Header.component";
import OrderPage from "./pages/order/OrderPage";

const App = ({ socket }) => {

  return (
    <>
      <Header title="Coffee up" fontSize={42} />
      <OrderPage socket={socket} />
    </>
  );
};

export default App;
