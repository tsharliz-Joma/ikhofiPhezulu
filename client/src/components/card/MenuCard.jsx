import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography/Typography";

const MenuCard = ({ image, title, description, onClick, maxWidth = 345 }) => {
  return (
    <Card
      sx={{
        maxWidth: maxWidth,
        height: { xs: "250px" },
        borderRadius: "8px",
        boxShadow: 3,
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
        position: "relative", // Needed for absolute positioning of CardContent
        overflow: "hidden", // Ensures content doesn't overflow
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
            height: "100%", // Take full height
            width: "100%", // Cover full width
          }}
        />
      )}
      <CardContent
        sx={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          padding: "1rem",
        }}
      >
        <Typography variant="h4">{title}</Typography>
        {description && <Typography variant="body2">{description}</Typography>}
      </CardContent>
    </Card>
  );
};

export default MenuCard;
