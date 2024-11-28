import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {
  Grid,
  TextField,
} from "@mui/material";
import Link from "@mui/material/Link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Container, CssBaseline, Button } from "@mui/material";
// const backEndUserRegister = `https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/register`;
const backEndUserRegister = `http://localhost:1969/api/register`;

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Making this function into a helper function you can use anywhere , just import it and call it
  // with the appropriate arguments
  // async function handleSubmit(method, headersObject, redirect){
  //   e.preventDefault();
  //   const response = await fetch(backEndUserRegister, {
  //     method: method,
  //     headers: headersObject,
  //     body: JSON.stringify(formData),
  //   });
  //   const data = await response.json();
  //   if (data.status === "ok") {
  //     // I want a new state here, then i set a timeout, the new state will hold an overlay
  //     // this overlay div will play the animation of a coffee pouring and then it will redirect to the
  //     // login page
  //     navigate(redirect);
  //   } else {
  //     console.error("error");
  //   }
  // }

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch(backEndUserRegister, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.status === "ok") {
      // I want a new state here, then i set a timeout, the new state will hold an overlay
      // this overlay div will play the animation of a coffee pouring and then it will redirect to the
      // login page
      navigate("/");
    } else {
      console.error("error");
    }
  };

  return (
    <>
      <Container maxWidth={"xs"}>
        <CssBaseline />
        <Box sx={{}}>
          <Box
            component={"form"}
            onSubmit={registerUser}
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
              sx={{ mb: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              sx={{ mb: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="number"
              type="number"
              label="Number"
              name="number"
              autoComplete="number"
              autoFocus
              onChange={handleChange}
              sx={{ mb: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              name="password"
              autoComplete=""
              autoFocus
              onChange={handleChange}
              sx={{ mb: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password-confirmation"
              label="Confirm Password"
              type="password"
              name="Confirm Password"
              autoComplete=""
              autoFocus
              onChange={handleChange}
              sx={{ mb: 1 }}
            />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Link href="/">
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ my: 3, fontSize: 16 }}>
                    <ArrowBackIosIcon />
                    Back
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ my: 3, fontSize: 16 }}>
                  Register
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

export default SignUpForm;
