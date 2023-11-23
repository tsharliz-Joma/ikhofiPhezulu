import React from "react";
import OrderForm from "./OrderForm";
import Header from "../components/Header/Header.component";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";

const Order = ({ socket }) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Header
        title="Order"
        theme={theme}
        color={theme.palette.primary.main}
        fontSize={'30px'}
      />
      <OrderForm socket={socket} />
    </ThemeProvider>
  );
};

export default Order;
