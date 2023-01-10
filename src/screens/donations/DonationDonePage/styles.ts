import { Image, StyleSheet } from "react-native";
import styled, { css } from "styled-components/native";
import { stylizedHeadingMedium } from "@ribon/shared/styles/typography/stylized";

export const inline = StyleSheet.create({
  diamond: {
    width: 200,
    height: 200,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginTop: 60,
    marginBottom: 60,
    transform: [{ rotate: "45deg" }],
  },
});

export const Container = styled.View`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlue};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `}
`;

export const CardImage = styled(Image)`
  ${() => css`
    width: 100%;
    height: 100%;

    transform: rotate(-45deg) scale(1.4);
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    ${stylizedHeadingMedium}
    color: "${theme.colors.ribonBlue}";
    margin-top: 10px;
  `}
`;

export const Description = styled.Text`
  ${({ theme }) => css`
    {sty}
    color: ${theme.colors.darkGray};
    margin-top: 10px;
    margin-bottom: 30px;
  `}
`;
