import React from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  useTheme,
  Button,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/material";
import "./List.css";


const List = (props) => {
  const { list, onClick, theme } = props;
  // const fonts = makeStyles({
  //   Jua: {
  //     fontFamily: 'Jua'
  //   },
  //   Kanit: {
  //     fontFamily: 'Kanit'
  //   }
  // })

  return list.map((order) => (
    <Grid
      Item
      onClick={onClick}
      l={4}
      md={6}
      xs={10}
      sx={{ fontSize: "24px", margin: "2% 0%"}}
      key={order._id}>
      <Button item variant={"contained"} fullWidth>
        {order.name}
        <br />
        {order.coffeeSize}
        <br />
        {order.coffeeName}
        <br />
        {order.coffeeMilk}
        <br />
        {order.number}
      </Button>
    </Grid>
  ));
};

export default List;
