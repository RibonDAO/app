import styled from "styled-components/native";
import ButtonComponent from "components/atomics/buttons/Button";
import { stylizedDisplayXs } from "styles/typography/stylizedStyledComponents";
import { defaultBodyMdMedium } from "styles/typography/defaultStyledComponents";
import { theme } from "@ribon.io/shared/styles";

export const ContentContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(24)};
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(16)};
`;

export const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(8)};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  ${stylizedDisplayXs}

  margin-top: ${theme.spacing(20)};
  color: ${theme.colors.brand.primary[900]};
`;

export const Description = styled.Text`
  ${defaultBodyMdMedium}

  color: ${theme.colors.neutral[600]};
`;

export const Button = styled(ButtonComponent)`
  height: 48px;
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
