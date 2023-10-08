import axios from "axios";
import React, { useState, useEffect } from "react";
import List from "../../components/List/List";
import DialogueBox from "../../components/DialogueBox/DialogueBox";
import Header from "../../components/Header/Header.component";
// @ts-ignore
import CoffeeItems from "../../JsonFiles/Coffee.json";

const viewOrderUrl = "http://localhost:1969/api/view-orders";
const deleteOrderUrl = "http://localhost:1969/api/sendCoffee";

const Dashboard = ({ socket }) => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState("");
  const [Size, setSize] = useState("");
  const [Milk, setMilk] = useState("");
  const [Person, setPerson] = useState("");
  const [Coffee, setCoffee] = useState("");
  const [inombolo, setInombolo] = useState("");

  const displayOptions = (e) => {
    e.preventDefault();
    console.log(e.target.innerText)
    setSelected(true);
    setSelectedCoffee(e.target.innerText);
    IsmJabana(e.target.innerText);
    IsmaZol(e.target.innerText);
    ShaySize(e.target.innerText);
    ShayLaban(e.target.innerText);
    sliceInombolo(e.target.innerText);
  };

  const sliceInombolo = (string) => {
    const split = string.split(" ");
    const inombolo = split[split.length - 1]
    setInombolo(inombolo);
  };

  const IsmaZol = (string) => {
    const name = string.split(" ")[0];
    console.log(name)
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

  const cancelOrSend = (e) => {
    e.preventDefault();
    if (e.target.innerText === "Back") {
      cancel();
    } else if (e.target.innerText === "Coffee Up") {
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
    // console.log(deleteCoffee);
    try {
      socket.emit("Order Complete", deleteCoffee);
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
    socket.on("order incoming", (msg) => {
      setOrders((orders) => [...orders, msg]);
    });
    
  }, [socket]);

  const handleScroll = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className="font-monospace text-left" onScroll={handleScroll}>
        <Header title="Dash" />
        <div className="">
          {orders.length !== 0 && (
            <div className="">
              <div className="">
                {selected && (
                  <DialogueBox onClick={cancelOrSend} cDot={selectedCoffee} />
                )}
                <List list={orders} onClick={displayOptions} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
