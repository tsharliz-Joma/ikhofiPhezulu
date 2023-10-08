import React from "react";
import OrderForm from "./OrderForm";
import Header from "../components/Header/Header.component";

const Order = ({ socket }) => {

  return (
    <div className="cream max-height col-lg-12 col-12">
      <Header title="BRUVV" />
      <OrderForm socket={socket} />
    </div>
  );
};

export default Order;
