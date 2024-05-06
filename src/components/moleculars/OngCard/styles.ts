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
  border-radius: 16px;
  background-color: ${theme.colors.brand.tertiary[50]};
`;

export const TicketsContainer = styled.View`
  width: 50px;
`;

export const ButtonContainer = styled.View`
  margin-top: 150px;
`;

export const ImageBackground = styled.ImageBackground`
  padding: 24px;
`;
