import styled from "styled-components/native";
import { Dimensions, Platform } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyMdSemibold } from "styles/typography/defaultStyledComponents"; // Assuming you have a styled version for these typography styles
import { stylizedDisplayXs } from "styles/typography/stylized";

export const Title = styled.Text`
  ${stylizedDisplayXs}
  color: ${theme.colors.brand.primary[900]};
`;

export const Container = styled.View`
  padding: 16px;
  margin-top: 36px;
  height: 100%;
  padding-right: 12px;
`;

export const MainContainer = styled.View`
  width: 100%;
`;

export const KeyboardView = styled.View`
  height: ${Platform.OS === "android"
    ? Dimensions.get("window").height
    : "100%"};
`;

export const ImageContainer = styled.View`
  margintop: ${theme.spacingNative(24)};
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.View`
  margin-top: ${theme.spacingNative(24)};
  align-items: center;
  gap: ${theme.spacingNative(8)};
`;

export const Subtitle = styled.Text`
  ${defaultBodyMdSemibold}
  color: ${theme.colors.neutral[600]};
  margin-bottom: 24px;
`;

export const Image = styled.Image`
  width: 132px;
  height: 132px;
  resize-mode: cover;
  border-radius: 8px;
`;
