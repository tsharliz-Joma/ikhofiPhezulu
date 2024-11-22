import axios from "axios";
import React, { useState } from "react";
import List from "@/components/list/List";
import DialogueBox from "@/components/dialogueBox/DialogueBox";
import Header from "@/components/header/Header.component";
import useTheme from "@mui/material/styles/useTheme";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "styled-components";
import { useOrders } from "@/hooks/useOrders";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr;
  border: 1px solid red;
`;

// const viewOrderUrl =
// "https://ikhofiphezulu-server-19652a0dabe7.herokuapp.com/api/view-orders";
const viewOrderUrl = "http://localhost:1969/api/view-orders";

// const deleteOrderUrl =
//   "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/sendCoffee";
const deleteOrderUrl = "http://localhost:1969/api/sendCoffee";

const Dashboard = ({ socket }) => {
  const { orders, loading, error, refetch } = useOrders(viewOrderUrl, socket);
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
      axios.post(deleteOrderUrl, selectedCoffee).then((res) => {
        refetch();
        return res;
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleClose = () => {
    setSelected(false);
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Header title="Dashboard" />
      <GridContainer>
        {orders.length !== 0 && (
          <>
            <List list={orders} onClick={displayOptions} theme={theme} />
            {selected && (
              <DialogueBox handleOrder={handleOrder} open={open} onClose={handleClose} selectedCoffee={selectedCoffee} />
            )}
          </>
        )}
      </GridContainer>
    </>
  );
};

export default Dashboard;
