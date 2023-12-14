// @ts-nocheck
import React, { forwardRef } from "react";
import {
  Button,
  Box,
  Typography,
  CssBaseline,
  useTheme,
  Grid,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Card,
  Container,
  Slide,
  DialogContent,
  DialogActions,
} from "@mui/material";

import "../../App.css";

const DialogueBox = (props) => {
  const { onClose, selectedValue, open, handleOrder, cDot } = props;

  const transition = forwardRef(function transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    onClose(selectedValue);
  };

  const sortOrder = (props) => {
    let splitOrder = props.split("\n");
    const cofObj = {
      getKeys() {
        return {
          name: splitOrder[0],
          size: splitOrder[1],
          coffee: splitOrder[2],
          milk: splitOrder[3],
          number: splitOrder[4],
        };
      },
    };
    let res = cofObj.getKeys();
    // console.log(res);
    return res;
  };

  var order = sortOrder(cDot);
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      TransitionComponent={transition}
      maxWidth={"md"}
      fullWidth>
      <DialogTitle
        textAlign={"center"}
        sx={{ paddingTop: { lg: "30px" }, textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: { xs: "20px", md: "30px", lg: "40px" },
            fontWeight: 500,
          }}>
          Complete Order ?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Card
          variant="outlined"
          sx={{ width: "90%", margin: "0 auto", padding: "20px" }}>
          <Typography sx={{ fontSize: { xs: "16px", md: "20px", lg: "2.5em" }, fontWeight: { md: 'bold'}, textAlign: 'center' }}>
            {order.name}
          </Typography>
         
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "26px", lg: "2.5em" },
                paddingY: "15px",
              }}>
              Size: {order.size}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "26px", lg: "2.5em" },
                paddingY: "15px",
              }}>
              Milk: {order.milk}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "26px", lg: "2.5em" },
                paddingY: "15px",
              }}>
              Coffee: {order.coffee}
            </Typography>
         
        </Card>
      </DialogContent>
      <DialogActions sx={{ padding: { lg: "30px" , xs: '10px'} }}>
        <Button
          sx={{
            fontSize: { xs: "14px", md: "16px", lg: "32px" },
            margin: "5px",
          }}
          variant="contained"
          onClick={handleOrder}
          fullWidth>
          Back
        </Button>
        <Button
          sx={{
            fontSize: { xs: "14px", md: "16px", lg: "32px" },
            margin: "5px",
          }}
          variant="contained"
          onClick={handleOrder}
          fullWidth>
          Coffee up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogueBox;
