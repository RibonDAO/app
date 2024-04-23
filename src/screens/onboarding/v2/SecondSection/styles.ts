import styled from "styled-components/native";
import { defaultBodyMdRegular } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

export const Title = styled.Text`
  ${stylizedDisplayXs}

  margin-top: ${theme.spacing(20)};
  text-align: center;
  color: ${theme.colors.brand.primary[900]};
`;

export const Description = styled.Text`
  ${defaultBodyMdRegular}

  text-align: center;
  color: ${theme.colors.neutral[500]};
`;

export const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(8)};
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: ${theme.spacing(48)};
  margin-top: ${theme.spacing(40)};
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${theme.spacing(16)};
`;

export const Header = styled.View`
  margin-top: ${theme.spacing(24)};
  margin-bottom: ${theme.spacing(8)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoContainer = styled.View`
  width: 100px;
  height: 32px;
`;
