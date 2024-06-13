import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodySmSemibold } from "styles/typography/default";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 64px 24px 24px 24px;
  align-items: center;
  gap: 24px;
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

export const LoadingText = styled.Text`
  ${defaultBodySmSemibold}
  text-align: center;
  color: ${theme.colors.brand.primary[900]};
`;
