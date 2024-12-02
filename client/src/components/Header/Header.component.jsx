// @ts-nocheck
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import styled from "@emotion/styled";

const StyledHeader = styled(Box)`
  width: 100%;
`;

const Header = ({ title, fontSize }) => {
  const theme = useTheme();
  return (
    <StyledHeader fontFamily={theme.typography.fontFamily} xs={12}>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: theme.palette.primary.main,
          display: "flex",
          justifyContent: "center",
          padding: "40px 0px",
          textTransform: "uppercase",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <Typography variant="h3">{title}</Typography>
      </Container>
    </StyledHeader>
  );
};

export default Header;
