import axios from "axios";
import React, { useState, useEffect } from "react";
import List from "@/components/list/List";
import DialogueBox from "@/components/dialogueBox/DialogueBox";
import Header from "@/components/header/Header.component";
import useTheme from "@mui/material/styles/useTheme";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "styled-components";
import { useOrders } from "@/hooks/useOrders";
import { Container } from "@mui/material";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr;
`;

// const viewOrderApi =
// "https://ikhofiphezulu-server-19652a0dabe7.herokuapp.com/api/orders";
const viewOrderApi = "http://localhost:1969/api/orders";

// const deleteOrderApi =
//   "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/sendCoffee";
const deleteOrderApi = "http://localhost:1969/api/sendCoffee";

const Dashboard = ({ socket }) => {
  const { orders, loading, error, refetch } = useOrders(
    process.env.REACT_APP_VIEW_ORDERS_API,
    socket
  );
  const [test, setTest] = useState("");
  const [selected, setSelected] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState("");
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  // useEffect(() => {
  //   socket.on("order status update", (data) => {
  //     setTest((prevOrders) =>
  //       prevOrders.map((order) =>
  //         order._id === data.orderId ? { ...order, status: data.status } : order
  //       )
  //     );
  //   });

  //   return () => {
  //     socket.off("order status update");
  //   };
  // }, [socket]);

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
      <Container maxWidth={"sm"}>
        <GridContainer>
          {orders.length !== 0 && (
            <>
              <List list={orders} onClick={displayOptions} theme={theme} />
              {selected && (
                <DialogueBox
                  handleOrder={handleOrder}
                  open={open}
                  onClose={handleClose}
                  selectedCoffee={selectedCoffee}
                />
              )}
            </>
          )}
        </GridContainer>
      </Container>
    </>
  );
};

export default Dashboard;
