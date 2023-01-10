import styled from "styled-components/native";

export const Button = styled.TouchableOpacity<{
  outline?: boolean;
  backgroundColor?: string;
  backgroundColorOutline?: string;
  borderColor?: string;
  borderColorOutline?: string;
}>`
  height: 32px;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 4px 8px;
  border: 1px solid
    ${(props) => (props.outline ? props.borderColorOutline : props.borderColor)};
  border-radius: 4px;
  background-color: ${(props) =>
    props.outline ? props.backgroundColorOutline : props.backgroundColor};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text<{
  outline?: boolean;
  textColor?: string;
  textColorOutline?: string;
}>`
  color: ${(props) =>
    props.outline ? props.textColorOutline : props.textColor};
  font-weight: 600;
`;

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
