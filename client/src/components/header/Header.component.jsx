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

  const handleCheckout = () => {};

  const handleRemoveFromCart = (event) => {
    const orderDetails = {
      id: event.id,
      modifiers: event.modifiers,
    };
    removeFromCart(dispatch, event.id, event.modifiers);
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
        onRemove={(event) => handleRemoveFromCart(event)}
        open={isOpen}
        onClose={() => toggleDrawer(false)}
        cart={cart}
      />
    </StyledHeader>
  );
};

export default Header;
