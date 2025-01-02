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
import { addToCart } from "@/context/actions";
import { useData } from "@/hooks/useData";

const ItemModal = ({ open, onClose, item }) => {
  const { dispatch } = useData();
  const [notes, setNotes] = useState("");
  const [selectedModifiers, setSelectedModifiers] = useState({});

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
    <Dialog fullScreen open={open} onClose={onClose} maxWidth="md">
      <DialogContent sx={{ padding: "0", background: "black" }}>
        <DialogActions sx={{ position: "absolute" }}>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
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
              borderBottomLeftRadius: "4.5rem",
              borderBottomRightRadius: "4.5rem",
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
            <Box>
              <Typography variant="body2">Description</Typography>
              <Typography variant="body2"></Typography>
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
        <DialogActions sx={{ display: "flex", paddingX: "100px", justifyContent: " center" }}>
          <Button fullWidth onClick={handleAddToCart} variant="contained">
            Add to Cart
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ItemModal;
