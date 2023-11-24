import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "./List.css";
// Make your own grid component that takes the coffeeObject as params
const List = (props) => {
  const { list, onClick, theme } = props;
console.log(list)
  return list.map((order) => (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        margin: "2% 0px ",
      }}
      key={order._id}>
      <Grid
        item
        onClick={onClick}
        lg={4}
        md={6}
        xs={11}
        sx={{ fontSize: { md: "25px", xs: "20px" }, fontWeight: 500 }}>
        <Box
          sx={{
            padding: { xs: "10px" },
            bgcolor: "primary.white",
            color: "#000",
          }}>
          {/* {Object.keys(order)} */}
          {order.name}
          <br />
          {order.coffeeSize}
          <br />
          {order.coffeeName}
          <br />
          {order.coffeeMilk}
          <br />
          {order.number}
          <br />
          <Typography sx={{ visibility: 'hidden'}}>
            {order.email}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  ));
};

export default List;
