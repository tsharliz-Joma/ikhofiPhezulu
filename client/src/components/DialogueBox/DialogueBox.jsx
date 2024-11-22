// @ts-nocheck
import React, { forwardRef } from "react";
import { Button, Typography, Dialog, DialogTitle, Card, Slide, DialogContent, DialogActions } from "@mui/material";

const DialogueBox = ({ onClose, selectedCoffee, open, handleOrder }) => {
  const transition = forwardRef(function transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  return (
    <Dialog onClose={onClose} open={open} TransitionComponent={transition} maxWidth={"md"} fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <Card variant="outlined" sx={{ width: "90%", margin: "0 auto", padding: "20px" }}>
          <Typography sx={{ fontSize: { xs: "16px", md: "20px", lg: "2.5em" }, fontWeight: { md: "bold" }, textAlign: "center" }}>
            {selectedCoffee.name}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "16px", md: "26px", lg: "2.5em" },
              paddingY: "15px",
            }}
          >
            Size: {selectedCoffee.coffeeSize}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "16px", md: "26px", lg: "2.5em" },
              paddingY: "15px",
            }}
          >
            Milk: {selectedCoffee.coffeeMilk}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "16px", md: "26px", lg: "2.5em" },
              paddingY: "15px",
            }}
          >
            Coffee: {selectedCoffee.coffeeName}
          </Typography>
        </Card>
      </DialogContent>
      <DialogActions sx={{ padding: { lg: "30px", xs: "10px" } }}>
        <Button
          sx={{
            fontSize: { xs: "14px", md: "16px", lg: "32px" },
            margin: "5px",
          }}
          variant="contained"
          onClick={onClose}
          fullWidth
        >
          Back
        </Button>
        <Button
          sx={{
            fontSize: { xs: "14px", md: "16px", lg: "32px" },
            margin: "5px",
          }}
          variant="contained"
          onClick={handleOrder}
          fullWidth
        >
          Coffee up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogueBox;
