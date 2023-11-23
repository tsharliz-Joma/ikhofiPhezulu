import React from "react";
import { Box, Grid } from "@mui/material";
import "./List.css";

const List = (props) => {
  const { list, onClick, theme } = props;

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
          {order.name}
          <br />
          {order.coffeeSize}
          <br />
          {order.coffeeName}
          <br />
          {order.coffeeMilk}
          <br />
          {order.number}
        </Box>
      </Grid>
    </Grid>
  ));
};

export default List;
