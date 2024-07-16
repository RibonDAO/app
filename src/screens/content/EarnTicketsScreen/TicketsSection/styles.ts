import styled from "styled-components/native";
import { theme } from "@ribon.io/shared";

export const Container = styled.View`
  margin-bottom: ${theme.spacingNative(16)}px;
  gap: ${theme.spacingNative(24)}px;
  padding: ${theme.spacingNative(16)}px;
  background-color: ${theme.colors.neutral10};
`;
