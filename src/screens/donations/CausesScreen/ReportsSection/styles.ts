import { theme } from "@ribon.io/shared";
import {
  defaultBodyLgSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";
import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: ${theme.spacingNative(32)}px;
  margin-bottom: ${theme.spacingNative(16)}px;
`;

export const TitleContainer = styled.View`
  padding-left: ${theme.spacingNative(16)}px;
  padding-right: ${theme.spacingNative(16)}px;
`;

export const Title = styled.Text`
  ${defaultBodyLgSemibold}
`;

export const Description = styled.Text`
  ${defaultBodySmRegular}
`;

export const ReportListContainer = styled.View`
  margin-top: ${theme.spacingNative(12)}px;
`;

export const ReportList = styled.FlatList``;

type CardViewItemProps = {
  isLastChild?: boolean;
};

export const CardViewItem = styled.View<CardViewItemProps>`
  margin-left: ${theme.spacingNative(16)}px;
  margin-right: ${(props: CardViewItemProps) =>
    props.isLastChild ? theme.spacingNative(16) : 0}px;
`;

export const Divider = styled.View`
  height: 8px;
  background-color: ${theme.colors.neutral[50]};
  margin-left: ${theme.spacingNative(16)}px;
  margin-right: ${theme.spacingNative(16)}px;
`;
