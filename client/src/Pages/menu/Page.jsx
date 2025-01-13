import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CategoryModal from "@/components/modals/CategoryModal";
import Header from "@/components/header/Header.component";
import { useData } from "@/hooks/useData";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Footer from "@/components/footer/Footer";
import SuspenseComponent from "@/components/suspense/Suspense";

const MenuPage = () => {
  const { state } = useData();
  const { menu, error } = state;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setItems(category.items);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 2. Show error message if fetching failed
  if (error) return <p>{error}</p>;

  if (!menu || !menu.categories || Object.keys(menu.categories).length === 0) {
    return (
      <SuspenseComponent>
        <></>
      </SuspenseComponent>
    );
  }

  return (
    <Box>
      <Header title="Coffee up" />
      <Box
        sx={{
          textAlign: "center",
          py: 5,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h1" color="primary.main" gutterBottom>
          Explore Our Menu
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Handcrafted coffee brewed to perfection
        </Typography>
      </Box>

      <Container sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "start", md: "center" },
            flexWrap: { xs: "nowrap", md: "nowrap" },
            overflowX: { xs: "auto", md: "visible" },
            gap: 2,
            paddingBottom: 2,
            "&::-webkit-scrollbar": {
              xs: { display: "none" },
              md: {},
            },
            scrollbarWidth: { xs: "none", md: "auto" }, // Hide scrollbar for Firefox
            msOverflowStyle: { xs: "none", md: "auto" }, // Hide scrollbar for IE/Edge
          }}
        >
          {Object.values(menu.categories).map((category) => (
            <Box
              key={category.id}
              sx={{
                flex: { xs: "0 0 auto", md: "1 1 calc(25% - 16px" },
                width: { xs: "300px", md: "auto" },
              }}
            >
              <Card
                sx={{
                  backgroundColor: "background.paper",
                  borderRadius: "12px",
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                  cursor: "pointer",
                }}
                onClick={() => handleCategoryClick(category)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={category.image}
                  alt={category.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" color="primary.main">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
      <Footer />
      <CategoryModal
        open={isModalOpen}
        onClose={handleCloseModal}
        items={items}
        categoryName={selectedCategory}
      />
    </Box>
  );
};

export default MenuPage;
