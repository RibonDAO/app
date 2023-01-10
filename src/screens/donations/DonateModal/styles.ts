import styled, { css } from "styled-components/native";
import { Text, Image, View, StyleSheet } from "react-native";

export const inline = StyleSheet.create({
  gradient: {
    height: "100%",
    width: "50%",
    position: "absolute",
    right: 0,
  },
});

export const ModalWrapper = styled(View)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  `}
`;

export const Container = styled(View)`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.ribonWhite};
    align-items: center;
    justify-content: space-around;
  `}
`;

export const Title = styled(Text)`
  ${({ theme }) => css`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
    color: ${theme.colors.ribonBlue};
  `}
`;

export const Description = styled(Text)`
  ${({ theme }) => css`
    font-size: 16px;
    margin-bottom: 16px;
    color: ${theme.colors.darkGray};
  `}
`;

export const Logo = styled(Image)`
  ${({ theme }) => css`
    width: 50%;
    height: 100%;
  `}
`;

export const InputEmailContainer = styled(View)`
  ${({ theme }) => css`
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    padding-left: 8px;
    padding-right: 8px;
  `}
`;

export const Input = styled.TextInput<{ error: boolean }>`
  height: 40px;
  width: 100%;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${({ theme, error }) =>
    error ? theme.colors.lgRed : theme.colors.ribonBlue};

  padding-left: 8px;
`;

export const InputHint = styled(Text)<{ error: boolean }>`
  font-size: 12px;
  color: ${({ theme, error }) =>
    error ? theme.colors.lgRed : theme.colors.darkGray};
  margin-top: 4px;
`;

export const NonProfitContainer = styled(View)`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 16px;
    background-color: ${theme.colors.ribonBlue};
    color: ${theme.colors.ribonWhite};
  `}
`;

export const NonProfitText = styled(Text)`
  ${({ theme }) => css`
    flex: 1;
    flex-wrap: wrap;
    font-size: 16px;
    font-weight: 500;
    color: ${theme.colors.ribonWhite};
    margin-top: 15px;
    margin-bottom: 16px;
    line-height: 26px;
  `}
`;

export const NonProfitHighlight = styled(Text)`
  ${({ theme }) => css`
    font-weight: 900;
    color: ${theme.colors.ribonWhite};
    text-transform: uppercase;
  `}
`;

export const ButtonContainer = styled(View)`
  ${({ theme }) => css`
    width: 100%;
    padding-left: 8px;
    padding-right: 8px;
  `}
`;

export const Footer = styled(View)`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: 16px;
    padding-right: 16px;
    background-color: ${theme.colors.ribonBlue};
    color: ${theme.colors.ribonWhite};
  `}
`;

export const FooterText = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.ribonWhite};
    margin-top: 32px;
    margin-bottom: 32px;
  `}
`;
