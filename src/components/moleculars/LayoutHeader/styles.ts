import styled from "styled-components/native";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.TouchableOpacity`
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

export const SupportContainer = styled.View`
  position: absolute;
  right: -5px;
  top: 50px;
  width: 300px;
  border-radius: ${theme.spacing(16)};
  border-color: ${theme.colors.neutral[200]};
  background-color: ${theme.colors.neutral10};
  border-width: 1px;
  shadow-color: rgba(40, 36, 28, 0.2);
  shadow-offset: 0px 2px;
  shadow-radius: 10px;
  shadow-opacity: 0.8;
  display: flex;
  flex-direction: column;
  padding-horizontal: ${theme.spacing(12)};
`;

export const ConfigItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 53px;
  border-color: ${theme.colors.neutral[200]};
  border-bottom-width: ${theme.spacing(2)};
`;

export const Text = styled.Text`
  padding-left: ${theme.spacing(8)};
`;

export const IconContainer = styled.View`
  width: 10%;
`;

export const TextContainer = styled.View`
  width: 60%;
`;

export const CtaContainer = styled.View`
  width: 30%;
  padding-right: ${theme.spacing(8)};
`;

export const ConfigContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${theme.spacing(24)};
`;

export const TicketSection = styled.View`
  padding-vertical: 5px;
  padding-horizontal: 7px;
  border-right-width: 1px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(12)};
`;

export const TicketCounter = styled.Text`
  font-size: 14px;
  line-height: 17px;
  margin-right: ${theme.spacing(4)};
  margin-left: ${theme.spacing(4)};
`;

export const WalletContainer = styled.View`
  padding-vertical: 5px;
  padding-horizontal: 7px;
  border-radius: ${theme.spacing(4)};
  border-width: 1px;
  border-color: ${theme.colors.brand.primary[600]};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(12)};
`;

export const WalletText = styled.Text`
  font-size: ${theme.spacing(12)};
  margin-right: ${theme.spacing(4)};
  color: ${theme.colors.brand.primary[600]};
  text-align: center;
  line-height: 16px;
`;
