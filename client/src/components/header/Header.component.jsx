// @ts-nocheck
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import CartDrawer from "../cartDrawer/CartDrawer";
import { useData } from "@/hooks/useData";
import { removeFromCart } from "@/context/actions";
import api from "@/utils/uitls";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

const Header = ({ title, fontSize }) => {
  const { state, dispatch } = useData();
  const { cart } = state;
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = async (cart) => {
    try {
      const response = await api.post("/api/square-pay", {
        locationId: "LG9G879R8CFMH",
        customerId: "charles",
        lineItems: cart,
      });
      window.location.href = response.data.data.result.paymentLink.url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromCart = (event) => {
    const orderDetails = {
      id: event.id,
      modifiers: event.modifiers,
    };
    removeFromCart(dispatch, orderDetails.id, orderDetails.modifiers);
  };

  const toggleDrawer = (open) => {
    setIsOpen(open);
  };

  return (
    <AppBar position="sticky" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
          {title}
        </Typography>
        <IconButton onClick={() => toggleDrawer(true)}>
          <Badge badgeContent={cart.length}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      <CartDrawer
        sx={{ border: "1px solid" }}
        onCheckout={handleCheckout}
        onRemove={(event) => handleRemoveFromCart(event)}
        open={isOpen}
        onClose={() => toggleDrawer(false)}
        cart={cart}
      />
    </AppBar>
  );
};

export default Header;
