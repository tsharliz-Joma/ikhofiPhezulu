import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import { io } from "socket.io-client";
import SizeOptions from "../components/SizeOptions";
import MilkOptions from "../components/MilkOptions";
import SugarOptions from "../components/SugarOptions";
import CoffeeOptions from "../components/CoffeeOptions";
import UserInfoOptions from "../components/UserInfoOptions";


const backEndUrl = "http://localhost:1969/api/coffee";
const SERVERURL = "http://localhost:1969";
// const socket = io.connect("http://localhost:1969/");


const Order = ({socket}) => {
  const [employeeName, setEmployeeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coffeeName, setCoffeeName] = useState("");
  const [coffeeSize, setCoffeeSize] = useState("");
  const [coffeeSugar, setCoffeeSugar] = useState("");
  const [coffeeMilk, setCoffeeMilk] = useState("");
  let [numberOfCoffee, setNumberOfCoffee] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  let [clicks, setClicks] = useState(0);
  const [user, setUser] = useState("");

  const [extras, setExtras] = useState([]);

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
    // console.log(e.target.value);
  };

  // ======== HANDLE COFFEE ORDER HERE, MAKE THE POST REQUEST WITH COFFEE DETAILS HERE
  const handleCoffeeSubmit = (e) => {
    e.preventDefault();
    // I need to send an object back to the database , containing the information on the form
    const extrasArray = [phoneNumber, ""];
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
      console.log('connect')
      socket.emit("new_order", newCoffee);
      axios.post(backEndUrl, newCoffee);
    } catch (error) {
      console.log(error);
    }
    setCoffeeName("");
    setCoffeeSize("");
    setCoffeeSugar("");
    setExtras("");
    setPhoneNumber("");
    setEmployeeName("");
    setCoffeeSugar(0);
    setButtonDisabled(false);
    setNumberOfCoffee(0);
    setClicks(0);
    navigate("/order-coffee");
  };
  //=================VERIFY USER LOGGED IN=======================//
  const updateUserName = async () => {
    const req = await axios.get("http://localhost:1969/api/user-data", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = req;
    console.log(data);
    if (data.status === 200) {
      setEmployeeName(data);
      // console.log(data)
    } else {
      alert(data.error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // console.log(token)
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

  //=============================================================//

  return (
    <div className="form-body">
      <div className="b-center">
        <div className="h-text-center">
          <div>
            <h1 className="kanit">
              Good Morning <span>{employeeName}!!</span>
            </h1>
          </div>
          <div>
            <span className="fs-1 kanit ">Enter Your Coffee Order Below</span>
          </div>
        </div>
        <div className="form-container">
          <form onSubmit={handleCoffeeSubmit}>
            <div className="user-info">
              <UserInfoOptions
                handleName={handleName}
                handleNumber={handlePhone}
                pN={phoneNumber}
                eN={employeeName}
              />
              <CoffeeOptions
                handlerFunction={handleCoffeeSelect}
                vHolder={coffeeName}
              />
              <MilkOptions
                handlerFunction={handleMilkSelect}
                vHolder={coffeeMilk}
              />
              <SizeOptions
                handlerFunction={handleSizeSelect}
                vHolder={coffeeSize}
              />
              <SugarOptions
                handlerFunction={handleSugar}
                vHolder={coffeeSugar}
              />
              <div className="numberOf">
                <span className="fw-bold">Select One Option</span>
                <br />
                <span>Quantity: </span>
                <div className="form-check form-check-inline radio">
                  <label htmlFor="oneSelected" className="details">
                    <input
                      onChange={() => setNumberOfCoffee(1)}
                      type={"radio"}
                      className={"form-check-input"}
                      value={1}
                      checked={numberOfCoffee === 1}
                      id={"oneSelected"}
                      disabled={buttonDisabled}
                    />
                  </label>
                </div>
                <div className="form-check form-check-inline radio">
                  <label htmlFor="twoSelected" className="details">
                    + 2
                    <input
                      onChange={() => setNumberOfCoffee(2)}
                      type={"radio"}
                      className={"form-check-input"}
                      value={2}
                      checked={numberOfCoffee === 2}
                      id={"twoSelected"}
                      disabled={buttonDisabled}
                    />
                  </label>
                </div>
                <div className="form-check form-check-inline radio">
                  <label htmlFor="threeSelected" className="details">
                    + 3
                    <input
                      onChange={() => setNumberOfCoffee(3)}
                      type={"radio"}
                      className={"form-check-input"}
                      value={3}
                      checked={numberOfCoffee === 3}
                      id={"threeSelected"}
                      disabled={buttonDisabled}
                    />
                  </label>
                </div>
                <div className="form-check form-check-inline radio">
                  <label htmlFor="fourSelected" className="details">
                    + 4
                    <input
                      onChange={() => setNumberOfCoffee(4)}
                      type={"radio"}
                      className={"form-check-input"}
                      value={4}
                      checked={numberOfCoffee === 4}
                      id={"fourSelected"}
                      disabled={buttonDisabled}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label htmlFor="Note" className="details">
                    Special requests:
                    <input />
                  </label>
                </div>
              </div>
            </div>
            <button className="btn btn-outline-success button">
              Place order
            </button>
          </form>
        </div>
      </div>
      <hr></hr>
      {/* <button className="btn btn-outline-secondary">Previous Orders</button> */}

      <Link to="/" className="btn btn-outline-success">
        Home
      </Link>
    </div>
  );
};

export default Order;
