import { theme } from "@ribon.io/shared";
import styled from "styled-components/native";
import { defaultBodyMdSemibold } from "styles/typography/defaultStyledComponents";

type BackgroundProps = {
  background: string;
};

export const Container = styled.ScrollView<BackgroundProps>`
  border-radius: 16px;
  min-width: 328px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacingNative(24)}px;
  background-color: ${(props: BackgroundProps) => props.background};
  position: relative;
`;

export const InnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacingNative(24)}px;
  padding: ${theme.spacingNative(24)}px;
`;

export const VectorContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 200px;
`;

export const Content = styled.View``;

export const Title = styled.Text`
  ${defaultBodyMdSemibold};
  color: ${theme.colors.neutral[800]};
`;

export const SubtitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

type SubtitleProps = {
  color?: string;
};

export const Subtitle = styled.Text<SubtitleProps>`
  ${defaultBodyMdSemibold};
  color: ${({ color }: SubtitleProps) => color || "black"};
`;

export const SubtitleIcon = styled.View``;
