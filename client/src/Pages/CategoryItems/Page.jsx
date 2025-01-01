import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { getAllMenuItems, getItemById } from "@/api/helpers";

const CategoryItems = () => {
  const [items, setItems] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllMenuItems()
        console.log(response)
      } catch (error) {
        console.error();
      }
    };
  }, []);

  return <Box></Box>;
};

export default CategoryItems;
