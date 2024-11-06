import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
// Material UI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../App.css";

// const backEndUrl =
//   "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/coffee";
const backEndUrl = "http://localhost:1969/api/coffee";

const OrderForm = (props) => {
  const { socket } = props;
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    id: ''
  });

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    coffee: "",
    coffeeSize: "",
    coffeeMilk: "",
    coffeeSugar: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoffeeSubmit = async (e) => {
    e.preventDefault();
    const newOrder = {
      name: userData.name,
      userId: userData.id,
      email: userData.email,
      number: formData.number,
      coffeeName: formData.coffee,
      coffeeMilk: formData.coffeeMilk,
      coffeeSize: formData.coffeeSize,
      coffeeSugar: formData.coffeeSugar,
    };

    try {
      socket.emit("new order", newOrder);
      const result = await axios
        .post(backEndUrl, newOrder)
        // .then(window.location.reload());
      console.log(result)
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const googleToken = localStorage.getItem("googleToken");
    if (token) {
      const user = jwt.decode(token);
      setUserData(user);
    } else if (googleToken) {
      const jsonGoogleToken = JSON.parse(googleToken);
      setUserData(jsonGoogleToken);
    } else {
      localStorage.removeItem("token");
      console.log("cant find token");
    }
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}>
          <Box
            component={"form"}
            onSubmit={handleCoffeeSubmit}
            sx={{ mt: 0, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleChange}
              value={userData.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="number"
              id="number"
              type="number"
              label="Mobile Number"
              autoComplete="number"
              autoFocus
              onChange={handleChange}
              value={formData.number}
              sx={{ mb: 5 }}
            />
            <Box>
              <Typography fontSize={20}>Coffee order</Typography>
              <FormControl fullWidth required sx={{ mt: 1 }}>
                <InputLabel>Coffee</InputLabel>
                <Select
                  labelId="coffee"
                  label="coffee"
                  name="coffee"
                  value={formData.coffee}
                  onChange={handleChange}>
                  <MenuItem value={"Flat White"}>Flat White</MenuItem>
                  <MenuItem value={"Latte"}>Latte</MenuItem>
                  <MenuItem value={"Cappuccino"}>Cappuccino</MenuItem>
                  <MenuItem value={"Espresso"}>Espresso</MenuItem>
                  <MenuItem value={"Double Espresso"}>Double Espresso</MenuItem>
                  <MenuItem value={"Long Black"}>Long Black</MenuItem>
                  <MenuItem value={"Macchiato"}>Macchiato</MenuItem>
                  <MenuItem value={"Long Macchiato"}>Long Macchiato</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <FormControl fullWidth required sx={{ mt: 2 }}>
              <InputLabel>Size</InputLabel>
              <Select
                labelId="size"
                label="size"
                name="coffeeSize"
                value={formData.coffeeSize}
                onChange={handleChange}>
                <MenuItem value={"Regular"}>Regular</MenuItem>
                <MenuItem value={"Large"}>Large</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth required sx={{ mt: 2 }}>
              <InputLabel>Milk</InputLabel>
              <Select
                labelId="milk"
                label="milk"
                name="coffeeMilk"
                value={formData.coffeeMilk}
                onChange={handleChange}>
                <MenuItem value={"Full Cream"}>Full</MenuItem>
                <MenuItem value={"Skim Milk"}>Skim</MenuItem>
                <MenuItem value={"Soy Milk"}>Soy</MenuItem>
                <MenuItem value={"Almond Milk"}>Almond</MenuItem>
                <MenuItem value={"Oat Milk"}>Oat</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Sugar</InputLabel>
              <Select
                labelId="sugar"
                label="sugar"
                name="coffeeSugar"
                value={formData.coffeeSugar}
                onChange={handleChange}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Link href="/">
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ my: 3, fontSize: 16 }}>
                    <ArrowBackIosIcon />
                    Runaway
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ my: 3, fontSize: 16 }}>
                  Fish Fillet
                  <ArrowForwardIosIcon />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default OrderForm;
