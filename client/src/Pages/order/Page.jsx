import React, { useEffect, useState } from "react";
import OrderForm from "@/forms/orderForm/OrderForm";
import { useData } from "@/hooks/useData";
import axios from "axios";
import Box from "@mui/material/Box";
import LoadingSpinner from "@/modules/loadingSpinner/LoadingSpinner";
import { SuccessModal } from "@/modules/successModal/SuccessModal";
import { sanitizeError } from "@/utils/uitls";
import Header from "@/modules/header/Header.component";

const OrderPage = ({ socket }) => {
  const { state } = useData();
  const { user } = state;
  const [isLoading, setIsLoading] = useState(null);
  const [, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [, setSubmitted] = useState(null);
  const [, setOrderStatus] = useState("Order Placed");

  useEffect(() => {
    socket.on("order status update", (data) => {
      if (data.userId === user?.user?.jti) {
        setOrderStatus(data.status);
      }
    });

    return () => {
      socket.off("order status update");
    };
  }, [socket, user]);

  const handleSubmit = async (FormData) => {
    setIsLoading(true);
    const submitData = {
      name: FormData.get("name"),
      number: FormData.get("number"),
      coffeeName: FormData.get("coffeeName"),
      coffeeMilk: FormData.get("coffeeMilk"),
      coffeeSize: FormData.get("coffeeSize"),
      coffeeSugar: FormData.get("coffeeSugar"),
    };
    try {
      socket.emit("new order", submitData);
      const response = await axios.post(process.env.REACT_APP_CREATE_ORDER_API, submitData);
      if (response.status === 200) {
        setSubmitted(response.data.coffee);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 1750);
        return response;
      } else {
        alert("Order Successfully Submitted");
        setShowError(true);
      }
    } catch (error) {
      sanitizeError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Header title="Coffee up" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        {isLoading && <LoadingSpinner />}
        {showSuccess && <SuccessModal />}
        {/* {submitted && <OrderStatusTracker socket={socket} status={orderStatus} />} */}
        <OrderForm socket={socket} handleSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};

export default OrderPage;
