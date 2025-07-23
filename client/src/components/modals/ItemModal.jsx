import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modifiers from "../modifiers/Modifiers";
import { addToCart } from "src/context/actions";
import { useData } from "hooks/useData";

const ItemModal = ({ open, onClose, item }) => {
  const { dispatch } = useData();
  const [notes, setNotes] = useState("");
  const [selectedModifiers, setSelectedModifiers] = useState([]);

  const handleAddToCart = () => {
    const orderDetails = {
      ...item,
      notes,
      modifiers: selectedModifiers,
    };
    addToCart(dispatch, orderDetails, 1);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "2rem",
        },
      }}
    >
      <DialogContent sx={{ backgroundColor: "black", borderRadius: "2rem" }}>
        <DialogActions sx={{ position: "relative", right: "1rem" }}></DialogActions>
        <Box
          sx={{
            padding: "0",
            width: { xs: "100%", md: "50%" },
            height: "auto",
            borderRadius: "50px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              borderRadius: "2rem",
            }}
            component="img"
            src={item?.image}
          ></Box>
        </Box>
        <DialogTitle
          sx={{
            display: "grid",
            justifyContent: "start",
            alignItems: "center",
            py: "2rem",
          }}
        >
          <Box>
            <Typography variant="h2">{item?.name}</Typography>
            <Box pt="0.5rem">
              <Typography variant="body2" fontWeight="bold">
                Description
              </Typography>
              <Typography variant="body2">{item?.description}</Typography>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ display: "grid" }}>
          <Modifiers
            modifiers={item?.modifiers || []}
            selectedValues={selectedModifiers}
            setSelectedValues={setSelectedModifiers}
          />
          <Typography variant="h6">Special Instructions</Typography>
          <TextField
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes for your order..."
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              borderRadius: "2rem",
              padding: "0.5rem 2rem",
              fontSize: { xs: "0.75rem", md: "1rem" },
              backgroundColor: "primary.light",
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleAddToCart}
            sx={{
              borderRadius: "2rem",
              padding: "0.5rem 2rem",
              fontSize: { xs: "0.75rem", md: "1rem" },
              backgroundColor: "primary.light",
            }}
            variant="contained"
          >
            Add to Cart
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ItemModal;
