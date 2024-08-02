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
  background-color: ${(props: { type: string }) => {
    if (props.type === "club") {
      return theme.colors.brand.tertiary[50];
    } else if (props.type === "business") {
      return theme.colors.brand.quinary[50];
    } else {
      return theme.colors.brand.primary[50];
    }
  }};
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

export const UserAvatarContainer = styled.View`
  display: ${({ hide }: { hide: boolean }) => (hide ? "none" : "flex")};
`;

export const TagContainer = styled.TouchableOpacity`
  display: ${({ hide }: { hide: boolean }) => (hide ? "none" : "flex")};
  flex-direction: row;
  gap: ${theme.spacing(8)};
  align-items: center;
  opacity: 1;
`;

export const HeaderButtonsContainer = styled.View`
  position: absolute;
  top: 0;
  right: 16px;
`;
export const ClubTag = styled.View`
  display: flex;
  padding: ${theme.spacing(0, 8)};
  border-radius: ${theme.spacing(8)};
  align-items: center;
  background-color: ${(props: { clubMember: boolean }) => {
    if (props.clubMember) {
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

export const StatisticsContainer = styled.View`
  gap: 12;
  margin-top: ${(props: { additionalTopMargin: boolean }) => {
    if (props.additionalTopMargin) {
      return "100px";
    } else {
      return "40px";
    }
  }};
`;

export const TagText = styled.Text`
  ${defaultBodyXsMedium}

  color: ${(props: { clubMember: boolean }) => {
    if (props.clubMember === true) {
      return theme.colors.brand.tertiary[800];
    } else {
      return theme.colors.neutral[600];
    }
  }}
`;

export const TagBusinessText = styled.Text`
  ${defaultBodyXsMedium}

  color: ${theme.colors.brand.quinary[800]};
`;

export const BusinessTag = styled.View`
  display: flex;
  padding: ${theme.spacing(0, 8)};
  border-radius: ${theme.spacing(8)};
  align-items: center;
  background-color: ${theme.colors.neutral[50]};
  margin-bottom: ${theme.spacing(8)};
`;
