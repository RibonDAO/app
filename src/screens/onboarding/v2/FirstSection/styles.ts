import styled from "styled-components/native";
import {
  defaultBodyMdRegular,
  defaultBodySmRegular,
  defaultBodySmSemibold,
  defaultHeadingLg,
} from "styles/typography/default";
import { stylizedDisplayXs } from "styles/typography/stylized";
import { theme } from "@ribon.io/shared/styles";

export const Title = styled.Text`
  ${stylizedDisplayXs}

  margin-top: ${theme.spacing(20)};
  text-align: center;
  color: ${theme.colors.brand.primary[800]};
`;

export const Description = styled.Text`
  ${defaultBodyMdRegular}

  text-align: center;
  color: ${theme.colors.neutral[500]};
`;

export const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(8)};
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: ${theme.spacing(48)};
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${theme.spacing(16)};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(8)};
`;

export const Image = styled.Image`
  height: 100%;
  max-width: 101px;
  padding: ${theme.spacing(0, 8)};
`;

export const ImageContainer = styled.View`
  margin-bottom: ${theme.spacing(24)};
`;

export const ImageContainerText = styled.Text`
  ${defaultHeadingLg}

  padding: ${theme.spacing(0, 8)};
  color: ${theme.colors.brand.primary[200]};
`;

export const Header = styled.View`
  margin-top: ${theme.spacing(24)};
  margin-bottom: ${theme.spacing(8)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogosWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing(8)};
  align-items: center;
  justify-content: center;
`;

export const logoContainer = styled.View`
  width: 100px;
  height: 32px;
`;

export const Logo = styled.Image`
  height: 100%;
  width: 100%;
  resize-mode: contain;
`;

export const Footer = styled.View`
  margin-top: ${theme.spacing(16)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MutedText = styled.Text`
  ${defaultBodySmRegular}

  color: ${theme.colors.neutral[600]};
`;

export const Clickable = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-color: ${theme.colors.brand.primary[600]};
`;
export const ClickableText = styled.Text`
  ${defaultBodySmSemibold}

  color: ${theme.colors.brand.primary[600]};
`;
