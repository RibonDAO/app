import styled from "styled-components/native";
import {
  defaultBodyLgSemibold,
  defaultBodySmRegular,
} from "styles/typography/defaultStyledComponents";
import { theme } from "@ribon.io/shared/styles";

export const AvatarSection = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: ${theme.spacing(12)};
`;

export const AvatarContainer = styled.View`
  width: 120px;
  height: 120px;
  border: 4px solid ${theme.colors.neutral[25]};
  border-radius: 8px;
  background-color: ${theme.colors.neutral[25]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PictureContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;
export const Username = styled.Text`
  ${defaultBodyLgSemibold}

  color: ${theme.colors.neutral[800]};
`;

export const Email = styled.Text`
  ${defaultBodySmRegular}

  color: ${theme.colors.neutral[600]};
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

export const BusinessIcon = styled.Image`
  width: 64px;
  height: 64px;
  object-fit: cover;
`;

export const BusinessIconContainer = styled.View`
  width: 88px;
  height: 88px;
  padding: ${theme.spacing(12)};
  object-fit: cover;
  background-color: ${theme.colors.neutral10};
  border-radius: 0 8px 8px 0;
`;

export const ProfileSection = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${theme.spacing(12)};
`;

export const LeftSparkles = styled.View`
  position: absolute;
  bottom: ${theme.spacing(12)};
  left: -12px;
`;

export const RightSparkles = styled.View`
  position: absolute;
  top: ${theme.spacing(16)};
  right: -12px;
`;

export const VerifiedContainer = styled.View`
  position: absolute;
  right: -12px;
  bottom: -12px;
`;
