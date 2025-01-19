import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useData } from "@/hooks/useData";
import { useTheme } from "@mui/material";

const MenuCard = ({ image, title, description, price, onClick, maxWidth = "auto" }) => {
  const theme = useTheme();
  const { state, dispatch } = useData();
  const { cart, user } = state;
  const [active, setActive] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    setIsFavorited(!isFavorited);
  };

  const handleTap = (e) => {
    if (isMobile) {
      e.stopPropagation();
      setActive((prev) => !prev);
    }
  };

  const handleCardClick = () => {
    if (isMobile && active) {
      return;
    }
    onClick();
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
        "&:hover .overlay": { boxShadow: 8, transform: { xs: "none", md: "scale(1.05)" } },
      }}
      onClick={handleCardClick}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {image && (
        <CardMedia
          component="img"
          height="135"
          image={image}
          alt={title}
          sx={{
            flexGrow: 1,
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
        />
      )}
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: active ? `rgba(0, 0, 0, 0.6)` : "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "end",
          transition: "background-color 0.3s",
          padding: { xs: 1, sm: 2 },
          textAlign: "center",
        }}
        onClick={handleTap}
      >
        {active && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "45%",
              color: "white",
              padding: "0px 0px 0.5rem 0px",
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
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.white" }}>
                {title}
              </Typography>
              {user && (
                <IconButton
                  size="small"
                  onClick={handleFavoriteClick}
                  sx={{ color: "secondary.main" }}
                >
                  {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              {description && (
                <Typography
                  variant="body2"
                  color="primary.white"
                  sx={{
                    fontSize: "0.75rem",
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
            <Box>
              {price && (
                <Box
                  sx={{
                    // mt: 2,
                    height: "100%",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "secondary.main",
                  }}
                >
                  {`$${parseFloat(price / 100).toFixed(2)}`}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default MenuCard;
