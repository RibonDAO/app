import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";
import {
  stylizedDisplayLg,
  stylizedDisplaySm,
} from "styles/typography/stylized";
import {
  defaultBodySmMedium,
  defaultBodySmSemibold,
  defaultBodyXsSemibold,
} from "styles/typography/default";

export const Container = styled.ScrollView`
  height: 100%;
  padding: ${theme.spacing(16)};
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing(16)};
`;

export const SubscriptionsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Card = styled.View`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(16)};
  margin-bottom: ${theme.spacing(16)};
  width: 100%;
  color: ${theme.colors.neutral[600]};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${theme.colors.neutral[100]};
  gap: ${theme.spacing(8)};
`;

export const Title = styled.Text`
  ${stylizedDisplayLg};
  margin-bottom: ${theme.spacing(24)};
`;

export const IconTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Amount = styled.Text`
  ${stylizedDisplaySm};
  color: ${theme.colors.brand.primary[800]};
`;

export const Icon = styled.View``;

type CustomColorProps = {
  color: string;
};

export const Text = styled.Text<CustomColorProps>`
  ${defaultBodySmMedium};
  color: ${({ color }: CustomColorProps) => color || theme.colors.neutral[600]};
`;

export const InfosText = styled.View`
  ${defaultBodySmMedium};
`;

export const HighlightedText = styled.Text`
  ${defaultBodySmSemibold};
  color: ${({ color }: CustomColorProps) =>
    color || theme.colors.brand.primary[600]};
`;

export const IconContainer = styled.View`
  background-color: ${theme.colors.feedback.error[600]};
  border-radius: 4px;
  padding: 4px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const Arrow = styled.View`
  align-self: flex-start;
  margin-bottom: ${theme.spacing(16)};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.brand.primary[600]};
  border-radius: ${theme.spacing(8)};
  padding: ${theme.spacing(4, 8)};
  justify-content: center;
  height: 28px;
  display: flex;
  align-items: center;
`;

export const ButtonText = styled.Text`
  ${defaultBodyXsSemibold};
  color: ${theme.colors.neutral10};
`;
