import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import List from "../components/List";
import DialogueBox from "../components/DialogueBox";

const viewOrderUrl = "http://localhost:1969/api/view-orders";
const checkOrderUrl = "http://localhost:1969/api/check-orders";
const deleteOrderUrl = "http://localhost:1969/api/sendCoffee";
// const socket = io.connect("http://localhost:1969", { autoConnect: false });

const Dashboard = ({socket}) => {
  const [reloadOrders, setReloadOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState("");
  const [selCoffSize, setSelCoffSize] = useState("");
  const [selCoffMilk, setSelCoffMilk] = useState("");
  const [selCoffPerson, setSelCoffPerson] = useState("");
  const [selCoffName, setSelCoffName] = useState("");

  // This is a callback function
  function setStates(e) {
    sliceCoffeeName(selectedCoffee);
    sliceOrderPerson(selectedCoffee);
    sliceCoffeeSize(selectedCoffee);
    sliceCoffeeMilk(selectedCoffee);
  }
  // this function is where i will have to use an api, to send a text message or slack message
  const displayOptions = (e) => {
    e.preventDefault(); // Preventing the default refresh on button click
    setSelected(true); // setting this state to true ( this triggers the overlay)
    setSelectedCoffee(e.target.textContent); // set the selectedCoffee to the text content of the button clicked
    setStates();
  };

  function sliceCoffeeName(string) {
    var matchedName;
    const latte = string.match(/Latte/);
    const cappuccino = string.match(/Cappuccino/);
    const flatWhite = string.match(/Flat\sWhite/);
    const espresso = string.match(/Espresso/);
    const doubleEspresso = string.match(/Double\sEspresso/);
    const shortMacchiato = string.match(/Short\sMacchiato/);
    const longMacchiato = string.match(/Long\sMacchiato/);
    const longBlack = string.match(/Long\sBlack/);
    if (latte) {
      matchedName = latte;
    } else if (cappuccino) {
      matchedName = cappuccino;
    } else if (flatWhite) {
      matchedName = flatWhite;
    } else if (doubleEspresso) {
      matchedName = doubleEspresso;
    } else if (espresso) {
      matchedName = espresso;
    } else if (shortMacchiato) {
      matchedName = shortMacchiato;
    } else if (longMacchiato) {
      matchedName = longMacchiato;
    } else if (longBlack) {
      matchedName = longBlack;
    } else {
      matchedName = "";
    }
    return setSelCoffName(matchedName);
  }

  function sliceOrderPerson(string) {
    let matchedName;
    const name = string.match(/(?<name>[^-]+)/);
    const groupsName = name.groups.name;
    const splitReverse = groupsName.split("").reverse();
    const nameShift = splitReverse.shift();
    const nameBack = splitReverse.reverse().join("");
    if (nameBack) {
      matchedName = nameBack;
    } else {
      return (matchedName = "offWhite");
    }
    return setSelCoffPerson(matchedName);
  }

  function sliceCoffeeSize(string) {
    let matchedSize;
    const glass = string.match(/Glass(?=\s)/);
    const cup = string.match(/Cup(?=\s)/);
    const mug = string.match(/Large(?=\s)/);
    if (glass) {
      matchedSize = glass;
    } else if (cup) {
      matchedSize = cup;
    } else if (mug) {
      matchedSize = mug;
    }
    return setSelCoffSize(matchedSize);
  }

  function sliceCoffeeMilk(string) {
    let matchedMilk;
    const almondmilk = string.match(/Almond*\sMilk/);
    const fullcreamMilk = string.match(/Full*\scream*\sMilk/);
    const skimMilk = string.match(/Skim*\sMilk/);
    const soyMilk = string.match(/Soy*\sMilk/);
    const oatMilk = string.match(/Oat/);
    if (almondmilk) {
      matchedMilk = almondmilk;
    } else if (fullcreamMilk) {
      matchedMilk = fullcreamMilk;
    } else if (skimMilk) {
      matchedMilk = skimMilk;
    } else if (soyMilk) {
      matchedMilk = soyMilk;
    } else if (oatMilk) {
      matchedMilk = oatMilk;
    } else {
      matchedMilk = "Full Cream";
    }
    return setSelCoffMilk(matchedMilk);
  }

  const cancelOrSend = (e) => {
    e.preventDefault();
    if (e.target.innerText === "Back") {
      cancel();
    } else if (e.target.innerText === "Coffee Up") {
      send();
    }
  };

  const send = () => {
    let defaultMilk = "Full cream";
    let defaultName = "George";
    function updateMilk() {
      setSelCoffMilk(defaultMilk);
    }
    function updateName() {
      setSelCoffPerson(defaultName);
    }
    if (selCoffMilk === "") {
      updateMilk();
    }
    if (selCoffName === "") {
      updateName();
    }
    const deleteCoffee = {
      name: selCoffPerson,
      coffeeName: selCoffName,
      coffeeSize: selCoffSize,
      coffeeMilk: selCoffMilk,
    };
    try {
      axios.post(deleteOrderUrl, deleteCoffee);
    } catch (error) {
      console.log(error);
    }
    setSelected(false);
    // do this last after you have sent the api notification and also removed the coffee
    // from the database
  };

  const cancel = () => {
    setSelected(false);
  };

  useEffect(() => {
    socket.on("New Order", (msg) => {
      setOrders(((orders) => [...orders, msg]))
    });
  }, [socket]);

  useEffect(() => {
    let coffeeOrders;
    const getOrders = async () => {
      try {
        await axios.get(viewOrderUrl).then((res) => {
          if (res.data.orders === "No Coffee Orders") {
            alert("failed to retrieve orders");
          } else {
            coffeeOrders = res.data.orders;
          }
          setOrders(coffeeOrders); 
        });
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Orders</h3>
        {orders.length !== 0 && (
          <div className="coffee-orders-div">
            <ul className="coffee-order-ul">
              {selected && (
                <DialogueBox onClick={cancelOrSend} cDot={selectedCoffee} />
              )}
              <List list={orders} onClick={displayOptions} />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
