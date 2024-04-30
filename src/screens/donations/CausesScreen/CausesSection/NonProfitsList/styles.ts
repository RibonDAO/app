import { theme } from "@ribon.io/shared";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
  display: flex;
  flex-direction: row;
`;

export const NotFoundContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: ${theme.spacingNative(16)}px;
`;

type NonProfitProps = {
  isFirst: boolean;
  isLast: boolean;
};

export const NonProfitContainer = styled.View<NonProfitProps>`
  width: 256px;
  margin-left: ${(props: NonProfitProps) => (props.isFirst ? 16 : 4)}px;
  margin-right: ${(props: NonProfitProps) => (props.isLast ? 16 : 4)}px;
  margin-bottom: ${theme.spacingNative(16)}px;
`;
