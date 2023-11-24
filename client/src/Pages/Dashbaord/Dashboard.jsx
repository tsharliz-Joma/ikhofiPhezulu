import axios from "axios";
import React, { useState, useEffect } from "react";
import List from "../../components/List/List";
import DialogueBox from "../../components/DialogueBox/DialogueBox";
import Header from "../../components/Header/Header.component";
// @ts-ignore
import CoffeeItems from "../../JsonFiles/Coffee.json";
import { Container, Box, useTheme, CssBaseline, Grid } from "@mui/material";

const viewOrderUrl =
  "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/view-orders";
// const viewOrderUrl =
// "http://localhost:1969/api/view-orders";

// const deleteOrderUrl =
//   "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/sendCoffee";
const deleteOrderUrl =
"http://localhost:1969/api/sendCoffee";

const Dashboard = ({ socket }) => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState("");
  const [Size, setSize] = useState("");
  const [Milk, setMilk] = useState("");
  const [Person, setPerson] = useState("");
  const [Coffee, setCoffee] = useState("");
  const [inombolo, setInombolo] = useState("");
  const [ email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const displayOptions = (e) => {
    e.preventDefault();
    let toArray = e.target.innerText.split("\n");
    console.log(toArray)
    setPerson(toArray[0]);
    setCoffee(toArray[2] || "Maafih Jabana");
    setSize(toArray[1]);
    setMilk(toArray[3]);
    setInombolo(toArray[4]);
    // setEmail(toArray[7])
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
    setMilk(defaultItem);
  };

  const updateName = (defaultName) => {
    setPerson(defaultName);
  };

  const send = () => {
    let defaultMilk = "Full cream";
    let defaultName = "George";

    if (Milk === "") {
      updateMilk(defaultMilk);
    }
    if (Coffee === "") {
      updateName(defaultName);
    }
    const deleteCoffee = {
      name: Person,
      number: inombolo,
      coffeeName: Coffee,
      coffeeSize: Size,
      coffeeMilk: Milk,
    };
    try {
      socket.emit("order complete", deleteCoffee);
      console.log(deleteCoffee)
      axios.post(deleteOrderUrl, deleteCoffee);
      // window.location.reload();
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
        <Grid container sx={{ justifyContent: "center", alignItems: "center", margin: '7.5% 0%' }}>
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
