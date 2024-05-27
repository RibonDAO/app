import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";
import {
  defaultBodySmMedium,
  defaultBodySmRegular,
  defaultBodySmSemibold,
} from "styles/typography/default";
import { stylizedDisplayXl } from "styles/typography/stylized";

export const Container = styled.View`
  display: flex;
  padding-bottom: ${theme.spacing(32)};
  width: 100%;
  padding-horizontal: ${theme.spacing(16)};
  background-color: ${theme.colors.brand.primary[800]};
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const ConfigContainer = styled.TouchableOpacity`
  display: flex;
  height: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-top: ${theme.spacing(8)};
`;

export const Text = styled.Text`
  padding-left: ${theme.spacing(8)};
`;

export const IconContainer = styled.TouchableOpacity`
  display: flex;
  height: 28px;
  width: 28px;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.spacing(4)};
  background-color: ${theme.colors.brand.primary[800]};
`;

export const InfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing(16)};
  align-items: center;
  margin-top: ${theme.spacing(16)};
  margin-bottom: ${theme.spacing(24)};
`;

export const TitleContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

export const TextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TicketContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid ${theme.colors.brand.primary[900]};
  border-radius: 16px;
  background-color: ${theme.colors.brand.primary[900]};
  padding: ${theme.spacing(24)};
  width: 100%;
`;

export const TicketText = styled.Text`
  ${defaultBodySmMedium}
  color: ${theme.colors.neutral10};
`;

export const TicketLink = styled.Text`
  ${defaultBodySmSemibold}
  color: ${theme.colors.brand.primary[200]};
`;

export const TicketCounter = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing(8)};
`;
export const TicketCounterText = styled.Text`
  ${stylizedDisplayXl}
  color: ${theme.colors.neutral10};
`;

export const Title = styled.Text`
  ${defaultBodySmRegular}
  color: ${theme.colors.neutral[200]};
`;

export const Description = styled.Text`
  ${defaultBodySmSemibold}
  color: ${theme.colors.neutral10};
`;

export const TicketCountWrapper = styled.View`
  position: relative;
  overflow: hidden;
`;
