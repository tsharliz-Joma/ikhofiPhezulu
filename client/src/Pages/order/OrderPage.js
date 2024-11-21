import React, { useEffect, useState } from "react";
import { OrderForm } from "../../Forms/orderForm/OrderForm";
import Header from "../../components/Header/Header.component";
import { ThemeProvider, useTheme } from "@mui/material";
import { useData } from "../../hooks/useData";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { SuccessModal } from "../../components/SuccessModal/SuccessModal";
// const backEndUrl =
//   "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/coffee";
const backEndUrl = "http://localhost:1969/api/coffee";

const OrderPage = ({ socket }) => {
  const [isLoading, setIsLoading] = useState(null);
  const [showError, setShowError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const theme = useTheme();
  const { state, dispatch } = useData();
  const { user } = state;

  console.log(submitted);

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
      <Header title="Order" theme={theme} color={theme.palette.primary.main} fontSize={"36px"} />
      {isLoading && <LoadingSpinner />}
      {showSuccess && <SuccessModal />}
      <OrderForm socket={socket} user={state.user} handleSubmit={handleSubmit} />
    </ThemeProvider>
  );
};

export default OrderPage;
