import axios from "axios";
import React, { useState } from "react";
import List from "@/components/list/List";
import DialogueBox from "@/components/dialogueBox/DialogueBox";
import Header from "@/components/header/Header.component";
import useTheme from "@mui/material/styles/useTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useOrders } from "@/hooks/useOrders";
import { StyledContainer } from "@/styles/globals";

const Dashboard = ({ socket }) => {
  const { orders, refetch } = useOrders(process.env.REACT_APP_VIEW_ORDERS_API, socket);
  const [selected, setSelected] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState("");
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const displayOptions = (coffee) => {
    setSelectedCoffee(coffee);
    setSelected(true);
    setOpen(true);
  };

  const handleOrder = (e) => {
    setSelected(false);
    setOpen(false);
    try {
      socket.emit("order complete", selectedCoffee);
      axios.post(process.env.REACT_APP_DELETE_ORDER_API, selectedCoffee).then((res) => {
        refetch();
        return res;
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClose = () => {
    setSelected(false);
    setOpen(false);
  };

  return (
    <StyledContainer>
      <CssBaseline />
      <Container maxWidth={"xs"}>
        <Header title="Dashboard" />
        <List list={orders} onClick={displayOptions} theme={theme} />
        {selected && (
          <DialogueBox
            handleOrder={handleOrder}
            open={open}
            onClose={handleClose}
            selectedCoffee={selectedCoffee}
          />
        )}
      </Container>
    </StyledContainer>
  );
};

export default Dashboard;
