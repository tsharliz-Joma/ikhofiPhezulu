import "./App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/header/Header.component";
import HeroVideo from "./assets/hero.mp4";
import HeroMedia from "./modules/heroMedia/HeroMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "./components/footer/Footer";

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

      <Footer />
    </Box>
  );
};

export default App;
