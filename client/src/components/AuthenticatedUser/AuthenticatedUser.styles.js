import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 50px 0px;
  border: 1px solid yellow;
`;

export const Image = styled.img`
  width: auto;
  height: 300px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-column: 2 / 3;
  border:: 1px solid green;

`;

export const UserContainer = styled.div`
  display: grid;
  border: 1px solid green;
  align-items: center;
  justify-content: center;
  grid-column: 2 / 3;
`;
