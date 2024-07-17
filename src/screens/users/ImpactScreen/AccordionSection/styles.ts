import { Dimensions, Platform } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import styled from "styled-components/native";

export const TabViewSection = styled.View`
  max-height: ${Platform.OS === "android"
    ? Dimensions.get("window").height
    : "100%"};
  padding-bottom: -${theme.spacing(32)};
  background-color: ${theme.colors.neutral10};
`;

export const PagerView = styled.View`
  flex: 1;
`;

export const TabBar = styled.View`
  background-color: ${theme.colors.neutral10};
  border-bottom-width: 1px;
  border-color: ${theme.colors.neutral[200]};
  shadow-color: ${theme.colors.neutral10};
`;

export const TabStyle = styled.View`
  width: 200px;
`;

export const TabBarTitle = styled.Text`
  color: ${theme.colors.neutral[500]};
  text-align: center;
  font-size: 16px;
`;

export const IndicatorStyle = styled.View`
  background-color: ${theme.colors.brand.primary[300]};
  padding: 1.5px;
  margin-bottom: -2px;
`;

export const InactiveButtonContainer = styled.View`
  margin: 32px 65px;

  display: ${(props: { displayButton: boolean }) =>
    props.displayButton ? "none" : ""};
`;
