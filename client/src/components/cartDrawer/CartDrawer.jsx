import React, {useState} from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Popover from "@mui/material/Popover";
import CloseIcon from "@mui/icons-material/Close";
import {updateCartQuantity} from "src/context/actions";
import {useData} from "hooks/useData";

const CartDrawer = ({open, onClose, cart, onRemove, onCheckout}) => {
  const {dispatch} = useData();
  const [anchorEl, setAnchorEl] = useState(null);
  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? "popover" : undefined;

  const handleCartQuantity = (item) => {
    updateCartQuantity(dispatch, item.id, item.modifiers, item.quantity);
  };

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 300,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: 2,
          backgroundColor: "black",
          color: "white",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose} sx={{color: "white"}}>
            <CloseIcon />
          </IconButton>
        </Box>
        {cart.length > 0 ? (
          cart.map((item, index) => {
            const milkModifier = item.modifiers
              ? Object.values(item.modifiers).find(
                  (modifier) => modifier.id === "Milk",
                )
              : null;

            const displayName = milkModifier
              ? `${milkModifier.name} ${item.name}`
              : item.name;

            return (
              <Box key={index}>
                <Box sx={{width: "100%"}}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "1rem",
                    }}>
                    <Box
                      onClick={(e) => handlePopover(e)}
                      sx={{
                        borderRadius: "1rem",
                        width: "25%",
                        cursor: "pointer",
                      }}
                      component={"img"}
                      src={item.image}
                    />
                    <Box
                      sx={{
                        display: "grid",
                        gap: "0.75rem",
                        width: "100%",
                        height: "100%",
                      }}>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {displayName}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: "0.75rem",
                        }}>
                        <Typography variant="body1">Quantity:</Typography>
                        <Box
                          sx={{
                            border: {
                              xs: "0.5px solid white",
                              md: "1px solid white",
                            },
                            borderRadius: "0.5rem",
                            padding: "0.25rem",
                            display: "flex",
                            columnGap: "0.5rem",
                          }}>
                          <RemoveIcon
                            onClick={() =>
                              handleCartQuantity({
                                id: item.id,
                                modifiers: item.modifiers,
                                quantity: Math.max(1, item.quantity - 1),
                              })
                            }
                          />
                          {item.quantity}
                          <AddIcon
                            onClick={() =>
                              handleCartQuantity({
                                id: item.id,
                                modifiers: item.modifiers,
                                quantity: parseInt(item.quantity) + 1,
                              })
                            }
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Popover
                  anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                  id={id}
                  open={popoverOpen}
                  anchorEl={anchorEl}
                  onClose={closePopover}>
                  {item.modifiers && (
                    <Box sx={{padding: "0.5rem"}}>
                      {Object.values(item.modifiers).map((modifier, index) => (
                        <Box key={index} sx={{display: "flex"}}>
                          <Typography variant="body2">
                            {modifier.name}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Popover>

                <Button
                  onClick={() =>
                    onRemove({id: item.id, modifiers: item.modifiers})
                  }>
                  Remove Item
                </Button>
              </Box>
            );
          })
        ) : (
          <Typography>No items in the cart.</Typography>
        )}
      </Box>
      {cart.length !== 0 && (
        <Box sx={{backgroundColor: "black", p: "1rem"}}>
          <Button variant="outlined" onClick={() => onCheckout(cart)}>
            Checkout
          </Button>
        </Box>
      )}
    </Drawer>
  );
};

export default CartDrawer;
