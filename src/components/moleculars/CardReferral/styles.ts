import styled from "styled-components/native";
import {
  defaultBodyLgMedium,
  defaultBodyMdSemibold,
  defaultHeadingXs,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.View`
  position: relative;
  padding: ${theme.spacingNative(24)}px;
  border-radius: ${theme.spacingNative(16)}px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacingNative(16)}px;
  align-items: center;
  background-color: #e8f4fc;
  overflow: hidden;
`;

export const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacingNative(12)}px;
`;

export const Image = styled.Image`
  max-width: 112px;
`;

export const Title = styled.Text`
  ${defaultHeadingXs}

  color: #235174;
  text-align: center;
`;

export const Subtitle = styled.Text`
  ${defaultBodyLgMedium}
  color: #235174;
  text-align: center;
`;

export const Brands = styled.Image`
  filter: brightness(0);
  width: 100%;
  max-width: 400px;
  height: 40px;
  resize-mode: contain;
`;

export const Button = styled.TouchableOpacity`
  background-color: #235174;
  color: ${theme.colors.neutral10};
  text-align: center;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
`;

export const Cta = styled.Text`
  ${defaultBodyMdSemibold}

  color: ${theme.colors.neutral10};
`;

export const ShapeContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
`;
