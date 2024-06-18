import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmSemibold } from "styles/typography/default";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding-top: ${theme.spacing(64)};
  padding-bottom: ${theme.spacing(24)};
  align-items: center;
`;

export const AnimationContainer = styled.View`
  align-items: center;
  padding: ${theme.spacing(24)};
`;

export const LoadingContainer = styled.View`
  display: flex;
  justify-content: center;
  background-color: ${theme.colors.brand.primary[100]};
  align-items: center;
  border-radius: 99px;
  height: 40px;
  padding: 0 20px;
`;

export const BottomContainer = styled.View`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(24)};
`;
export const LoadingText = styled.Text`
  ${defaultBodySmSemibold}
  text-align: center;
  color: ${theme.colors.brand.primary[900]};
`;
