import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  border: 1px solid red;
  grid-template-columns: 1fr 1fr 1fr;
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
  color: #000 !important;
`;

export const UserContainer = styled.div`
  display: grid;
  border: 1px solid green;
  align-items: center;
  justify-content: center;
  grid-column: 2 / 3;
`;
