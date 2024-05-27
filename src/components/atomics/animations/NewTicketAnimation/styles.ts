import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyMdBold } from "styles/typography/default";

export const Container = styled.View`
  position: absolute;
  padding: 4px 12px;
  background-color: ${theme.colors.brand.primary[300]};
  border-radius: 10px;
  margin-top: -40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const Count = styled.Text`
  ${defaultBodyMdBold}
  color: ${theme.colors.brand.primary[700]};
`;
