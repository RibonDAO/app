import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.View`
  background-color: ${theme.colors.neutral[100]};
  margin-top: ${(props: { outline: boolean }) => (props.outline ? "-50px" : 0)};
`;

export const CardsSection = styled.View`
  padding-horizontal: ${theme.spacing(16)};
`;
