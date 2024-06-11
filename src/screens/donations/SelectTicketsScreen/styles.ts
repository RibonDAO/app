import styled from "styled-components/native";
import { Dimensions, Platform } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { stylizedDisplaySm } from "styles/typography/stylized";
import {
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
} from "styles/typography/default";

export const Title = styled.Text`
  ${stylizedDisplaySm}
  color: ${theme.colors.neutral[800]};
`;

export const Container = styled.View`
  padding: 16px;
  margin-top: 36px;
  height: 100%;
  padding-right: 12px;
`;

export const MainContainer = styled.View`
  width: 100%;
  height: 100%;
`;

export const KeyboardView = styled.View`
  height: ${Platform.OS === "android"
    ? Dimensions.get("window").height
    : "100%"};
`;

export const ImageContainer = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.View`
  margin-top: ${theme.spacing(24)};
  align-items: center;
  gap: ${theme.spacing(8)};
`;

export const Subtitle = styled.Text`
  ${defaultBodyMdMedium}
  height: 48px;
  text-align: center;
  color: ${theme.colors.neutral[600]};
  margin-bottom: ${theme.spacing(4)};
`;

export const Image = styled.Image`
  width: 128px;
  height: 128px;
  resize-mode: cover;
`;

export const SliderContainer = styled.View``;

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.brand.primary[600]};
  text-align: center;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.spacing(12)};
  margin-top: ${theme.spacing(32)};
`;

export const Text = styled.Text`
  ${defaultBodyMdSemibold}
  color: ${theme.colors.neutral10};
`;
