import "./App.css";
import React from "react";
import Header from "components/header/Header.component";
import HeroVideo from "./assets/hero.mp4";
import HeroMedia from "./modules/heroMedia/HeroMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "components/footer/Footer";

const App = ({ socket }) => {
  return (
    <Box>
      <Header title="coffee up" />
      <Box sx={{ textAlign: "center" }}>
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
          <Typography
            color="primary.main"
            gutterBottom
            sx={{
              mt: 4,
              fontSize: {
                xs: "1.825rem",
                md: "2.125rem",
                fontWeight: "bold",
                lineHeight: "110%",
                letterSpacing: "0.1rem",
              },
            }}
          >
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
              padding: { xs: "0.5rem 2rem", md: "0.75rem 2rem" },
              fontSize: { xs: "1rem", md: "1.15rem" },
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
