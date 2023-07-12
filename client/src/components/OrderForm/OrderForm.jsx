import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import { io } from "socket.io-client";
import './OrderForm.css'

const backEndUrl = "http://localhost:1969/api/coffee";
const SERVERURL = "http://localhost:1969";

const OrderForm = ({ socket }) => {
  const [employeeName, setEmployeeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coffeeName, setCoffeeName] = useState("");
  const [coffeeSize, setCoffeeSize] = useState("");
  const [coffeeSugar, setCoffeeSugar] = useState("");
  const [coffeeMilk, setCoffeeMilk] = useState("");
  const [numberOfCoffee, setNumberOfCoffee] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleName = (e) => {
    setEmployeeName(e.target.value);
  };

  const handleSizeSelect = (e) => {
    setCoffeeSize(e.target.value);
  };

  const handleMilkSelect = (e) => {
    setCoffeeMilk(e.target.value);
  };

  const handleCoffeeSelect = (e) => {
    setCoffeeName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSugar = (e) => {
    setCoffeeSugar(e.target.value);
  };

  const handleCoffeeSubmit = (e) => {
    e.preventDefault();
    // I need to send an object back to the database , containing the information on the form
    const extrasArray = [phoneNumber];
    const newCoffee = {
      name: employeeName,
      coffeeName: coffeeName,
      coffeeMilk: coffeeMilk,
      coffeeSize: coffeeSize,
      extras: extrasArray,
      // newCoffee:
      //   new Date(Date.now()).getHours() +
      //   ":" +
      //   new Date(Date.now()).getMinutes(),
    };
    try {
      console.log("connect");
      socket.emit("new_order", newCoffee);
      axios.post(backEndUrl, newCoffee);
    } catch (error) {
      console.log(error);
    }
    setCoffeeName("");
    setCoffeeSize("");
    setCoffeeSugar("");
    setPhoneNumber("");
    setEmployeeName("");
    setCoffeeSugar(0);
    setButtonDisabled(false);
    setNumberOfCoffee(0);
    setClicks(0);
    navigate("/order-coffee");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      console.log(user);
      setEmployeeName(user.name);
      setPhoneNumber(user.number);
      if (!user) {
        localStorage.removeItem("token");
        console.log("cant find token");
      }
    }
  }, []);

  return (
    <form onSubmit={handleCoffeeSubmit} id="order_form">
      <div className="Header">
        <p className="h-text">Table Talk</p>
      </div>
      <div className="input_container">
        <div className="order_input_box">
          <label htmlFor="name">Name:</label>
          <input
            onChange={handleName}
            value={employeeName}
            id="name"
            type="text"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="order_input_box">
          <label htmlFor="mobile">Mobile:</label>
          <input
            onChange={handlePhone}
            value={phoneNumber}
            id="mobileNumber"
            type="text"
            placeholder="Enter Your Mobile Number"
          />
        </div>
        <div className="order_input_box">
          <label htmlFor="coffeeName" className="details">
            Coffee:
          </label>
          <br></br>
          <select value={coffeeName} onChange={handleCoffeeSelect}>
            <option>Latte</option>
            <option>Flat White</option>
            <option>Cappuccino</option>
            <option>Long Black</option>
            <option>Short Macchiato</option>
            <option>Long Macchiato</option>
            <option>Espresso</option>
            <option>Double Espresso</option>
          </select>
        </div>
        <div className="order_input_box">
          <label htmlFor="coffeeSize" className="details">
            Size:{" "}
          </label>
          <br></br>
          <select value={coffeeName} onChange={handleSizeSelect}>
            <option value="Mug">Mug</option>
            <option value="Cup">Cup</option>
            <option value="Glass">Glass</option>
          </select>
        </div>
        <div className="order_input_box">
          <label htmlFor="coffeeMilk" className="details">
            Milk of Choice:
          </label>
          <br></br>
          <select value={coffeeMilk} onChange={handleMilkSelect}>
            <option value="Full Cream">Full Cream</option>
            <option value="Skim Milk">Skim Milk</option>
            <option value="Soy Milk">Soy Milk</option>
            <option value="Almond Milk">Almond Milk</option>
            <option value="Oat Milk">Oat Milk</option>
          </select>
        </div>
        <div className="order_input_box">
          <label htmlFor="coffeeSugar" className="details">
            Sugar:
          </label>
          <br></br>
          <select value={coffeeSugar} onChange={handleSugar}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div id="ord_btn_div">
          <button className="ord_btn">Place order</button>
          <Link to="/" className="ord_btn">
            Home
          </Link>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
