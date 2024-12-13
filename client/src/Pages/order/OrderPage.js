import React, { useEffect, useState } from "react";
import OrderForm from "@/forms/orderForm/OrderForm";
import { ThemeProvider, useTheme } from "@mui/material";
import { useData } from "@/hooks/useData";
import axios from "axios";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { SuccessModal } from "@/components/successModal/SuccessModal";
import { sanitizeError } from "@/utils/uitls";

const OrderPage = ({ socket }) => {
  const theme = useTheme();
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
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingSpinner />}
      {showSuccess && <SuccessModal />}
      {/* {submitted && <OrderStatusTracker socket={socket} status={orderStatus} />} */}
      <OrderForm socket={socket} handleSubmit={handleSubmit} />
    </ThemeProvider>
  );
};

export default OrderPage;
