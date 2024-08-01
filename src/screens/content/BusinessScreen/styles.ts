import { theme } from "@ribon.io/shared/styles";
import { Dimensions, Platform } from "react-native";
import styled from "styled-components/native";
import {
  defaultBodyMdMedium,
  defaultBodyMdSemibold,
  defaultBodySmMedium,
} from "styles/typography/default";
import { stylizedDisplaySm } from "styles/typography/stylized";

export const MainContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 14px;
  margin-top: 204px;
`;

export const Container = styled.ScrollView`
  width: 100%;
  height: ${Platform.OS === "android"
    ? Dimensions.get("window").height
    : "100%"};
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing(24)};
  margin-top: -20px;
`;

export const CompanyLogo = styled.Image`
  align-self: stretch;
  height: 100%;
  width: 100%;
`;

export const CompanyLogoContainer = styled.View`
  width: 88px;
  height: 88px;
  border-radius: ${theme.spacing(8)};
  border: 2px solid ${theme.colors.brand.quinary[100]};
  padding: 12px;
  margin-bottom: ${theme.spacing(16)};
`;

export const Title = styled.Text`
  ${stylizedDisplaySm}
  width: 280px;
  text-align: center;
  color: ${theme.colors.neutral[800]};
`;

export const TextContainer = styled.View`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(12)};
`;

export const Subtitle = styled.Text`
  ${defaultBodyMdMedium}
  text-align: center;
  color: ${theme.colors.neutral[600]};
`;

export const BenefitsContainer = styled.View`
  width: 100%;
  padding: ${theme.spacing(24, 16)};
  background-color: ${theme.colors.brand.quinary[25]};
  display: flex;
  gap: ${theme.spacing(24)};
  margin-bottom: 16px;
`;

export const Benefit = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  display: flex;
`;

export const BenefitText = styled.Text`
  ${defaultBodySmMedium}
  color: ${theme.colors.neutral[700]};
  max-width: 100%;
`;

export const BenefitTitle = styled.Text`
  ${defaultBodyMdSemibold}
  color: ${theme.colors.brand.quinary[800]};
`;

export const BenefitTextContainer = styled.View`
  width: 100%;
  margin-left: 12px;
  flex: 1;
`;

export const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  margin-top: ${theme.spacing(16)};
`;

export const BackgroundSun = styled.View`
  position: absolute;
  width: 100%;
  align-items: center;
  z-index: -2;
  margin-top: -60%;
`;

export const BackgroundBag = styled.View`
  width: 100%;
  position: absolute;
  align-items: center;
  margin-top: 64px;
`;
