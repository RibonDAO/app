import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.View`
  min-height: 256px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.brand.primary[800]};
`;

export const CenterContainer = styled.View`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContainerShapeLeft = styled.View`
  position: absolute;
  top: 0;
  left: 0;
`;

export const ContainerShapeRight = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0;
`;
