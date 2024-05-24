import { theme } from "@ribon.io/shared";
import styled from "styled-components/native";
import { defaultBodyLgSemibold } from "styles/typography/default";

export const Title = styled.Text`
  ${defaultBodyLgSemibold}
  margin: auto;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const Separator = styled.View`
  background-color: ${theme.colors.neutral[200]};
  height: 1px;
  margin: 4px 0;
`;
