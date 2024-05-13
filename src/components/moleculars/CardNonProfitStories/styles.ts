import { theme } from "@ribon.io/shared";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: ${theme.spacing(0, 24)};
  display: flex;
  align-items: center;
  background-color: ${theme.colors.brand.primary[50]};
  position: relative;
  border-radius: 16px;
`;

export const MarkdownContainer = styled.View`
  margin-top: ${theme.spacing(80)};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: ${theme.zindex.above};
`;

export const ImageBackground = styled.ImageBackground`
  padding: 24px;
`;

export const Background = styled.View`
  background-color: ${theme.colors.brand.primary[50]};
`;
