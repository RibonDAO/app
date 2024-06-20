import styled from "styled-components/native";
import { stylizedDisplaySm } from "styles/typography/stylized";
import { defaultBodyMdMedium } from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

export const TopContainer = styled.View`
  width: 428px;
  height: 428px;
  margin-top: -64px;
  align-items: center;
`;
export const Container = styled.View`
  color: ${theme.colors.brand.primary[300]};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 16px 16px;
`;

export const ContentContainer = styled.View`
  align-items: center;
  gap: ${theme.spacing(12)};
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
export const BackgroundSun = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  z-index: -1;
`;
