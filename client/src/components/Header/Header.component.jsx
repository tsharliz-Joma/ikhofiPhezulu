// @ts-nocheck
import React from "react";
import Wave from "react-wavify";
import { Typography, Box, Container } from "@mui/material";
import "./Header.component.css";

const Header = (props) => {
  const { title, theme, fontSize, color } = props;

  const waveCustomStyles = {
    position: "relative",
    top: "0px",
    display: "flex",
    width: "100%",
    transform: "rotate(180deg)",
  };

  return (
    <Container fontFamily={theme.typography.fontFamily} xs={12} sx={{ width: "100%" }}>
      <Wave
        fill={color}
        paused={false}
        style={waveCustomStyles}
        options={{
          height: 15,
          amplitude: 10,
          speed: 0.2,
          points: 4,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "0px",
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontWeight: "700",
            fontSize: { xs: fontSize, md: "3.5em", lg: "4em" },
          }}
        >
          {title}
        </Typography>
      </Box>
    </Container>
  );
};

export default Header;
