import styled from "styled-components/native";
import { stylizedDisplayMd } from "styles/typography/stylized";
import { defaultBodyMdMedium } from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

export const Diamond = styled.View`
  width: 200px;
  height: 200px;
  overflow: hidden;
  background-color: #f2f2f2;
  border-radius: 10px;
  transform: rotate(45deg);
`;

export const DiamondBackground = styled.View`
  position: absolute;
  overflow: hidden;
  border-radius: 50px;
  width: 320px;
  height: 320px;
`;

export const Container = styled.View`
  color: ${theme.colors.brand.primary[300]};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(20)};
`;

export const CardImage = styled.Image`
  width: 100%;
  height: 100%;
  transform: rotate(-45deg) scale(1.4);
`;

export const Title = styled.Text`
  ${stylizedDisplayMd}
  color: ${theme.colors.brand.primary[800]};
  margin-top: ${theme.spacing(10)};
`;

export const Description = styled.Text`
  ${defaultBodyMdMedium}
  color: ${theme.colors.neutral[500]};
  margin-top: ${theme.spacing(16)};
  margin-bottom: ${theme.spacing(32)};
`;

export const HighlightedDescription = styled.Text`
  color: ${theme.colors.brand.primary[800]};
  margin-top: ${theme.spacing(16)};
  margin-bottom: ${theme.spacing(32)};
  text-align: center;
`;

export const AnimationContainer = styled.View`
  margin-bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckboxContainer = styled.View`
  width: 100%;
  display: flex;
  margin-bottom: ${theme.spacing(16)};
  margin-right: ${theme.spacing(12)};
  margin-left: ${theme.spacing(12)};
  border-radius: 4px;
  border-color: ${theme.colors.neutral[300]};
  border-width: 1px;
  padding: ${theme.spacing(24)};
`;
