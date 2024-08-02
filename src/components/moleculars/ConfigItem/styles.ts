import { theme } from "@ribon.io/shared/styles";

import styled from "styled-components/native";

export const ConfigItem = styled.TouchableOpacity<{ last?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-vertical: ${theme.spacingNative(16)};
  padding-horizontal: ${theme.spacingNative(16)};
  border-bottom-width: ${(props: any) => (props.last ? 0 : 1)}px;
  border-bottom-color: ${theme.colors.neutral[100]};
`;

export const Text = styled.Text`
  padding-left: ${theme.spacingNative(8)};
`;

export const IconContainer = styled.View`
  width: 10%;
`;

export const TextContainer = styled.View`
  width: 60%;
`;

export const CtaContainer = styled.View`
  width: 30%;
  padding-right: ${theme.spacingNative(8)};
  align-items: flex-end;
`;

export const ConfigContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
