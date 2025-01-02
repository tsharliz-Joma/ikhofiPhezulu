import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Chip, TextField } from "@mui/material";

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
            variant={selectedValues[modifier.id]?.name === option.name ? "filled" : "outlined"}
            color={selectedValues[modifier.id]?.name === option.name ? "primary" : "default"}
            onClick={() =>
              setSelectedValues((prev) => ({
                ...prev,
                [modifier.id]: { id: modifier.name, name: option.name },
                // Update selected value for this modifier group
              }))
            }
          />
        ))}
      </Box>
      {modifier.name.includes("Sugar") && selectedValues[modifier.id] && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
          <Typography>Quanitity:</Typography>
          <TextField
            type="text"
            value={selectedValues[modifier.id]?.quantity || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]$/.test(value)) {
                setSelectedValues((prev) => ({
                  ...prev,
                  [modifier.id]: {
                    ...prev[modifier.id],
                    quantity: value,
                  },
                }));
              }
            }}
            InputProps={{
              inputMode: "numeric", // Ensures numeric keyboard for mobile
              pattern: "[0-9]*", // Restricts non-numeric input
            }}
          />
        </Box>
      )}
    </Box>
  ));
};

export default Modifiers;
