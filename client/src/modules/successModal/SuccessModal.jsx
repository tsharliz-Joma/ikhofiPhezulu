import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styled from "styled-components";

const Overlay = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const SuccessContainer = styled(Box)`
  background-color: green;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  padding: 20px;
  text-align: center;
`;

const SuccessIcon = styled(CheckCircleIcon)`
  color: white;
  font-size: 50px;
`;

export const SuccessModal = () => {
  return (
    <Overlay>
      <SuccessContainer>
        <SuccessIcon />
      </SuccessContainer>
      <Typography variant="h6" sx={{ color: "white", marginTop: 2, textAlign: "center" }}>
        Order Successfully Submitted. Look out for a text message soon!
      </Typography>
    </Overlay>
  );
};

export default SuccessModal;
