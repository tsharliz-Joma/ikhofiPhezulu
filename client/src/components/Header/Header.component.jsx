// @ts-nocheck
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import styled from "@emotion/styled";

const StyledHeader = styled(Box)`
  display: grid;
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Header = ({ title, fontSize }) => {
  const theme = useTheme();
  return (
    <StyledHeader fontFamily={theme.typography.fontFamily} xs={12}>
      <Box sx={{ gridColumnStart: "2" }}>
        <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
          {title}
        </Typography>
      </Box>
    </StyledHeader>
  );
};

export default Header;
