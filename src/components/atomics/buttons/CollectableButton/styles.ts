import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyMdMedium } from "styles/typography/default";

type CustomColorProps = {
  color: string;
};

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  position: relative;
`;

export const ButtonContainer = styled.View<CustomColorProps>`
  background-color: ${({ color }: CustomColorProps) =>
    color || theme.colors.brand.primary[900]};
  width: 100%;
  height: 48px;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  max-width: 1000px;
  gap: 6px;
`;

export const AnimatedBg = styled.View<CustomColorProps>`
  background-color: ${({ color }: CustomColorProps) =>
    color || theme.colors.brand.secondary[300]};
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

export const TextContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

export const TextContainerAnimated = styled.View`
  display: flex;
  flex-direction: row;
  gap: 6px;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

export const Text = styled.Text<CustomColorProps>`
  ${defaultBodyMdMedium}
  color: ${({ color }: CustomColorProps) => color || theme.colors.neutral10};
`;

export const ToastContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
`;
