import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.View`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  background-color: ${(props: { outline: boolean; member: boolean }) => {
    if (props.outline && props.member) {
      return theme.colors.brand.tertiary[600];
    } else if (props.outline && !props.member) {
      return theme.colors.brand.primary[800];
    } else {
      return theme.colors.neutral10;
    }
  }};
  justify-content: space-between;
  padding: ${theme.spacing(16)};
  padding-right: ${theme.spacing(12)};
`;
export const ContainerShapeLeft = styled.View`
  position: absolute;
  left: 0;
  top: -15%;
`;

export const logo = styled.TouchableOpacity`
  height: 24px;
  width: 33%;
  margin-left: ${theme.spacing(12)};
  resize-mode: contain;
`;

export const LogoContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Divider = styled.View`
  margin-horizontal: 8px;
  color: ${theme.colors.neutral[200]};
`;

export const InsideContainer = styled.View`
  display: flex;
`;
