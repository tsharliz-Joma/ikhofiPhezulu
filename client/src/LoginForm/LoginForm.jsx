// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";
// GOOGLE LOGIN
import { GoogleLogin } from "@react-oauth/google";
// Material UI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

const backEndUserLogin =
  "https://ikhkofiphezulu-server-411e98c28af0.herokuapp.com/api/login";
// const backEndUserLogin = "http://localhost:1969/api/login";

const LoginForm = (props) => {
  const { active, onSuccess, onError } = props;
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const currentUser = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await axios
        .post(backEndUserLogin, currentUser)
        .then(setLoading(true));
      const data = response.data;
      if (data.user) {
        localStorage.setItem("token", data.user);
        setLoading(false);
        window.location.reload();
        // navigate("/");
      } else {
        alert("Please Check your username and password");
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container maxWidth="xs"sx={{ marginTop: "0px" }}>
        <CssBaseline />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
          <Avatar
            sx={{
              bgcolor: "info.light",
              mr: 2,
            }}
          />
          <Typography>Sign In</Typography>
        </Box>
        <Box
          sx={{
            marginTop: "0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox value="remember" color="primary" size="small" />
              }
              label="Remember me"
            />
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ fontSize: 16 }}>
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={6}>
                <GoogleLogin onSuccess={onSuccess} onError={onError} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Typography color={"info.light"}>
                  <Link
                    href="#"
                    color="inherit"
                    underline={"hover"}
                    variant="body2">
                    Forgot password?
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography color={"info.light"}>
                  <Link
                    href="/register"
                    color={"inherit"}
                    underline={"hover"}
                    variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default LoginForm;
