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

const deleteOrderUrl =
  "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/sendCoffee";
// const deleteOrderUrl =
// "http://localhost:1969/api/sendCoffee";

const Dashboard = ({ socket }) => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState("");
  const [Size, setSize] = useState("");
  const [Milk, setMilk] = useState("");
  const [Person, setPerson] = useState("");
  const [Coffee, setCoffee] = useState("");
  const [inombolo, setInombolo] = useState("");
  const [open, setOpen] = useState(false)
  
  const theme = useTheme();

  const displayOptions = (e) => {
    e.preventDefault();
    // I can make this more concise by make a function that grabs these
    // values, same as in the list component 
    setSelected(true);
    setSelectedCoffee(e.target.innerText);
    IsmJabana(e.target.innerText);
    IsmaZol(e.target.innerText);
    ShaySize(e.target.innerText);
    ShayLaban(e.target.innerText);
    sliceInombolo(e.target.innerText);
    setOpen(true)
  };

  const sliceInombolo = (string) => {
    const split = string.split(" ");
    const inombolo = split[split.length - 1];
    setInombolo(inombolo);
  };

  const IsmaZol = (string) => {
    const name = string.split(" ")[0];
    return setPerson(name);
  };

  const IsmJabana = (string) => {
    const regexPatterns = CoffeeItems.coffees.map(
      (coffeeName) => new RegExp(`\\b${coffeeName}\\b`, "i"),
    );
    const findMatches = (str) => {
      const matches = regexPatterns
        .map((pattern) => str.match(pattern))
        .filter(Boolean);
      return matches.length > 0 ? matches[0][0] : null;
    };
    return setCoffee(findMatches(string) || "Maafih Jabana");
  };

  const ShayLaban = (string) => {
    const regexPatterns = CoffeeItems.milks.map(
      (milkName) => new RegExp(`\\b${milkName}\\b`, "i"),
    );
    const findMatches = (str) => {
      const matches = regexPatterns
        .map((pattern) => str.match(pattern))
        .filter(Boolean);
      return matches.length > 0 ? matches[0][0] : null;
    };
    return setMilk(findMatches(string) || "Maafih Laban");
  };

  const ShaySize = (string) => {
    const regexPatterns = CoffeeItems.sizes.map(
      (sizeName) => new RegExp(`\\b${sizeName}\\b`, "i"),
    );

    const findMatches = (str) => {
      const matches = regexPatterns
        .map((pattern) => str.match(pattern))
        .filter(Boolean);
      return matches.length > 0 ? matches[0][0] : null;
    };

    return setSize(findMatches(string) || "Maafih Size");
  };

  const handleOrder = (e) => {
    e.preventDefault();
    console.log(e.target.innerText)
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
    setOpen(false)
  }

  return (
    <Box>
      <CssBaseline />
      <Header title="Dash" theme={theme} />
      {orders.length !== 0 && (
        <Grid container xs={12}>
          {selected && (
            <DialogueBox handleOrder={handleOrder} open={open} onClose={handleClose} cDot={selectedCoffee} />
          )}
          <Grid container justifyContent="center" alignItems="center" >
            <List list={orders} onClick={displayOptions} theme={theme} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
