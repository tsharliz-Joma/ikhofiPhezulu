import React from "react";
import OrderForm from "../Forms/OrderForm";
import Header from "../components/Header/Header.component";
import { Container, ThemeProvider, useTheme, Box } from "@mui/material";

const Order = ({ socket }) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: '100vh'
          }}>
          <Box sx={{ height: '15%'}}>
            <Header
              title="Order"
              theme={theme}
              color={theme.palette.primary.main}
              fontSize={"36px"}
            />
          </Box>
          <Box sx={{ height: '85%'}}>
            <OrderForm socket={socket} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Order;
