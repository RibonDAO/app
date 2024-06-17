import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyLgBold,
  defaultBodySmRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";

export const Container = styled.View`
  width: 100%;
  border-radius: ${theme.spacing(16)};
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
  border-radius: ${theme.spacing(16)};
`;

export const MarkdownStyle = StyleSheet.create({
  body: {
    color: theme.colors.neutral[800],
  },
  table: {
    borderWidth: 0,
    marginTop: 32,
    padding: 0,
    fontFamily: "Inter",
    fontSize: 14,
    lineHeight: 24,
  },
  tr: {
    borderBottomWidth: 0,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  th: {
    padding: 0,
  },
  td: {
    padding: 0,
  },
  heading2: {
    ...defaultBodyLgBold,
  },
  heading3: {
    ...defaultBodySmSemibold,
    color: theme.colors.neutral[700],
  },
  paragraph: {
    ...defaultBodySmRegular,
  },
  bullet_list: {
    marginTop: 10,
    fontFamily: "Inter400",
    fontSize: 14,
    lineHeight: 24,
  },
  bullet_list_icon: {
    marginLeft: 0,
    marginRight: 8,
    fontSize: 24,
  },
});
