// @ts-nocheck
import React, { useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56, mb: 2 }} />
        <Typography variant="h5" color="primary.main" fontWeight="bold">
          Welcome Back!
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Please sign in to continue.
        </Typography>
      </Box>

      <Box onSubmit={onSubmit} ref={formRef} component="form" sx={{ mt: 1 }}>
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
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {error ? (
          <Typography color="error.main" textAlign="center" mt={2}>
            Incorrect email or password
          </Typography>
        ) : null}
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                borderRadius: "2rem",
                padding: "0.75rem 2rem",
                fontSize: "1.15rem",
                backgroundColor: "primary.light",
              }}
            >
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12}>
            <GoogleLogin size={"medium"} onSuccess={onSuccess} onError={onError} />
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" mt={3}>
          <Grid item>
            <Link href="#" variant="body2" underline={"hover"} color="secondary.main">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default LoginForm;
