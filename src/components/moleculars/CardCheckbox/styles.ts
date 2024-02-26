import styled from "styled-components/native";
import {
  defaultBodyLgSemibold,
  defaultBodySmMedium,
  defaultBodyMdMedium,
} from "styles/typography/default";
import { theme } from "@ribon.io/shared/styles";

export const Container = styled.TouchableOpacity<{ checked: boolean }>`
  display: flex;
  width: 328px;
  border-radius: ${theme.spacing(16)};
  background-color: ${(props: { checked: boolean }) =>
    props.checked ? theme.colors.brand.tertiary[25] : theme.colors.neutral10};
  border: 4px solid
    ${(props: { checked: boolean }) =>
      props.checked
        ? theme.colors.brand.tertiary[600]
        : theme.colors.neutral10};
`;

export const Tag = styled.View`
  padding: ${theme.spacing(0, 16)};
  border-radius: ${theme.spacing(12, 0)};
  align-self: flex-start;
  background: ${theme.colors.brand.tertiary[200]};
`;

export const TagText = styled.Text`
  ${defaultBodySmMedium}

  color: ${theme.colors.brand.tertiary[900]};
`;

export const MainContent = styled.View`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(8, 20, 20, 20)};
`;

export const SelectValue = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Value = styled.Text`
  ${defaultBodyLgSemibold}
`;

export const Recurrence = styled.Text`
  ${defaultBodySmMedium}
`;

export const Checkbox = styled.TouchableOpacity`
  width: ${theme.spacing(20)};
  height: ${theme.spacing(20)};
  border-radius: 50px;
  border: ${(props: { checked: boolean }) =>
    props.checked
      ? `6px solid ${theme.colors.brand.tertiary[600]}`
      : `2px solid ${theme.colors.neutral[600]}`};
  align-items: center;
  justify-content: center;
`;

export const IconWithText = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing(8)};
  margin-top: ${theme.spacing(8)};
`;

export const DescriptionText = styled.Text`
  ${defaultBodyMdMedium}
`;

export const Text = styled.Text`
  display: flex;
  align-items: center;
  color: ${theme.colors.brand.tertiary[600]};
`;

export const Icon = styled.View`
  width: ${theme.spacing(24)};
  align-items: center;
`;
