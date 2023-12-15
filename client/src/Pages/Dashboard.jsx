import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import List from "../components/List/List";
import DialogueBox from "../components/DialogueBox/DialogueBox";
import Header from "../components/Header/Header.component";
// @ts-ignore
import CoffeeItems from "../JsonFiles/Coffee.json";
import { Container, Box, useTheme, CssBaseline, Grid } from "@mui/material";

const viewOrderUrl =
  "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/view-orders";
// const viewOrderUrl =
// "http://localhost:1969/api/view-orders";

// const deleteOrderUrl =
//   "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/sendCoffee";
const deleteOrderUrl = "http://localhost:1969/api/sendCoffee";

const Dashboard = ({ socket }) => {
  const [userData, setUserData] = useState({
    person: "",
    number: "",
    email: "",
    coffee: "",
    size: "",
    milk: "",
    userId: "",
  });

  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState("");
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const displayOptions = (e) => {
    e.preventDefault();
    let toArray = e.target.innerText.split("\n");
    setUserData({
      ...userData,
      person: toArray[0],
      email: toArray[7],
      milk: toArray[3],
      number: toArray[4],
      coffee: toArray[2],
      size: toArray[1],
      userId: toArray[6],
    });

    setSelectedCoffee(e.target.innerText);
    setSelected(true);
    setOpen(true);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
    if (e.target.innerText === "BACK") {
      cancel();
    } else if (e.target.innerText === "COFFEE UP") {
      send();
    }
  };

  const updateMilk = (defaultItem) => {
    userData.milk = defaultItem;
  };

  const updateName = (defaultName) => {
    userData.person = defaultName;
  };

  const send = () => {
    let defaultMilk = "Full cream";
    let defaultName = "George";

    if (userData.milk === "") {
      updateMilk(defaultMilk);
    }
    if (userData.coffee === "") {
      updateName(defaultName);
    }
    const deleteCoffee = {
      name: userData.person,
      email: userData.email,
      userId: userData.userId,
      number: userData.number,
      coffeeName: userData.coffee,
      coffeeSize: userData.size,
      coffeeMilk: userData.milk,
    };

    try {
      socket.emit("order complete", deleteCoffee);
      console.log(deleteCoffee);
      axios.post(deleteOrderUrl, deleteCoffee);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setSelected(false);
  };

  const cancel = () => {
    setSelected(false);
  };

  const getOrders = async () => {
    let coffeeOrders;
    try {
      await axios.get(viewOrderUrl).then((response) => {
        if (response.data.orders === "No Coffee Orders") {
          alert("failed to retrieve orders");
        } else {
          coffeeOrders = response.data.orders;
        }
        setOrders(coffeeOrders);
        // console.log(coffeeOrders)
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
    socket.on("new order", (order) => {
      setOrders((orders) => [...orders, order]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleScroll = (event) => {
    event.stopPropagation();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <CssBaseline />
      <Header
        title="Dashboard"
        theme={theme}
        color={theme.palette.primary.white}
        fontSize={42}
      />
      {orders.length !== 0 && (
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            margin: "7.5% 0%",
          }}>
          {selected && (
            <DialogueBox
              handleOrder={handleOrder}
              open={open}
              onClose={handleClose}
              cDot={selectedCoffee}
            />
          )}

          <List list={orders} onClick={displayOptions} theme={theme} />
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
