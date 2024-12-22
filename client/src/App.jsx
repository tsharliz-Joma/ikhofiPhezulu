import "./App.css";
import React from "react";
import Header from "./modules/header/Header.component";
import HeroVideo from "./assets/hero.mp4";
import HeroMedia from "./modules/heroMedia/HeroMedia";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Button } from "@mui/material";

const App = ({ socket }) => {
  return (
    <Box>
      <Header title="Coffee up" fontSize={42} />
      <Container sx={{ padding: "0!important" }}>
        <HeroMedia src={HeroVideo} />
        <Box sx={{ px: "2rem", py: "3rem" }}>
          <Button variant="contained" sx={{ borderRadius: "50px" }} fullWidth>
            <Link
              href="/order"
              variant="button"
              color={"primary.black"}
              underline="none"
              sx={{ fontSize: "1.15rem" }}
            >
              Order now
            </Link>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
