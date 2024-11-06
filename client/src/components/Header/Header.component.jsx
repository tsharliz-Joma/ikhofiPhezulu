// @ts-nocheck
import React from "react";
import Wave from "react-wavify";
import { Typography, Box, Container } from "@mui/material";
import "./Header.component.css";

const Header = (props) => {
  const { title, theme, fontSize, color } = props;

  const waveCustomStyles = {
    display: "flex",
    top: "0px",
    width: "100%",
    height: "15%",
    transform: "rotate(180deg)",
    position: "relative",
  };

  return (
    <Container
      fontFamily={theme.typography.fontFamily}
      xs={12}
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        padding: { xs: "0px 0px", md: "0px 0px" },
      }}>
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
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}>
        <Typography
          sx={{
            color: "#000",
            fontWeight: "700",
            fontSize: { xs: fontSize, md: "3.5em", lg: "4em" },
          }}>
          {title}
        </Typography>
      </Box>
    </Container>
  );
};

export default Header;
