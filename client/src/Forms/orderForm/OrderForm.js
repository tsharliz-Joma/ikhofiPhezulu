import React, { useRef, forwardRef } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid2 from "@mui/material/Unstable_Grid2";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const OrderForm = forwardRef(({ socket, handleSubmit, error }, ref) => {
  const formRef = useRef(null);
  const invalidClasses = [
    "!border-feedback-red",
    "!text-feedback-red",
    "placeholder:!text-feedback-red",
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    if (formRef.current) {
      if (formRef.current.checkValidity()) {
        const formData = new FormData(formRef.current);
        handleSubmit(formData);
        formRef.current.reset();
        formRef.current.querySelectorAll("select").forEach((select) => {
          select.value = "";
        });
      } else {
        const inputs = Array.from(formRef.current.getElementsByTagName("input"));
        inputs.forEach((input) => {
          const feedback = input.nextElementSibling;
          if (!input.checkValidity()) {
            input.classList.add(...invalidClasses);
            if (feedback) {
              feedback.classList.remove("hidden");
            }
          } else {
            input.classList.remove(...invalidClasses);
            if (feedback) {
              feedback.classList.add("hidden");
            }
          }
        });
      }
    }
  };

  return (
    <Container>
      <CssBaseline />
      <Box>
        <form onSubmit={onSubmit} ref={formRef}>
          <Typography textTransform={"uppercase"} fontWeight={600}>
            Contact information
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="number"
            id="number"
            type="number"
            label="Mobile Number"
            autoComplete="number"
            autoFocus
            sx={{ mb: 3 }}
          />
          <Box>
            <Typography textTransform={"uppercase"} fontWeight={600}>
              build your coffee order
            </Typography>
            <FormControl fullWidth required sx={{ mt: 1 }}>
              <InputLabel>Coffee</InputLabel>
              <Select labelId="coffeeName" label="coffeeName" name="coffeeName" defaultValue="">
                <MenuItem value="Flat White">Flat White</MenuItem>
                <MenuItem value="Latte">Latte</MenuItem>
                <MenuItem value="Cappucino">Cappuccino</MenuItem>
                <MenuItem value="Expresso">Espresso</MenuItem>
                <MenuItem value="Double Espresso">Double Espresso</MenuItem>
                <MenuItem value="Long Black">Long Black</MenuItem>
                <MenuItem value="Macchiato">Macchiato</MenuItem>
                <MenuItem value="Long Macchiato">Long Macchiato</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <FormControl fullWidth required sx={{ mt: 2 }}>
            <InputLabel>Size</InputLabel>
            <Select labelId="size" label="size" name="coffeeSize" defaultValue="Regular">
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="Large">Large</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth required sx={{ mt: 2 }}>
            <InputLabel>Milk</InputLabel>
            <Select labelId="milk" label="milk" name="coffeeMilk" defaultValue="Full">
              <MenuItem value="Full">Full</MenuItem>
              <MenuItem value="Skim">Skim</MenuItem>
              <MenuItem value="Soy">Soy</MenuItem>
              <MenuItem value="Almond">Almond</MenuItem>
              <MenuItem value="Oat">Oat</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Sugar</InputLabel>
            <Select labelId="sugar" label="sugar" name="coffeeSugar" defaultValue="">
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
          </FormControl>
          <Grid2 container>
            <Grid2 size="grow" xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ my: 3, fontSize: 16, color: "primary.black" }}
              >
                Place order
                <ArrowForwardIosIcon />
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Container>
  );
});

export default OrderForm;
