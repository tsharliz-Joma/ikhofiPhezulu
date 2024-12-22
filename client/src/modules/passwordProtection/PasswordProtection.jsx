import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useData } from "@/hooks/useData";
import api from "@/utils/uitls";

const PasswordProtection = ({ children }) => {
  const theme = useTheme();
  const { dispatch, state } = useData();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(process.env.REACT_APP_ADMIN_PWD_API, { password: password });
      if (response.status === 200) {
        sessionStorage.setItem(process.env.REACT_APP_ADMINKEY, "true");
        dispatch({ type: "SET_ADMIN", payload: true });
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (state.admin) {
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
