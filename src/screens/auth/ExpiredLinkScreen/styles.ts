import styled from "styled-components/native";
import { defaultBodyMdSemibold } from "styles/typography/defaultStyledComponents";
import { stylizedDisplayMd } from "styles/typography/stylizedStyledComponents";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.View`
  height: 100%;
  display: flex;
  padding: ${theme.spacing(32)};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  ${stylizedDisplayMd}

  margin-top: ${theme.spacing(8)};
  margin-bottom: ${theme.spacing(8)};
  position: relative;
  z-index: 2;
  color: ${theme.colors.brand.primary[900]};
`;

export const Description = styled.Text`
  ${defaultBodyMdSemibold}

  max-width: 350px;
  margin-bottom: ${theme.spacing(24)};
  position: relative;
  z-index: 2;
  text-align: center;
  color: ${theme.colors.neutral[500]};
`;

export const LogoContainer = styled.View`
  margin-bottom: ${theme.spacing(48)};
`;
