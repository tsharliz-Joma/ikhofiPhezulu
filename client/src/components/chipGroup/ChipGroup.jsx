import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";

const Modifiers = ({ modifiers = [], selectedValues, setSelectedValues }) => {
  if (!modifiers || modifiers.length === 0) return null;

  return modifiers.map((modifier) => (
    <Box key={modifier.id}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {modifier.name}
      </Typography>
      {/* Render Options for Each Modifier */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", py: 2 }}>
        {modifier.options.map((option) => (
          <Chip
            sx={{
              fontSize: `1.25rem`,
              padding: `${modifier.options.length > 3 ? "1.5rem" : "1.5rem"}`,
              // borderRadius: `${modifier.options.length > 2 ? "5px" : "50px"}`,
            }}
            key={option.id}
            label={`${option.name}`} // Show price
            clickable
            variant={selectedValues[modifier.id] === option.id ? "filled" : "outlined"}
            color={selectedValues[modifier.id] === option.id ? "primary" : "default"}
            onClick={() =>
              setSelectedValues((prev) => ({
                ...prev,
                [modifier.id]: option.id, // Update selected value for this modifier group
              }))
            }
          />
        ))}
      </Box>
    </Box>
  ));
};

export default Modifiers;
