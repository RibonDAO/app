import { theme } from "@ribon.io/shared/styles";
import { defaultBodyXsRegular } from "styles/typography/default";
import styled from "styled-components/native";

export const privacyPolicyLink = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-color: ${theme.colors.brand.primary[600]};
`;

export const privacyPolicyLinkText = styled.Text`
  ${defaultBodyXsRegular}

  color: ${theme.colors.brand.primary[600]};
`;

export const privacyPolicyText = styled.Text`
  ${defaultBodyXsRegular}

  color: ${theme.colors.neutral[600]};
`;

export const container = styled.View`
  width: 100%;
  margin: ${theme.spacing(40)};
  margin-top: ${theme.spacing(16)};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
`;
