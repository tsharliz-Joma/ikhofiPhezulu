// @ts-nocheck
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import styled from "@emotion/styled";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import CartDrawer from "../cartDrawer/CartDrawer";
import { useData } from "@/hooks/useData";
import { removeFromCart } from "@/context/actions";
import api from "@/utils/uitls";
import { useNavigate } from "react-router-dom";

const StyledHeader = styled(Box)`
  display: grid;
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.black};
`;

const Header = ({ title, fontSize }) => {
  const { state, dispatch } = useData();
  const { cart } = state;
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const formatCartForSquare = (cart) => {
    return cart.map((item) => ({
      catalogObjectId: item.id, // Use item ID as catalogObjectId
      name: item.name, // Include item name
      quantity: item.quantity.toString(), // Convert quantity to string
      basePriceMoney: { amount: Math.round(item.price * 100), currency: "USD" }, // Convert price to cents
      modifiers: Object.values(item.modifiers).map((mod) => ({
        catalogObjectId: mod.id, // Modifier ID
        name: mod.name, // Modifier name
        quantity: "1", // Default quantity for modifier (string)
      })),
    }));
  };

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

  console.log(cart);

  return (
    <StyledHeader fontFamily={theme.typography.fontFamily} xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
          {title}
        </Typography>
        <Badge badgeContent={cart.length} onClick={() => toggleDrawer(true)}>
          <ShoppingCartIcon />
        </Badge>
      </Box>
      <CartDrawer
        sx={{ border: "1px solid" }}
        onCheckout={handleCheckout}
        onRemove={(event) => handleRemoveFromCart(event)}
        open={isOpen}
        onClose={() => toggleDrawer(false)}
        cart={cart}
      />
    </StyledHeader>
  );
};

export default Header;
