import { theme } from "@ribon.io/shared/styles";
import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
`;
export const LeftContainer = styled.View`
  width: 128px;
  height: 128px;
  justify-content: center;
  align-items: center;
`;
export const LeftImageContainer = styled.View`
  width: 104px;
  height: 104px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 52px;
  border: 4px solid ${theme.colors.neutral10};
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
