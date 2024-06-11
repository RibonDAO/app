import { theme } from "@ribon.io/shared/styles";
import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  position: absolute;
`;
export const LeftContainer = styled.View`
  width: 128px;
  height: 128px;
  justify-content: center;
  align-items: center;
`;
export const LeftImage = styled.Image`
  width: 104px;
  height: 104px;
  border: 4px solid ${theme.colors.neutral10};
  border-radius: 48px;
`;
export const RightContainer = styled.View`
  width: 128px;
  height: 128px;
  margin-left: -40px;
  justify-content: center;
  align-items: center;
`;
export const RightImage = styled.Image`
  width: 128px;
  height: 128px;
`;
