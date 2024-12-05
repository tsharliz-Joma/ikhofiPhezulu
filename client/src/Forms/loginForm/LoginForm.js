// @ts-nocheck
import React, { useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

const LoginForm = ({
  handleSubmit,
  handleGoogleLogin,
  handleGoogleError,
  onSuccess,
  onError,
  error,
}) => {
  const formRef = useRef(null);
  const invalidClasses = [
    "!border-feedback-red",
    "!text-feedback-red",
    "placeholder:!text-feedback-red",
  ];

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
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          py: "1rem",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "info.light",
            mr: 2,
            width: { xs: "2rem", lg: "3rem" },
            height: { xs: "2rem", lg: "3rem" },
          }}
        />
        <Typography sx={{ fontSize: { sm: "1.25rem", lg: "1.5rem" } }}>Sign In</Typography>
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
        <form onSubmit={onSubmit} ref={formRef}>
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
            control={<Checkbox value="remember" color="primary" size="small" />}
            label="Remember me"
          />
          {error ? (
            <Typography
              sx={{
                color: "error.main",
                fontSize: { xs: "1rem", lg: "1.25rem" },
                textAlign: "center",
              }}
            >
              Incorrect email or password
            </Typography>
          ) : null}
          <Grid container columnSpacing={2} sx={{ my: 5 }}>
            <Grid item xs={6} lg={5}>
              <Button type="submit" fullWidth variant="contained">
                Sign In
              </Button>
            </Grid>
            <Grid item xs={6} lg={5}>
              <GoogleLogin size={"medium"} onSuccess={onSuccess} onError={onError} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Typography
                sx={{
                  color: "info.light",
                  fontSize: { xs: "1rem", lg: "1.25rem" },
                }}
              >
                <Link href="#" color="inherit" underline={"hover"}>
                  Forgot password?
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};
export default LoginForm;
