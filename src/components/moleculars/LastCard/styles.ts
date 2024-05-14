import styled from "styled-components/native";
import {
  defaultBodySmMedium,
  defaultHeadingXs,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

export const OngName = styled.Text`
  ${defaultBodySmMedium};
  color: ${theme.colors.neutral[600]};
`;

export const Title = styled.Text`
  ${defaultHeadingXs};
  color: ${theme.colors.neutral[800]};
`;

export const Container = styled.View`
  border-radius: 16px;

  height: 432px;
  width: 296px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacingNative(32)}px;
  gap: ${theme.spacingNative(16)}px;
`;

export const OngLogo = styled.Image`
  width: 80px;
  height: 80px;
`;

export const OngIcon = styled.Image`
  width: 80px;
  height: 80px;
`;

export const ButtonContainer = styled.View`
  display: flex;
  gap: ${theme.spacingNative(12)}px;
  width: 100%;
`;

export const ImageBackground = styled.View`
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
`;
