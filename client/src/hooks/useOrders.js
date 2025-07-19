import { useState, useEffect, useCallback } from "react";
import api from "@/utils/utils";

export const useOrders = (apiRoute, socket) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(apiRoute);
      if (response.data === "No Coffee Orders") {
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
  }, [apiRoute]);

  useEffect(() => {
    fetchOrders();

    const handleNewOrder = (order) => {
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
  }, [apiRoute, socket, fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
};
