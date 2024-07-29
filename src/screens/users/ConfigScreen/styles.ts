import { theme } from "@ribon.io/shared";
import styled from "styled-components/native";
import {
  defaultBodyLgSemibold,
  defaultBodyMdBold,
  defaultBodyMdSemibold,
  defaultBodySmRegular,
  defaultBodyXsMedium,
} from "styles/typography/default";

export const Container = styled.ScrollView`
  display: flex;
  flex-direction: column;
`;

export const ConfigGroup = styled.View`
  margin-horizontal: ${theme.spacing(16)};
  margin-top: ${theme.spacing(32)};
`;

export const ConfigGroupTitle = styled.Text`
  ${defaultBodyMdBold}
`;

export const ConfigGroupList = styled.View`
  margin-top: ${theme.spacing(8)};
  background-color: ${theme.colors.neutral[25]};
  border-radius: 8px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${theme.colors.neutral[100]};
`;

export const Header = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-horizontal: ${theme.spacing(16)};
  padding-vertical: ${theme.spacing(16)};
`;

export const ProfilePicture = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 50px;
`;

export const ProfilePicturePlaceholder = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 50px;
  background-color: ${theme.colors.neutral[300]};
`;

export const ProfileInfo = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileEmail = styled.Text`
  ${defaultBodyLgSemibold}
  margin-top: ${theme.spacing(8)};
  color: ${theme.colors.neutral[600]};
`;

export const ProfileHint = styled.Text`
  ${defaultBodySmRegular}
  color: ${theme.colors.neutral[500]};
  text-align: center;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: ${theme.colors.neutral10};
  padding-vertical: ${theme.spacing(8)};
  padding-horizontal: ${theme.spacing(16)};
  border-radius: 50px;
  margin-top: ${theme.spacing(16)};
  border-width: 1px;
  border-color: ${theme.colors.brand.primary[600]};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing(8)};
`;

export const ButtonText = styled.Text`
  ${defaultBodyMdSemibold}
  color: ${theme.colors.brand.primary[600]};
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${theme.spacing(64)};
`;

export const TagContainer = styled.TouchableOpacity`
  display: ${({ hide }: { hide: boolean }) => (hide ? "none" : "flex")};
  flex-direction: row;
  gap: ${theme.spacing(8)};
  margin-top: ${theme.spacing(16)};
  align-items: center;
  opacity: 1;
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
