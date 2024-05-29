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
  padding: 16px 20px;
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
`;

export const ArrowContainer = styled.View`
  width: 24px;
`;

export const ArrowController = styled.View`
  ${(props: { isExpanded: boolean }) =>
    props.isExpanded ? "transform: rotate(180deg)" : ""};

  ${(props: { isExpansible: boolean }) =>
    !props.isExpansible ? "display: none" : ""};
`;

export const MainArea = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const TextArea = styled.View`
  text-align: left;
`;

export const DescriptionTitle = styled.Text`
  ${defaultBodySmSemibold}
  color: ${theme.colors.brand.primary[800]};
`;
export const Description = styled.Text`
  ${defaultBodySmRegular}
  max-width: 272px;
  color: ${theme.colors.neutral[600]};
`;
