// @ts-nocheck
import React from "react";
import Wave from "react-wavify";
import './Header.component.css'

const Header = (props) => {
  const { title } = props;

  const textStyles = {
    fontWeight: "bold",
    paddingTop: "48px",
    paddingBottom: "16px",
    position: "relative",
    fontSize: "40px",
    color: "#F2E2C5",
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
        fill="#2E1F14"
        paused={false}
        style={waveCustomStyles}
        options={{
          height: 20,
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
