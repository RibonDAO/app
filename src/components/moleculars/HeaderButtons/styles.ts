import { theme } from "@ribon.io/shared";
import styled from "styled-components/native";

export const ConfigContainer = styled.Pressable`
  display: flex;
  height: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-top: ${theme.spacing(8)};
`;
