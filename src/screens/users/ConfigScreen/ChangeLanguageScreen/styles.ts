import { theme } from "@ribon.io/shared";
import styled from "styled-components/native";
import { defaultBodyMdBold } from "styles/typography/default";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(32)};
`;

export const ConfigGroup = styled.View`
  margin-horizontal: ${theme.spacing(16)};
`;

export const ConfigGroupTitle = styled.Text`
  ${defaultBodyMdBold}
`;

export const ConfigGroupList = styled.View`
  margin-top: ${theme.spacing(8)};
  background-color: ${theme.colors.neutral[25]};
  border-radius: 8px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${theme.colors.neutral[100]};
`;

export const LoaderOverlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;
