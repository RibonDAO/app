import styled from "styled-components/native";
import {
  defaultBodyMdSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";
import { stylizedDisplaySm } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.View`
  position: relative;
  width: 100%;
  padding: ${theme.spacingNative(24)}px;
  border-radius: ${theme.spacingNative(16)}px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacingNative(16)}px;
  align-items: center;
  background-color: ${theme.colors.brand.primary[50]};
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
  ${stylizedDisplaySm}
`;

export const Subtitle = styled.Text`
  ${defaultBodySmRegular}

  text-align: center;
  color: ${theme.colors.neutral[600]};
`;

export const Brands = styled.Image`
  filter: brightness(0);
`;

export const Cta = styled.Text`
  ${defaultBodyMdSemibold}

  margin-top: ${theme.spacingNative(8)}px;
  color: ${theme.colors.brand.primary[800]};
  cursor: pointer;

  :hover {
    color: ${theme.colors.brand.primary[600]};
  }
`;

export const HalfCircleContainer = styled.View`
  position: absolute;
  top: 0;
  z-index: -1;
`;
