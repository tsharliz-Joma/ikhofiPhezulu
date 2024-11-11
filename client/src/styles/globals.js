import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height of the viewport */
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1 / 3;
`;
