import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const PasswordProtection = ({ children }) => {
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === adminPassword) {
      sessionStorage.setItem("$admin", "true");
      setAccessGranted(true);
    } else {
      setError(true);
    }
  };

  if (accessGranted && sessionStorage.getItem("$admin") === "true") {
    return children;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      }}
    >
      <Typography variant="h6">Enter Admin Password</Typography>
      <form style={{ width: "100%", maxWidth: "400px" }} onSubmit={handleSubmit}>
        <TextField
          type="password"
          label="password"
          error={error}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          helperText={error ? "Incorrect Password" : ""}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PasswordProtection;
