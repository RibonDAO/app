import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.View`
  min-height: 290px;
  margin: -26px -16px 32px;
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

  @media (min-width: ${theme.breakpoints.pad}) {
    width: 300px;
    height: 290px;
    left: 80px;
    object-fit: cover;
  }
`;

export const ContainerShapeRight = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0;
`;
