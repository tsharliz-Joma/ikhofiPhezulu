import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTextField = styled.input`
  margin: 16px 0;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #303030;
  color: #fff;
`;

export const StyledSelect = styled.select`
  margin: 16px 0;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #303030;
  color: #fff;
`;

export const StyledLabel = styled.label`
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const StyledTypography = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 16px;
  color: #fff;
`;

export const StyledButton = styled.button`
  margin: 16px 0;
  padding: 8px;
  width: 100%;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const StyledGrid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
`;

export const StyledGridItem = styled.div`
  flex: 1;
  margin: 0 8px;
`;
