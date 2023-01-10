import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.ribonBlue};
  width: 100%;
  height: 40px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.ribonWhite};
  font-size: 16px;
  font-weight: 600;
`;
