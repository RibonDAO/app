import styled from "styled-components/native";

import {
  defaultBodySmMedium,
  defaultBodyXsRegular,
  defaultBodySmSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.Pressable`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const Title = styled.Text`
  ${defaultBodySmMedium}
  color: ${theme.colors.neutral[800]};
`;

export const Subtitle = styled.Text`
  ${defaultBodyXsRegular}
  color: ${theme.colors.neutral[600]};
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
  grid-area: image;
`;

export const ArrowContainer = styled.View``;

export const MiddleContainer = styled.View``;

export const MainArea = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`;

export const DescriptionArea = styled.View``;
export const DescriptionTitle = styled.Text`
  ${defaultBodySmSemibold}
  color: ${theme.colors.brand.primary[800]};
`;
export const Description = styled.Text`
  ${defaultBodySmRegular}
  max-width: 272px;
  color: ${theme.colors.neutral[600]};
`;

export const LeftArea = styled.View``;
export const RightArea = styled.View``;

export const Body = styled.View``;
