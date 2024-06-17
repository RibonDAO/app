import { theme } from "@ribon.io/shared";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  margin-bottom: ${theme.spacing(8)};
  border: 1px solid ${theme.colors.neutral10};
  background-color: ${theme.colors.neutral10};
  border-radius: 16px;
`;
