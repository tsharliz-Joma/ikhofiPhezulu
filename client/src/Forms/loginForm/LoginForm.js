// @ts-nocheck
import React, { useRef, useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

const LoginForm = ({ handleSubmit, handleGoogleLogin, handleGoogleError }) => {
  const formRef = useRef(null);
  const invalidClasses = ["!border-feedback-red", "!text-feedback-red", "placeholder:!text-feedback-red"];

  const onSubmit = (e) => {
    e.preventDefault();
    if (formRef.current) {
      if (formRef.current.checkValidity()) {
        const formData = new FormData(formRef.current);
        handleSubmit(formData);
      } else {
        const inputs = Array.from(formRef.current.getElementsByTagName("input"));
        inputs.forEach((input) => {
          const feedback = input.nextElementSibling;
          if (!input.checkValidity()) {
            input.classList.add(...invalidClasses);
            if (feedback) {
              feedback.classList.remove("hidden");
            }
          } else {
            input.classList.remove(...invalidClasses);
            if (feedback) {
              feedback.classList.add("hidden");
            }
          }
        });
      }
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ margin: "0px 0px 10% 0px" }}>
        <CssBaseline />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "info.light",

              mr: 2,
              width: { xs: "25px", lg: "50px" },
              height: { xs: "25px", lg: "50px" },
            }}
          />
          <Typography sx={{ fontSize: { sm: "12px", md: "16px", lg: "26px" } }}>Sign In</Typography>
        </Box>
        <Box
          sx={{
            marginTop: "0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <form onSubmit={onSubmit} noValidate ref={formRef}>
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
            <FormControlLabel control={<Checkbox value="remember" color="primary" size="small" />} label="Remember me" />
            <Grid container spacing={2} sx={{ my: 3 }}>
              <Grid item xs={6}>
                <Button type="submit" fullWidth variant="contained" sx={{ fontSize: 16 }}>
                  Sign In
                </Button>
              </Grid>
              {/* <Grid item xs={6}>
                <GoogleLogin onSuccess={onSuccess} onError={onError} />
              </Grid> */}
            </Grid>
            <Grid container>
              <Grid item xs>
                <Typography
                  sx={{
                    color: "info.light",
                    fontSize: { xs: "12px", md: "16px" },
                  }}
                >
                  <Link href="#" color="inherit" underline={"hover"}>
                    Forgot password?
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    color: "info.light",
                    fontSize: { xs: "12px", md: "16px" },
                  }}
                >
                  <Link href="/register" color={"inherit"} underline={"hover"}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
};
export default LoginForm;
