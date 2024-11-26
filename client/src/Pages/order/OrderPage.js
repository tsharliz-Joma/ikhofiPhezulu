import React, { useEffect, useState } from "react";
import OrderForm from "@/forms/orderForm/OrderForm";
import { ThemeProvider, useTheme } from "@mui/material";
import { useData } from "@/hooks/useData";
import axios from "axios";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { SuccessModal } from "@/components/successModal/SuccessModal";
import OrderStatusTracker from "@/components/orderStatusTracker/OrderStatusTracker";

// const backEndUrl =
//   "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/coffee";
const backEndUrl = "http://localhost:1969/api/coffee";

const OrderPage = ({ socket }) => {
  const theme = useTheme();
  const { state } = useData();
  const { user } = state;
  const [isLoading, setIsLoading] = useState(null);
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [orderStatus, setOrderStatus] = useState("Order Placed");

  // useEffect(() => {
  //   socket.on("order status update", (data) => {
  //     if (data.userId === user?.user?.jti) {
  //       setOrderStatus(data.status);
  //     }
  //   });

  //   return () => {
  //     socket.off("order status update");
  //   };
  // }, [socket, user]);
  

  const handleSubmit = async (FormData) => {
    setIsLoading(true);
    const submitData = {
      name: FormData.get("name"),
      userId: user?.user?.jti,
      email: user?.user?.email,
      number: FormData.get("number"),
      coffeeName: FormData.get("coffeeName"),
      coffeeMilk: FormData.get("coffeeMilk"),
      coffeeSize: FormData.get("coffeeSize"),
      coffeeSugar: FormData.get("coffeeSugar"),
    };
    try {
      socket.emit("new order", submitData);
      const response = await axios.post(backEndUrl, submitData);
      if (response.status === 200) {
        setSubmitted(response.data.coffee);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 1500);
        return response;
      } else {
        alert("Order Successfully Submitted");
        setShowError(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingSpinner />}
      {showSuccess && <SuccessModal />}
      {submitted && <OrderStatusTracker socket={socket} status={orderStatus} />}
      <OrderForm socket={socket} user={state.user} handleSubmit={handleSubmit} />
    </ThemeProvider>
  );
};

export default OrderPage;
