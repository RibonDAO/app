import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.View`
  display: flex;
  padding-bottom: ${theme.spacing(48)};
  width: 100%;
  padding-horizontal: ${theme.spacing(16)};
  background-color: ${theme.colors.brand.primary[800]};
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const ConfigContainer = styled.TouchableOpacity`
  display: flex;
  height: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-top: ${theme.spacing(8)};
`;
