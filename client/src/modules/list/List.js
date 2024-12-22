import React from "react";
import { List as MUIList } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const List = ({ list, onClick, theme }) => {
  return (
    <MUIList sx={{ gap: "0.5rem", display: "grid", py: "2rem" }}>
      {list.map((item) => (
        <ListItem
          key={item._id}
          button
          onClick={() => onClick(item)}
          sx={{
            backgroundColor: theme.palette.background.paper,
            marginBottom: theme.spacing(1),
            borderRadius: theme.shape.borderRadius,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <Box>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2">{item.coffeeName}</Typography>
            <Typography variant="body2">{item.coffeeSize}</Typography>
            <Typography variant="body2">{item.coffeeMilk}</Typography>
            <Typography variant="body2">{item.coffeeSugar}</Typography>
            <Typography variant="body2">{item.number}</Typography>
            <Typography variant="body2">{item.email}</Typography>
          </Box>
        </ListItem>
      ))}
    </MUIList>
  );
};

export default List;
