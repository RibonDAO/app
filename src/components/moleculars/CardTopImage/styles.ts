import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 160px;
    padding: 16px;
    background-color: ${theme.colors.ribonWhite};
    border-radius: 16px;
    margin-bottom: 16px;
  `}
`;

export const Image = styled.Image`
  height: 72px;
  width: 72px;
  border-radius: 50px;
`;

export const Text = styled.Text`
  ${({ theme }) => css`
    margin-top: 16px;
    font-size: 14px;
    color: ${theme.colors.ribonBlack};
  `}
`;
