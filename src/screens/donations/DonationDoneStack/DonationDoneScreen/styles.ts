import styled from "styled-components/native";
import { stylizedDisplaySm } from "styles/typography/stylized";
import { defaultBodyMdMedium } from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

export const TopContainer = styled.View``;
export const Container = styled.View`
  color: ${theme.colors.brand.primary[300]};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing(16)};
  gap: ${theme.spacing(40)};
`;

export const CardImage = styled.Image`
  width: 328px;
  height: 216px;
  border-radius: ${theme.spacing(16)};
`;

export const ContentContainer = styled.View`
  gap: 28px;
  align-items: center;
`;

export const ImageWithIconOverlayContainer = styled.View`
  margin-top: -64px;
  align-items: center;
`;

export const TextContainer = styled.View`
  gap: ${theme.spacing(12)};
  align-items: center;
`;

export const Title = styled.Text`
  ${stylizedDisplaySm}
  color: ${theme.colors.neutral[800]};
`;

export const Description = styled.Text`
  ${defaultBodyMdMedium}
  color: ${theme.colors.neutral[600]};
  text-align: center;
`;

export const CheckboxContainer = styled.View`
  border-radius: 4px;
  border: 1px solid ${theme.colors.neutral[300]};
  padding: ${theme.spacing(12)};
`;

export const BackgroundSun = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  z-index: -1;
`;

export const PlaceholderContainer = styled.View`
  background-color: ${theme.colors.neutral10};
  width: 328px;
  height: 216px;
`;
