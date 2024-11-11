import React, { useState, useEffect, createContext, useContext, useMemo } from "react";

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const ContextProvider = ({ getDataFunc = () => {}, resource, children }) => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataFunc = await getDataFunc();
        const data = dataFunc();
        setState(data);
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, [getDataFunc]);

  const value = useMemo(() => ({ state, loading, error }), [state, loading, error]);


  return <DataContext.Provider value={{ value }}>{children}</DataContext.Provider>;
};
