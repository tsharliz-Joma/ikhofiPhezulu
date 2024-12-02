import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useOrders = (api, socket) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(api);
      if (response.data.error === "No Coffee Orders") {
        setError("No Coffee Orders");
        setOrders([]);
      } else {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchOrders();

    const handleNewOrder = (order) => {
      console.log("New order received:", order);
      setOrders((prevOrders) => [...prevOrders, order]);
    };

    if (socket) {
      socket.on("new order", handleNewOrder);
    }

    return () => {
      if (socket) {
        socket.off("new order", handleNewOrder);
      }
    };
  }, [api, socket, fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
};
