import { theme } from "@ribon.io/shared/styles";
import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(24)};
`;

export const Button = styled.TouchableOpacity``;
