import { theme } from "@ribon.io/shared";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
  display: flex;
  flex-direction: row;
`;

export const NotFoundContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: ${theme.spacingNative(16)}px;
`;
