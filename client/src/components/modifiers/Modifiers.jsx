import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Chip, Divider, TextField } from "@mui/material";

const Modifiers = ({ modifiers = [], selectedValues, setSelectedValues }) => {
  if (!modifiers || modifiers.length === 0) return null;

  const isSelected = (modifierId, optionId) => {
    return selectedValues.some(
      (modifier) => modifier.catalogObjectId === optionId && modifier.id === modifierId
    );
  };

  return modifiers.map((modifier) => (
    <Box key={modifier.id}>
      <Typography variant="h4" color="primary.light" sx={{ mb: 1 }}>
        {modifier.name}
      </Typography>
      <Divider sx={{ height: "1px", backgroundColor: "white" }} />
      {/* Render Options for Each Modifier */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", py: 3 }}>
        {modifier.options.map((option) => (
          <Box sx={{ display: "grid", gap: "0.25rem" }}>
            <Chip
              sx={{
                fontSize: `1.25rem`,
                padding: `1.25rem`,
              }}
              key={option.id}
              label={`${option.name}`} // Show price
              clickable
              variant={isSelected(modifier.id, option.catalogObjectId) ? "filled" : "outlined"}
              color={isSelected(modifier.id, option.catalogObjectId) ? "primary" : "default"}
              onClick={() => {
                setSelectedValues((prev) => {
                  const updatedModifiers = [...prev];
                  const existingIndex = updatedModifiers.findIndex((mod) => mod.id === modifier.id);

                  if (existingIndex > -1) {
                    updatedModifiers[existingIndex] = {
                      catalogObjectId: option.catalogObjectId,
                      id: modifier.id,
                      name: option.name,
                      quantity: "1",
                    };
                  } else {
                    updatedModifiers.push({
                      catalogObjectId: option.catalogObjectId,
                      id: modifier.id,
                      name: option.name,
                      quantity: "1",
                    });
                  }

                  return updatedModifiers;
                });
              }}
            />
          </Box>
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
