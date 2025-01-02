import React, { useState, forwardRef } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { DialogActions, Typography } from "@mui/material";
import ItemModal from "./ItemModal";
import MenuCard from "../card/MenuCard";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CategoryModal = ({ onClose, open, items, categoryName }) => {
  const [selectedItem, setSelectedItem] = useState([]);
  const [isItemModalOpen, setisItemModalOpen] = useState(false);

  const handleCategoryItemClick = (item) => {
    setSelectedItem(item);
    setisItemModalOpen(true);
  };

  const handleItemModalClose = () => {
    setisItemModalOpen(false);
  };

  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-container": {
            backgroundColor: "black",
          },
          "& .MuiDialog-paper": {
            backgroundColor: "black",
            color: "white",
          },
          "& .MuiDialogTitle-root": {
            backgroundColor: "black",
            color: "white",
          },
          "& .MuiDialogContent-root": {
            backgroundColor: "black",
            color: "white",
          },
          "& .MuiDialogActions-root": {
            backgroundColor: "black",
          },
        }}
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        fullScreen
      >
        <DialogTitle variant="h2">{categoryName}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "grid", gap: "2rem" }}>
            {items?.map((item) => (
              <MenuCard
                maxWidth={500}
                key={item?.id}
                title={item?.name}
                image={item?.image}
                onClick={() => handleCategoryItemClick(item)}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" sx={{ m: 2 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ItemModal open={isItemModalOpen} onClose={handleItemModalClose} item={selectedItem} />
    </>
  );
};

export default CategoryModal;
