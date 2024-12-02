import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerComponent = ({ as , size, animation, role, variant }) => {
  
  return (
    <Spinner animation={animation} role={role} as={as} variant={variant} size={size}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default SpinnerComponent;
