import styled from "styled-components/native";

import { stylizedDisplayLg } from "styles/typography/stylized";
import { defaultBodySmMedium } from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.View`
  background-color: ${theme.colors.brand.primary[25]};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 50px;
  width: 80%;
`;

export const Left = styled.View``;
export const Number = styled.Text`
  ${stylizedDisplayLg}
  color: ${theme.colors.neutral[800]};
`;
export const Text = styled.Text`
  ${defaultBodySmMedium}
  color: ${theme.colors.neutral[600]};
`;

export const Right = styled.View``;
export const Image = styled.Image`
  width: 80px;
  height: 80px;
`;
