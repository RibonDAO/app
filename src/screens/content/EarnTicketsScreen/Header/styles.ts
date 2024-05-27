import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyMdMedium,
  defaultBodySmMedium,
} from "styles/typography/default";
import { stylizedDisplayXl } from "styles/typography/stylized";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid ${theme.colors.brand.primary[900]};
  border-radius: 16px;
  background-color: ${theme.colors.brand.primary[900]};
  padding: ${theme.spacing(24)};
  margin-top: ${theme.spacing(16)};
  width: 100%;
`;

export const Text = styled.Text`
  ${defaultBodySmMedium}
  color: ${theme.colors.neutral10};
`;

export const Counter = styled.View`
  display: flex;
  flex-direction: column;
`;
export const CounterText = styled.Text`
  ${stylizedDisplayXl}
  color: ${theme.colors.neutral10};
`;

export const Description = styled.Text`
  ${defaultBodyMdMedium}
  color: ${theme.colors.neutral10};
`;
