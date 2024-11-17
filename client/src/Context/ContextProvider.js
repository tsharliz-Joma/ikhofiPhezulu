import React, { useState, useEffect, createContext, useContext, useMemo, useReducer } from "react";
import jwt from "jsonwebtoken";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { json } from "react-router";

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

export const getLocalStorageData = (primaryKey, secondaryKey) => {
  const localToken = localStorage.getItem(primaryKey);
  const googleToken = localStorage.getItem(secondaryKey);

  if (googleToken) {
    try {
      const user = JSON.parse(googleToken);
      return { user };
    } catch (error) {
      console.error("Failed to parse googleToken:", error);
    }
  }

  if (localToken) {
    try {
      const user = jwt.decode(localToken);
      if (user) {
        return { user };
      } else {
        console.error("Failed to decode localToken: Token is invalid or expired");
      }
    } catch (error) {
      console.error("Failed to decode localToken:", error);
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
      const tokenData = getLocalStorageData("token", "googleToken");
      if (tokenData) {
        dispatch({ type: "LOGIN", payload: tokenData });
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`, {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          localStorage.setItem("googleToken", JSON.stringify(res.data));
          dispatch({ type: "LOGIN", payload: res.data });
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed", error),
  });

  const handleGoogleError = useMemo((response) => {
    // console.log(response);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (state.user) {
  //     localStorage.setItem("token", JSON.stringify(state));
  //   }
  // }, [state]);

  const value = { state, dispatch, handleGoogleLogin, handleGoogleError };

  // console.log(value);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
