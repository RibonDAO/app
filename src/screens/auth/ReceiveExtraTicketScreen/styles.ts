import styled from "styled-components/native";
import { defaultBodyMdSemibold } from "styles/typography/defaultStyledComponents";
import { stylizedDisplayXs } from "styles/typography/stylizedStyledComponents";
import { theme } from "@ribon.io/shared/styles";
import ButtonComponent from "components/atomics/buttons/Button";

export const Title = styled.Text`
  ${stylizedDisplayXs};

  margin-top: ${theme.spacing(20)};
  color: ${theme.colors.brand.primary[800]};
`;

export const Description = styled.Text`
  ${defaultBodyMdSemibold};

  color: ${theme.colors.neutral[500]};
`;

export const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(8)};
  align-items: center;
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: ${theme.spacing(16)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Button = styled(ButtonComponent)`
  ${defaultBodyMdSemibold}

  width: 100%;
  padding: ${theme.spacing(12, 16)};
  border: 1px solid ${theme.colors.brand.primary[600]};
  border-radius: 4px;
  background-color: ${theme.colors.brand.primary[600]};
  color: ${theme.colors.neutral10};
`;

export const ImageBackground = styled.View`
  position: absolute;
  top: -50%;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ImageContainer = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing(64)};
`;

export const ContentContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(24)};
  align-items: center;
  justify-content: center;
`;
