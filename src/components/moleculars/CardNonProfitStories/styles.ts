import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  height: 432px;
  width: 296px;
  border-radius: 16px;
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
  padding: 48px 24px;
  width: 100%;
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

export const MarkdownStyle = StyleSheet.create({
  text: {
    lineHeight: 24,
  },
});
