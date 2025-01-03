import "./App.css";
import React from "react";
import Header from "./components/header/Header.component";
import HeroVideo from "./assets/hero.mp4";
import HeroMedia from "./modules/heroMedia/HeroMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const App = ({ socket }) => {
  return (
    <Box>
      <Header title="coffee up" />
      <Box sx={{ height: "100%", textAlign: "center" }}>
        <HeroMedia src={HeroVideo} />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h1" color="primary.main" gutterBottom sx={{ mt: 4 }}>
            Fresh Coffee, Delivered Fast!
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Order your favorite brew in seconds. No lines, no wait—just great coffee!
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/menu"
            sx={{
              borderRadius: "50px",
              padding: { xs: "1rem 3rem", md: "0.75rem 2rem" },
              fontSize: "1.15rem",
              backgroundColor: "primary.light",
            }}
          >
            Order Now
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          py: 0.5,
          backgroundColor: "background.black",
          textAlign: "center",
          borderTop: "0.5px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 Jsphere Pty Ltd. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
