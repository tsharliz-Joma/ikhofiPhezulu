// @ts-nocheck
import React from "react";
import Wave from "react-wavify";
import { Typography } from "@mui/material";
import './Header.component.css'

const Header = (props) => {
  const { title, theme } = props;

  const textStyles = {
    fontWeight: "bold",
    paddingTop: "35px",
    paddingBottom: "20px",
    position: "relative",
    fontSize: "40px",
    color: "#000",
  };

  const waveCustomStyles = {
      display: "flex",
      top: '0px',
      width: '100%',
      transform: 'rotate(180deg)',
      position: 'absolute',
  };

  return (
    <div id="header-container" className="col-12 text-center font-monospace">
      <Wave
        fill={theme.palette.primary.main}
        paused={false}
        style={waveCustomStyles}
        options={{
          height: 35,
          amplitude: 10,
          speed: 0.2,
          points: 3,
        }}
      />
      <p style={textStyles}>{title}</p>
    </div>
  );
};

export default Header;
