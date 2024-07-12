import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyLgSemibold,
  defaultBodyXsMedium,
} from "styles/typography/default";

export const Container = styled.View`
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  background-color: ${(props: { clubMember: boolean }) =>
    props.clubMember
      ? theme.colors.brand.tertiary[600]
      : theme.colors.brand.primary[800]};
  overflow: hidden;
  padding-bottom: 40px;
  padding-top: 58px;
`;

export const CenterContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContainerShapeLeft = styled.View`
  position: absolute;
  left: 0;
`;

export const ContainerShapeRight = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const TagContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing(8)};
  margin-top: ${theme.spacing(16)};
  align-items: center;
  opacity: 1;
`;

export const ClubTag = styled.View`
  display: flex;
  padding: ${theme.spacing(0, 8)};
  border-radius: ${theme.spacing(8)};
  align-items: center;
  background-color: ${(props: { clubMember: boolean }) =>
    props.clubMember
      ? theme.colors.brand.tertiary[50]
      : theme.colors.neutral[50]};
`;

export const TagText = styled.Text`
  ${defaultBodyXsMedium}
  color: ${(props: { clubMember: boolean }) =>
    props.clubMember
      ? theme.colors.brand.tertiary[600]
      : theme.colors.neutral[600]};
`;

export const ClubCta = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  opacity: 1;
  margin-top: ${theme.spacing(32)};
`;

export const ClubCtaText = styled.Text`
  ${defaultBodyLgSemibold}
  color: ${theme.colors.neutral10};
`;

export const Sparkles = styled.View`
  position: absolute;
  top: ${theme.spacing(16)};
`;
