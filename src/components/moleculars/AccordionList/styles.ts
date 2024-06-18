import { theme } from "@ribon.io/shared";
import styled from "styled-components/native";
import {
  defaultBodyLgSemibold,
  defaultBodyMdSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";

export const Title = styled.Text`
  ${defaultBodyLgSemibold}
  margin: auto;
  margin-top: 16px;
  color: ${theme.colors.neutral[800]};
`;

export const SubTitle = styled.Text`
  ${defaultBodySmRegular}
  margin: auto;
  margin-bottom: 8px;
  color: ${theme.colors.neutral[600]};
`;

export const ItemSeparator = styled.View`
  background-color: ${theme.colors.neutral[200]};
  height: 1px;
  margin: 4px 0;
`;

export const SectionSeparator = styled.View`
  background-color: ${theme.colors.neutral[200]};
  height: 8px;
  margin: 15px 0;
`;

export const EmptyComponentContainer = styled.View`
  display: flex;
  align-items: center;
  margin: 32px 16px;
  gap: 24px;
`;

export const EmptyComponentText = styled.Text`
  ${defaultBodyMdSemibold}
  color: ${theme.colors.neutral[500]};
  margin: 0 12px;
  text-align: center;
`;
