import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodyLgSemibold,
  defaultBodyXsMedium,
} from "styles/typography/default";

export const Container = styled.View`
  border-radius: 0 0 24px 24px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  background-color: ${(props: { member: boolean }) => {
    if (props.member) {
      return theme.colors.brand.tertiary[50];
    } else {
      return theme.colors.brand.primary[50];
    }
  }};
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

export const ShapeContainer = styled.View`
  position: absolute;
  top: -310px;
  right: -100px;
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
  background-color: ${(props: { member: boolean }) => {
    if (props.member) {
      return theme.colors.neutral[25];
    } else {
      return theme.colors.neutral[50];
    }
  }};
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

export const TagText = styled.Text`
  ${defaultBodyXsMedium}

  color: ${(props: { member: boolean }) => {
    if (props.member) {
      return theme.colors.brand.tertiary[600];
    } else {
      return theme.colors.neutral[600];
    }
  }}
`;

export const StatisticsContainer = styled.View`
  gap: 12;
  margin-top: 40px; 
`