import React, { useEffect, useState } from "react";
import OrderForm from "./OrderForm";
import Header from "../components/Header/Header.component";

const Order = ({ socket }) => {
  const [user, setUser] = useState({});
  // console.log(user);

  return (
    <div className="cream max-height col-lg-12 col-12">
      <Header title="Order" />
      <OrderForm socket={socket} />
    </div>
  );
};

export default Order;
