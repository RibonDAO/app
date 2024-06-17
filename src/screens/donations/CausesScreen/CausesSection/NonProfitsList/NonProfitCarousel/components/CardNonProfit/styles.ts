import styled from "styled-components/native";
import {
  defaultBodySmMedium,
  defaultHeadingXs,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

export const OngName = styled.Text`
  ${defaultBodySmMedium};
  color: ${theme.colors.neutral[600]};
`;

export const Title = styled.Text`
  ${defaultHeadingXs};
  color: ${theme.colors.neutral[800]};
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-color: ${theme.colors.brand.tertiary[50]};
`;

export const TicketsContainer = styled.View`
  align-self: flex-start;
`;

export const ButtonContainer = styled.View``;

export const ImageBackground = styled.ImageBackground`
  flex: 1;
  padding: 24px;
  justify-content: space-between;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: flex-start;
`;
