import React from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  useTheme,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/material";
import "./List.css";

const List = (props) => {
  const { list, onClick, theme } = props;

  return list.map((order) => (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      margin={"2.5% 0px"}
      key={order._id}>
      <Grid
        item
        onClick={onClick}
        lg={4}
        md={6}
        xs={10}
        sx={{ fontSize: { md: "48px", xs: "32px" }, fontWeight: 500 }}>
        <Box
          sx={{
            padding: { xs: "20px" },
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
