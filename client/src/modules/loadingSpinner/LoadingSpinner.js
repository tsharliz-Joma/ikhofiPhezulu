import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Overlay } from "./LoadingSpinner.styles";

const LoadingSpinner = () => {
  return (
    <Overlay>
      <CircularProgress color="primary" />
    </Overlay>
  );
};

export default LoadingSpinner;
