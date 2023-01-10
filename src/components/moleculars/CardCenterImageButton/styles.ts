import styled, { css } from "styled-components/native";
import { View, Text, Image, StyleSheet } from "react-native";

// React Native Inline Styles
// https://reactnative.dev/docs/stylesheet

export const inline = StyleSheet.create({
  container: {
    shadowColor: "rgba(40, 36, 28, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
    margin: 8,
  },
  darkStroke: {
    height: 100,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});

export const Container = styled(View)``;

export const CardWrapper = styled(View)`
  ${({ theme }) => css`
    display: flex;
    background-color: ${theme.colors.ribonWhite};
    flex-direction: column;
    border-radius: 12px;
    height: auto;
    width: 100%;
  `}
`;

export const ContainerImage = styled(View)`
  ${({ theme }) => css`
    position: relative;
  `}
`;

export const CardImage = styled(Image)`
  ${() => css`
    width: 100%;
    aspect-ratio: 1.1;
    border-radius: 12px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;

export const InfoContainer = styled(View)`
  ${({ theme }) => css`
    width: 100%;
    margin-bottom: 16px;
    margin-top: 8px;
    display: flex;
    flex-direction: row;
  `}
`;

export const Bullet = styled(Text)`
  ${({ theme }) => css`
    margin-left: 4px;
    margin-right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${({ theme }) => theme.colors.ribonBlack};
  `}
`;

export const Info = styled(Text)`
  ${({ theme }) => css`
    text-align: center;
    color: ${({ theme }) => theme.colors.ribonBlack};
  `}
`;

export const Icon = styled(View)`
  ${({ theme }) => css`
    margin-top: 2px;
    margin-left: 4px;
  `}
`;

export const ImageDescription = styled.Text`
  padding: 14px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  color: ${({ theme }) => theme.colors.ribonWhite};
  font-weight: 600;
  font-size: 16px;
`;

export const ContainerText = styled(View)`
  ${() => css`
    padding: 8px 12px 12px 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
  `}
`;

export const Title = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-weight: 400;
    margin-bottom: 16px;
    margin-top: 8px;
  `}
`;
