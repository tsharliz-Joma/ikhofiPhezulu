import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const MenuCard = ({ image, title, description, price, onClick, maxWidth = 'auto' }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    setIsFavorited(!isFavorited);
  };

  return (
    <Card
      sx={{
        maxWidth: maxWidth,
        height: { xs: "350px", md: "500px" }, // Larger size for better visuals
        borderRadius: "16px",
        boxShadow: 4,
        cursor: "pointer",
        transition: "0.3s",
        position: "relative",
        overflow: "hidden",
        "&:hover": { boxShadow: 8, transform: "scale(1.05)" },
      }}
      onClick={onClick}
    >
      {image && (
        <CardMedia
          component="img"
          height="135"
          image={image}
          alt={title}
          sx={{
            objectFit: "cover",
            height: "60%",
            width: "100%",
          }}
        />
      )}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "40%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
            {title}
          </Typography>
          <IconButton size="small" onClick={handleFavoriteClick} sx={{ color: "secondary.main" }}>
            {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
        <Box sx={{ pb: "1rem" }}>
          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.5rem",

                textAlign: "center",
                lineHeight: 1.4,
                maxHeight: "3.5em",

                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          {price && (
            <Box
              sx={{
                // mt: 2,
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "secondary.main",
              }}
            >
              {`$${parseFloat(price / 100).toFixed(2)}`}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
