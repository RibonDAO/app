import React, { RefObject } from "react";
import { View } from "react-native";
import {
  KeyboardType,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import S from "./styles";
import {theme} from "@ribon.io/shared/styles";

export interface Props extends Omit<TextInputProps, "placeholder"> {
  name: string;
  value?: string;
  keyboardType?: KeyboardType;
  placeholder?: string | null;
  maxLength?: number;
  disabled?: boolean;
  onChangeText?: (text: string) => void;
  style?: TextStyle;
  containerStyle?: ViewStyle;
  ref?: RefObject<TextInput>;
}

function InputText({
  name,
  value,
  keyboardType,
  placeholder = "",
  onChangeText,
  maxLength,
  disabled,
  style,
  containerStyle,
  ...rest
}: Props): JSX.Element {
  return (
    <View style={[S.container, containerStyle]}>
      <TextInput
        ref={rest.ref}
        placeholder={placeholder || ""}
        placeholderTextColor={theme.colors.gray20}
        keyboardType={keyboardType}
        aria-label={name}
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        style={[disabled ? S.inputDisabled : S.input, style]}
        {...rest}
      />
    </View>
  );
}

export default InputText;
