import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${theme.colors.brand.primary[900]};
  margin-top: ${theme.spacing(8)};
  margin-bottom: ${theme.spacing(8)};
  position: relative;
  z-index: 2;
`;

export const SliderContainer = styled.View`
  flex: 2;
  padding-horizontal: ${theme.spacing(16)};
`;

export const Button = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  text-align: center;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.brand.primary[600]};
  border-radius: 4px;
`;
