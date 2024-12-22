import React from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ErrorContainer = styled(Box)`
  background-color: #f8d7da;
  color: #721c24;
  padding: 8px;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-top: 10px;
  text-align: center;
`;

const ErrorDisplay = ({ error }) => {
  if (!error) return null;

  return (
    <ErrorContainer>
      <Typography variant="body1">{error}</Typography>
    </ErrorContainer>
  );
};

export default ErrorDisplay;
