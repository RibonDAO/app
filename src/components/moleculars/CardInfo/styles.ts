import { theme } from "@ribon.io/shared/styles";
import styled from "styled-components/native";
import {
  defaultBodyMdSemibold,
  defaultBodySmRegular,
} from "styles/typography/default";

export const InnerCardContainer = styled.View`
  width: 100%;
  padding: ${theme.spacing(16)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${theme.breakpoints.pad}) {
    padding: 0;
  }
`;

export const SubtitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: "flex-start";
  justify-content: "flex-start";
  gap: ${theme.spacing(16)};
`;

export const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: { iconBackgroundColor: string }) =>
    props.iconBackgroundColor || theme.colors.neutral[100]};
`;

export const Title = styled.Text`
  ${defaultBodyMdSemibold};
  color: ${(props: { titleColor: string }) =>
    props.titleColor || theme.colors.neutral[800]};
`;

export const ChildrenContainer = styled.Text`
  ${defaultBodySmRegular};
  color: ${theme.colors.neutral[700]};
`;
