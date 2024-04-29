import { theme } from "@ribon.io/shared/styles";
import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacingNative(8)}px;
`;

export const CausesListContainer = styled.View`
  padding-left: ${theme.spacingNative(16)}px;
  padding-right: ${theme.spacingNative(16)}px;
`;
