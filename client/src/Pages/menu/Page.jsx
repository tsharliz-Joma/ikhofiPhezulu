import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllMenuItems } from "@/api/helpers";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuCard from "@/components/card/MenuCard";
import CategoryModal from "@/components/modals/CategoryModal";

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setItems(category.items);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMenuItems();
        setMenu(data.data);
      } catch (error) {
        setError("Failed to fetch menu items");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 1. Show loading spinner while fetching
  if (loading) return <p>Loading...</p>;

  // 2. Show error message if fetching failed
  if (error) return <p>{error}</p>;

  // 3. Show fallback UI if no menu data
  if (!menu || !menu.categories || Object.keys(menu.categories).length === 0) {
    return <p>No menu data available.</p>;
  }

  return (
    <Box>
      <Box>
        <Typography variant="h1">Menu</Typography>
      </Box>
      <Box sx={{ display: "grid", gap: "2rem" }}>
        <Box
          sx={{
            display: "flex", // Flexbox for inline layout
            gap: "1.5rem", // Space between cards
            overflowX: "auto", // Horizontal scrolling
            padding: "1rem 0", // Padding for scroll area
            scrollbarWidth: "none", // Hide scrollbar in Firefox
            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Chrome
          }}
        >
          {Object.values(menu.categories).map((category) => (
            <Box key={category.id} sx={{ flex: "0 0 auto" }}>
              <Grid>
                <MenuCard
                  title={category.name}
                  image={category.image}
                  description={`Explore items in ${category.name}`}
                  onClick={() => handleCategoryClick(category)}
                />
              </Grid>
            </Box>
          ))}
        </Box>
        <Box>
          <Typography variant="h2">Popular items</Typography>
        </Box>
      </Box>
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
