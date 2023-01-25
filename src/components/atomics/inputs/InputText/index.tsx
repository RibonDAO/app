import React from "react";
import { View } from "components/Themed";
import { KeyboardType, TextInput, TextStyle } from "react-native";
import S from "./styles";

export type Props = {
  name: string;
  value?: string;
  keyboardType?: KeyboardType;
  placeholder?: string | null;
  maxLength?: number;
  disabled?: boolean;
  onChangeText?: (text: string) => void;
  style?: TextStyle;
};

function InputText({
  name,
  value,
  keyboardType,
  placeholder = "",
  onChangeText,
  maxLength,
  disabled,
  style,
}: Props): JSX.Element {
  return (
    <View style={S.container}>
      <TextInput
        placeholder={placeholder || ""}
        keyboardType={keyboardType}
        aria-label={name}
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        style={[disabled ? S.inputDisabled : S.input, style]}
      />
    </View>
  );
}

export default InputText;
