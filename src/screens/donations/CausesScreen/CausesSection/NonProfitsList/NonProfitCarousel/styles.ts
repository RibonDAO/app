import { theme } from "@ribon.io/shared";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  margin-bottom: ${theme.spacing(24)};
`;

export const NotFoundContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: ${theme.spacing(16)};
`;

type NonProfitProps = {
  isFirst: boolean;
  isLast: boolean;
};

export const NonProfitContainer = styled.View<NonProfitProps>`
  height: 432px;
  width: 296px;
  margin-left: ${(props: { isFirst: boolean }) =>
    props.isFirst ? "16px" : "0"};
  margin-right: ${(props: { isLast: boolean }) =>
    props.isLast ? "16px" : "12px"};
`;
