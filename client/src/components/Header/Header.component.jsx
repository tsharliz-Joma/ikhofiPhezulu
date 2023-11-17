// @ts-nocheck
import React from "react";
import Wave from "react-wavify";
import { Typography, Box } from "@mui/material";
import "./Header.component.css";

const Header = (props) => {
  const { title, theme, fontSize, color } = props;

  const textStyles = {
    fontWeight: "bold",
    paddingTop: "35px",
    paddingBottom: "20px",
    position: "relative",
    fontSize: "30px",
    color: "#000",
  };

  const waveCustomStyles = {
    display: "flex",
    top: "0px",
    width: "100%",
    transform: "rotate(180deg)",
    position: "absolute",
  };

  return (
    <Box
      fontFamily={theme.typography.fontFamily}
      xs={12}
      sx={{ textAlign: "center", padding: "35px 0px", fontWeight: "bold" }}>
      <Wave
        fill={color}
        paused={false}
        style={waveCustomStyles}
        options={{
          height: 3,
          amplitude: 10,
          speed: 0.2,
          points: 3,
        }}
      />
      <Typography
        sx={{
          position: "relative",
          color: "#000",
          fontWeight: "700",
          fontSize: { xs: "3em", md: "3.5em", lg: "4em" },
        }}>
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
