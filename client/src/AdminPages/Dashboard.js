// import { match } from "assert";
import axios from "axios";
import React, { useState, useEffect } from "react";

const viewOrderUrl = "http://localhost:1969/api/view-orders";
const deleteOrderUrl = "http://localhost:1969/api/sendCoffee";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedName, setSelName] = useState("");
  const [selected, setSelected] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState("");
  const [selCoffSize, setSelCoffSize] = useState("");
  const [selCoffMilk, setSelCoffMilk] = useState("");
  const [selCoffPerson, setSelCoffPerson] = useState("");
  const [selCoffName, setSelCoffName] = useState("")
  const [orderExtras, setOrderExtras] = useState([]);

  // this function is where i will have to use an api, to send a text message or slack message
  const displayOptions = (e) => {
    e.preventDefault();
    setSelected(true);
    setSelectedCoffee(e.target.textContent);

    sliceCoffeeName(selectedCoffee)
    sliceOrderPerson(selectedCoffee);
    sliceCoffeeSize(selectedCoffee);
    sliceCoffeeMilk(selectedCoffee);
  };

  function sliceCoffeeName(string){
    var matchedName;
    const latte = string.match(/Latte(?=\s)/);
    const cappuccino = string.match(/Cappuccino(?=\s)/);
    const flatWhite = string.match(/Flat\sWhite/);
    const espresso = string.match(/Espresso/);
    const doubleEspresso = string.match(/Double\sEspresso/);
    const shortMacchiato = string.match(/Short\sMacchiato/);
    const longMacchiato = string.match(/Long\sMacchiato/);
    const longBlack = string.match(/Long\sBlack/);

    if(latte){
        console.log(matchedName)
        matchedName = latte
    } else if (cappuccino){
        matchedName = cappuccino
    } else if (flatWhite) {
        matchedName = flatWhite
    } else if (espresso){
        matchedName = espresso
    } else if (doubleEspresso) {
        matchedName = doubleEspresso
    } else if (shortMacchiato) {
        matchedName = shortMacchiato
    } else if (longMacchiato) {
        matchedName = longMacchiato
    } else if (longBlack) {
        matchedName = longBlack
    } else {
        matchedName = ''
    }

    return setSelCoffName(matchedName)
  }

  function sliceOrderPerson(string){
    let matchedName;
    const name = string.match(/([^\s])+/);
    console.log(name)
    if(name){
        matchedName = name
    } else {
        return matchedName = "offWhite"
    }
    return setSelCoffPerson(matchedName)
  }

  function sliceCoffeeSize(string){
    let matchedSize;
    const glass = string.match(/Glass(?=\s)/)
    const cup = string.match(/Cup(?=\s)/)
    const mug = string.match(/Large(?=\s)/)

    if(glass){
        matchedSize = glass
    } else if(cup){
        matchedSize = cup 
    } else if(mug){
        matchedSize = mug
    }
    return setSelCoffSize(matchedSize)
  }

  function sliceCoffeeMilk(string){
    let matchedMilk;
    const almondmilk = string.match(/Almond*\sMilk/);
    const fullcreamMilk = string.match(/Full*\scream*\sMilk/);
    const skimMilk = string.match(/Skim*\sMilk/);
    const soyMilk = string.match(/Soy*\sMilk/);
    const oatMilk = string.match(/Oat/);

    if(almondmilk){
        matchedMilk = almondmilk
    } else if (fullcreamMilk) {
        matchedMilk = fullcreamMilk
    } else if (skimMilk) {
        matchedMilk = skimMilk
    } else if (soyMilk) {
        matchedMilk = soyMilk
    } else if (oatMilk){
        matchedMilk = oatMilk
    } else {
        matchedMilk = 'Full Cream'
    }

    return setSelCoffMilk(matchedMilk)
  }

  const send = (e) => {
    e.preventDefault();

    let defaultMilk = 'Full cream'
    let defaultName = 'George'

    function updateMilk(){
        setSelCoffMilk(defaultMilk)
    }
    function updateName(){
        setSelCoffPerson(defaultName)
    }
    if(selCoffMilk === ''){
        updateMilk()
    }
    if(selCoffName === ''){
        updateName()
    }
    const deleteCoffee = {
        name: selCoffPerson,
        coffeeName: selCoffName,
        coffeeSize: selCoffSize,
        coffeeMilk: selCoffMilk,
    };

    try {
      axios.post(deleteOrderUrl, deleteCoffee);
      console.log("Deleted");
    } catch (error) {
      console.log(error);
    }
    setSelected(false);
    // do this last after you have sent the api notification and also removed the coffee
    // from the database
  };

  const cancel = (e) => {
    e.preventDefault();
    setSelected(false);
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(viewOrderUrl);
        const coffeeOrders = response.data.orders;
        setOrders(coffeeOrders);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

//   console.log(orders.length);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Orders</h3>
        {orders.length !== 0 && (
          <div className="coffee-orders-div">
            <ul className="coffee-order-ul">
              {selected && (
                <div className="selectOverlay">
                  <div className="selectInnerOverlay">
                    <div className="">
                      <p className="d-inline-block border rounded bg-light p-2 fs-2 mt-5">
                        {selectedCoffee}
                      </p>
                    </div>
                    <button onClick={cancel} className="btn btn-dark btn-lg">
                      {" "}
                      Back{" "}
                    </button>
                    <button onClick={send} className="btn btn-dark btn-lg">
                      {" "}
                      Coffee Up{" "}
                    </button>
                  </div>
                </div>
              )}
              {orders.map((order) => (
                <div className="order-display-div">
                  <div className="order-inner-div">
                    <p
                      onClick={displayOptions}
                      className="btn fs-5 order-button"
                      key={order.id}>
                      {order.name} - {order.coffeeSize} {order.coffeeMilk}{" "}
                      {order.coffeeName}
                    </p>
                  </div>
                </div>
              ))}
              ;
            </ul>
          </div>
        )}
        ;
      </div>
    </div>
  );
};

export default Dashboard;
