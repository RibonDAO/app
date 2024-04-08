import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmSemibold } from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(16)};
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: ${theme.spacing(16)};
  margin-top: ${theme.spacing(48)};
`;

export const Title = styled.Text`
  ${stylizedDisplayXs}
  color: ${theme.colors.brand.primary[800]};
  margin-bottom: ${theme.spacing(8)};
  text-align: center;
`;

export const Description = styled.Text`
  ${defaultBodySmSemibold}
  color: ${theme.colors.neutral10};
`;
