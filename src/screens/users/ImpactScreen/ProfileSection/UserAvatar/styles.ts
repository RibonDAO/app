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
`;

export const AvatarContainer = styled.View`
  width: 96px;
  height: 96px;

  border: 2px solid ${theme.colors.neutral[25]};
  border-radius: 8px;
  position: relative;
  background-color: ${theme.colors.neutral[25]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Username = styled.Text`
  ${defaultBodyLgSemibold}

  color: ${theme.colors.neutral[25]};
`;

export const Email = styled.Text`
  ${defaultBodySmRegular}

  color: ${theme.colors.neutral[25]};
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

export const ProfileSection = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${theme.spacing(12)};
`;
