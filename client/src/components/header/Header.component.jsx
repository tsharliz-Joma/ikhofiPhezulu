// @ts-nocheck
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import CartDrawer from "components/cartDrawer/CartDrawer";
import {useData} from "hooks/useData";
import {removeFromCart} from "src/context/actions";
import api from "src/utils/utils";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Popover from "@mui/material/Popover";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import {jwtDecode} from "jwt-decode";

const Header = ({title, fontSize}) => {
  const {state, dispatch} = useData();
  const {cart, user} = state;
  const userProfile = user ? jwtDecode(user) : "";
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [popOverAnchor, setPopoverAnchor] = useState(null);
  const popOverOpen = Boolean(popOverAnchor);
  const id = popOverOpen ? "account-popover" : undefined;

  const openPopover = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const closePopover = () => {
    setPopoverAnchor(null);
  };

  const handleSignOut = () => {
    sessionStorage.clear();
    dispatch({type: "LOGOUT"});
    setPopoverAnchor(null);
    navigate("/");
  };

  const handleCheckout = async (cart) => {
    try {
      const response = await api.post("/api/square-pay", {
        locationId: "LG9G879R8CFMH", // I will retrieve this from the backend
        customerId: "charles", //  This should be the users name and be retrieved from state
        lineItems: cart,
      });
      window.location = response.data.data.result.paymentLink.url;
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
    <AppBar
      position="sticky"
      color="primary"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Box sx={{display: "flex", alignItems: "center", gap: "1rem"}}>
          <Typography variant="h3" sx={{textTransform: "uppercase"}}>
            <a href="/" style={{color: "white", textDecoration: "none"}}>
              {title}
            </a>
          </Typography>
          {user && (
            <Box onClick={(event) => openPopover(event)}>
              <IconButton>
                <AccountBoxIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        {user ? (
          <IconButton onClick={() => toggleDrawer(true)}>
            <Badge badgeContent={cart.length}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        ) : (
          <Button variant="outlined" href="/login">
            Login
          </Button>
        )}
      </Toolbar>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        id={id}
        open={popOverOpen}
        anchorEl={popOverAnchor}
        onClose={closePopover}>
        <Card
          sx={{
            minWidth: 300,
            padding: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Name: {userProfile.name || "N/A"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email: {userProfile.email}
            </Typography>
          </CardContent>
          <CardActions sx={{justifyContent: "flex-end", paddingTop: 0}}>
            <Button
              sx={{backgroundColor: "primary.light"}}
              variant="contained"
              onClick={handleSignOut}>
              Sign out
            </Button>
          </CardActions>
        </Card>
      </Popover>
      <CartDrawer
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
