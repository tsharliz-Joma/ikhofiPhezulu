import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import "../App.css";

const backEndUrl = "http://localhost:1969/api/coffee";

const OrderForm = (props) => {
  const { socket } = props;
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    coffee: "",
    coffeeSize: "",
    coffeeMilk: "",
    coffeeSugar: "",
  });

  const [employeeName, setEmployeeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleName = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, name: value });
  };

  const handleSizeSelect = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, coffeeSize: value });
  };

  const handleMilkSelect = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, coffeeMilk: value });
  };

  const handleCoffeeSelect = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, coffee: value });
  };

  const handlePhone = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, number: value });
  };

  const handleSugar = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, coffeeSugar: value });
  };

  const handleCoffeeSubmit = async (e) => {
    e.preventDefault();
    const newCoffee = {
      name: employeeName,
      number: phoneNumber,
      coffeeName: formData.coffee,
      coffeeMilk: formData.coffeeMilk,
      coffeeSize: formData.coffeeSize,
      coffeeSugar: formData.coffeeSugar,
    };
    try {
      socket.emit("new_order", newCoffee);
      const result = await axios.post(backEndUrl, newCoffee);
      console.log(result);
      setFormData({
        name: "",
        number: "",
        coffee: "",
        coffeeSize: "",
        coffeeMilk: "",
        coffeeSugar: "",
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      setEmployeeName(user.name);
      setPhoneNumber(user.number);
      if (!user) {
        localStorage.removeItem("token");
        console.log("cant find token");
      }
    }
  }, []);

  return (
    <Form
      onSubmit={handleCoffeeSubmit}
      className="font-monospace col-lg-4 col-10 mx-auto">
      <Form.Group className="mt-1">
        <Form.Label className="text-muted" htmlFor="name">
          Name
        </Form.Label>
        <Form.Control
          name="name"
          className="fw-bold  fs-md-1 py-2"
          onChange={handleName}
          value={employeeName ? employeeName : ""}
          id="name"
          type="text"
          placeholder="Enter Your Name"
          disabled
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label className="text-muted" htmlFor="mobile">
          Mobile
        </Form.Label>
        <Form.Control
          name="number"
          className="fw-bold  py-2"
          onChange={handlePhone}
          value={phoneNumber ? phoneNumber : ""}
          id="mobileNumber"
          type="number"
          placeholder="Enter Your Mobile Number"
          disabled
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label className="text-muted" htmlFor="coffeeName">
          Coffee
        </Form.Label>
        <Form.Select className="" onChange={handleCoffeeSelect}>
          <option value="Latte">Latte</option>
          <option value="Flat White">Flat White</option>
          <option value="Cappuccino">Cappuccino</option>
          <option value="Long Black">Long Black</option>
          <option value="Macchiato">Macchiato</option>
          <option value="Long Macchiato">Long Macchiato</option>
          <option value="Espresso">Espresso</option>
          <option value="Double Espresso">Double Espresso</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label className="text-muted" htmlFor="coffeeSize">
          Size
        </Form.Label>
        <Form.Select
          className=""
          value={formData.coffeeSize}
          onChange={handleSizeSelect}>
          <option value="Large">Large</option>
          <option value="Regular">Regular</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label className="text-muted" htmlFor="coffeeMilk">
          Milk of Choice
        </Form.Label>
        <Form.Select
          className=""
          value={formData.coffeeMilk}
          onChange={handleMilkSelect}>
          <option>Full Cream</option>
          <option>Skim Milk</option>
          <option>Soy Milk</option>
          <option>Almond Milk</option>
          <option>Oat Milk</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label className="text-muted" htmlFor="coffeeSugar">
          Sugar
        </Form.Label>
        <Form.Select
          className=""
          value={formData.coffeeSugar}
          onChange={handleSugar}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
      </Form.Group>
      <Stack className="my-4">
        <Button
          type="submit"
          className="dropShadow py-2 btn-outline-dark btn mocha">
          Place Order
        </Button>
        <Link
          to="/"
          className="dropShadow btn my-3 py-2 btn-outline-dark mocha">
          Home
        </Link>
      </Stack>
    </Form>
  );
};

export default OrderForm;
