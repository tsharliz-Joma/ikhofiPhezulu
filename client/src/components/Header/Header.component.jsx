// @ts-nocheck
import React from "react";
import Wave from "react-wavify";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

const Header = ({ title, fontSize }) => {
  const theme = useTheme();
  const waveCustomStyles = {
    position: "relative",
    top: "0px",
    display: "flex",
    width: "100%",
    transform: "rotate(180deg)",
  };

  return (
    <Box fontFamily={theme.typography.fontFamily} xs={12} sx={{ width: "100%" }}>
      <Wave
        fill={theme.palette.primary.main}
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
          variant="h3"
          sx={{
            color: "#000",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
