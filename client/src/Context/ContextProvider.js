import React, { useEffect, createContext, useReducer } from "react";
import jwt from "jsonwebtoken";

// const getServerData = (url) => async () => {};

const initialState = { user: null, loading: false, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const DataContext = createContext();

export const getSessionStorageData = (primaryKey, secondaryKey) => {
  const sessionToken = sessionStorage.getItem(primaryKey);
  const googleToken = sessionStorage.getItem(secondaryKey);

  if (googleToken) {
    try {
      const user = JSON.parse(googleToken);
      return { user };
    } catch (error) {
      console.error("Failed to parse googleToken:", error);
    }
  }

  if (sessionToken) {
    try {
      const user = jwt.decode(sessionToken);
      if (user) {
        return { user };
      } else {
        console.error("Failed to decode sessionToken: Token is invalid or expired");
      }
    } catch (error) {
      console.error("Failed to decode sessionToken:", error);
      return { user: "No user here" };
    }
  }

  return null; // Return a default value if no token is found or decoding fails
};

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchData() {
    try {
      console.log("Fetching data");
      dispatch({ type: "SET_LOADING", payload: true });
      const tokenData = getSessionStorageData("token", "googleToken");
      if (tokenData) {
        dispatch({ type: "LOGIN", payload: tokenData });
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const value = { state, dispatch };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
