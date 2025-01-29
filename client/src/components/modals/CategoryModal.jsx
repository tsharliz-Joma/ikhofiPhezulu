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
import Grid from "@mui/material/Grid";

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
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        fullScreen
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#1d1d1d",
            color: "white",
          },
        }}
      >
        <DialogTitle
          variant="h2"
          sx={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "primary.main",
            padding: "1rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {categoryName}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "grid", gap: "3rem" }}>
            <Typography variant="h5" color="text.secondary" align="center" gutterBottom>
              Discover the best {categoryName} options we have for you.
            </Typography>

            <Grid container spacing={4}>
              {items?.map((item) => (
                <Grid item xs={12} md={2} key={item?.id}>
                  <MenuCard
                    key={item?.id}
                    title={item?.name}
                    image={item?.image}
                    price={item.basePriceMoney.amount}
                    description={item?.description}
                    // onClick={() => handleCategoryItemClick(item)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "1rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              borderRadius: "2rem",
              padding: "0.75rem 2rem",
              fontSize: { xs: "0.75rem", md: "1rem" },
              backgroundColor: "primary.light",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ItemModal open={isItemModalOpen} onClose={handleItemModalClose} item={selectedItem} />
    </>
  );
};

export default CategoryModal;
