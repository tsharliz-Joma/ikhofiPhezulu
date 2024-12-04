import styled from "styled-components";
import Box from "@mui/material/Box";

export const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (max-width: 600px) {
    gap: 150px;
  }
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // gap: 40px;

  @media (max-width: 600px) {
    grid-column: 1 / -1; /* Full width on small screens */
    grid-row: 2;
  }
`;
