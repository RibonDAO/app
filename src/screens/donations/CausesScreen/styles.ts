import { theme } from "@ribon.io/shared/styles";
import { defaultBodyLgSemibold } from "styles/typography/default";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
  height: 100%;
  background-color: ${theme.colors.neutral10};
`;

type ContainerPaddingProps = {
  hasPaddingTop: boolean;
};

export const ContainerPadding = styled.View<ContainerPaddingProps>`
  padding-top: ${(props: ContainerPaddingProps) =>
    props.hasPaddingTop ? 16 : 0}px;
  border-top-width: 1px;
  padding-left: 16px;
  padding-right: 16px;
  border-color: ${theme.colors.neutral10};
  background-color: ${theme.colors.neutral10};
  border-radius: 16px;
  top: -16px;
`;

export const Title = styled.Text`
  ${defaultBodyLgSemibold};
  color: ${theme.colors.neutral[800]};
  width: 100%;
`;

export const Divider = styled.View`
  height: 8px;
  background-color: ${theme.colors.neutral[50]};
`;
