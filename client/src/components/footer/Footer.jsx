import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        bottom: 0,
        py: 0.5,
        backgroundColor: "background.black",
        textAlign: "center",
        borderTop: "0.5px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 Jsphere Pty Ltd. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
