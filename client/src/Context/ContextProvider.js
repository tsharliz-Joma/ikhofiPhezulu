import React, { useEffect, createContext, useReducer } from "react";
import jwt from "jsonwebtoken";
// import { getAllMenuItems } from "@/api/helpers";
import { getAllMenuItems } from "../api/helpers";

const initialState = {
  cart: JSON.parse(sessionStorage.getItem("cart")) || [],
  menu: null,
  admin: null,
  user: null,
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        admin: false,
        loading: false,
      };
    case "SET_ADMIN":
      return {
        ...state,
        admin: action.payload,
        loading: false,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
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

    case "FETCH_MENU_SUCCESS":
      return {
        ...state,
        menu: action.payload,
        loading: false,
        error: null,
      };

    case "FETCH_MENU_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD_TO_CART":
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.modifiers) === JSON.stringify(action.payload.modifiers)
      );
      if (existingItemIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: (
            parseInt(updatedCart[existingItemIndex].quantity) + parseInt(action.payload.quantity)
          ).toString(),
        };
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            { ...action.payload, quantity: action.payload.quantity.toString() },
          ],
        };
      }

    case "UPDATE_CART_QUANTITY":
      const updateCartQuantity = state.cart.map((item) =>
        item.id === action.payload.id &&
        JSON.stringify(item.modifiers) === JSON.stringify(action.payload.modifiers)
          ? { ...item, quantity: action.payload.quantity.toString() }
          : item
      );
      sessionStorage.setItem("cart", JSON.stringify(updateCartQuantity));
      return {
        ...state,
        cart: updateCartQuantity,
      };

    case "REMOVE_FROM_CART":
      const filteredCart = state.cart.filter(
        (item, index) =>
          !(
            item.id === action.payload.id &&
            JSON.stringify(item.modifiers) === JSON.stringify(action.payload.modifiers)
          )
      );
      sessionStorage.setItem("cart", JSON.stringify(filteredCart));
      return {
        ...state,
        cart: filteredCart,
      };

    case "CLEAR_CART":
      sessionStorage.removeItem("carts");
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export const DataContext = createContext();

export const getSessionStorageData = (primaryKey, secondaryKey) => {
  const sessionToken = sessionStorage.getItem(primaryKey);
  const googleToken = sessionStorage.getItem(secondaryKey);
  const admin = sessionStorage.getItem("admin");

  if (googleToken) {
    try {
      const user = JSON.parse(googleToken);
      return { user, admin };
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

  const fetchData = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const tokenData = getSessionStorageData("admin-access-token", "googleToken");
      const admin = sessionStorage.getItem(process.env.REACT_APP_ADMINKEY);
      const user = sessionStorage.getItem(process.env.REACT_APP_USER_TOKEN);
      if (!admin) {
        if (user) {
          dispatch({ type: "SET_USER", payload: user });
        }
        return "No admin or user";
      } else if (admin) {
        dispatch({ type: "SET_ADMIN", payload: admin });
        if (tokenData) {
          dispatch({ type: "LOGIN", payload: tokenData });
        } else {
          return "No token data";
        }
      } else {
        dispatch({ type: "SET_ADMIN", payload: false });
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchMenu = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await getAllMenuItems();
      dispatch({ type: "FETCH_MENU_SUCCESS", payload: data.data });
    } catch (error) {
      dispatch({ type: "FETCH_MENU_ERROR", payload: "Failed to fetch menu items" });
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchData();
  }, []);

  const value = { state, dispatch };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
