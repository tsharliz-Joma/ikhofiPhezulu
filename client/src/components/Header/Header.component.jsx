// @ts-nocheck
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import styled from "@emotion/styled";

const StyledHeader = styled(Box)`
  width: 100%;
`;

const Header = ({ title, fontSize }) => {
  const theme = useTheme();
  return (
    <StyledHeader fontFamily={theme.typography.fontFamily} xs={12}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          textTransform: "uppercase",
        }}
      >
        <Typography variant="h3">{title}</Typography>
      </Box>
    </StyledHeader>
  );
};

export default Header;
