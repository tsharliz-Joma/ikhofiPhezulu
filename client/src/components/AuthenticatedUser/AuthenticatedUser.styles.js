import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 50px 0px;
`;

export const Image = styled.img`
  width: auto;
  height: 300px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  grid-column: 2 / 3;
  grid-row-start: 3;
`;

export const UserContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-column: 2 / 3;
  grid-row-start: 2;
`;
