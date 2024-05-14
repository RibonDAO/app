import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.View`
  height: 432px;
  width: 296px;
  border-radius: ${theme.spacingNative(16)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const BackgroundContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
`;

export const MarkdownContainer = styled.View`
  padding: ${theme.spacing(48, 24)};
  width: 100%;
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  border-radius: ${theme.spacingNative(16)}px;
`;

export const MarkdownStyle = StyleSheet.create({
  text: {
    lineHeight: 24,
  },
});
