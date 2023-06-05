import React, { RefObject, useState } from "react";
import { View, ViewStyle } from "react-native";
import { KeyboardType, TextInput, TextInputProps, Text } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import S from "./styles";

export interface Props extends Omit<TextInputProps, "placeholder"> {
  name: string;
  value?: string;
  keyboardType?: KeyboardType;
  placeholder?: string | null;
  maxLength?: number;
  disabled?: boolean;
  onChangeText?: (text: string) => void;
  ref?: RefObject<TextInput>;
  errorMessage?: string;
  status?: string;
  containerStyle?: ViewStyle;
}

function InputText({
  name,
  value,
  keyboardType,
  placeholder = "",
  onChangeText,
  maxLength,
  disabled,
  errorMessage,
  status,
  containerStyle,
  ...rest
}: Props): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  const customInputStyle = () => {
    if (status === "success") {
      return S.inputSuccess;
    }

    if (status === "error") {
      return S.inputError;
    }

    if (disabled) {
      return S.inputDisabled;
    }

    if (isActive) {
      return S.inputActive;
    }

    return S.inputContainer;
  };

  return (
    <View style={[S.container, containerStyle]}>
      <Text style={[disabled ? S.labelDisabled : S.label, S.label]}>
        {placeholder}
      </Text>
      <View style={[S.inputContainer, customInputStyle()]}>
        {status === "success" && (
          <Icon
            type="rounded"
            name="check_circle"
            size={20}
            color={theme.colors.feedback.success[600]}
            style={S.iconInput}
          />
        )}
        <TextInput
          ref={rest.ref}
          placeholder={placeholder || ""}
          placeholderTextColor={theme.colors.neutral[500]}
          keyboardType={keyboardType}
          aria-label={name}
          value={value}
          maxLength={maxLength}
          onChangeText={onChangeText}
          editable={!disabled}
          selectTextOnFocus={!disabled}
          style={S.input}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          {...rest}
        />
      </View>
      {errorMessage && status === "error" && (
        <View style={S.feedback}>
          <Icon
            type="rounded"
            name="dangerous"
            size={20}
            color={theme.colors.feedback.error[600]}
          />

          <Text style={S.errorMessage}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
}

export default InputText;
