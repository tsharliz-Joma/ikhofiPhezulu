import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  font-weight: ${(props) => (props.completed ? "bold" : "normal")};
  color: ${(props) => (props.completed ? "green" : "gray")};
`;

const OrderStatusTracker = ({ orderId, socket }) => {
  const [status, setStatus] = useState("");
  const [steps, setSteps] = useState([
    { label: "Order Placed", completed: true },
    { label: "Preparing", completed: false },
    { label: "Ready for Pickup", completed: false },
    { label: "Picked Up", completed: false },
  ]);

  const updateSteps = useCallback(
    (newStatus) => {
      const updatedSteps = steps.map((step) => ({
        ...step,
        completed: step.label === newStatus || step.completed,
      }));

      setSteps(updatedSteps);
      setStatus(newStatus);
    },
    [steps]
  );

  useEffect(() => {
    if (socket) {
      socket.on("orderStatusUpdate", (newStatus) => {
        if (newStatus.orderId === orderId) {
          updateSteps(newStatus.status);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("orderStatusUpdate");
      }
    };
  }, [orderId, socket, updateSteps]);

  return (
    <Container>
      <Heading>Order Status: {status}</Heading>
      <List>
        {steps.map((step, index) => (
          <ListItem key={index} completed={step.completed}>
            {step.label}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default OrderStatusTracker;
