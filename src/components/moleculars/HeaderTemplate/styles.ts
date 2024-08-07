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

export const Background = styled.Image`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-self: center;
  object-fit: contain;
`;
