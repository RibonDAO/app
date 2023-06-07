import React, { RefObject, useState } from "react";
import { View, ViewStyle } from "react-native";
import { KeyboardType, TextInput, TextInputProps, Text } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import { MaskedTextInput } from "react-native-mask-text";
import S from "./styles";

export interface Props extends Omit<TextInputProps, "placeholder"> {
  name: string;
  value?: string;
  keyboardType?: KeyboardType;
  placeholder?: string | null;
  maxLength?: number;
  disabled?: boolean;
  onChangeText: (text: string) => void;
  ref?: RefObject<TextInput>;
  errorMessage?: string;
  status?: string;
  containerStyle?: ViewStyle;
  helper?: string;
  required?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  label?: string;
  labelIcon?: any;
  mask?: string;
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
  helper,
  required,
  leftIcon,
  rightIcon,
  labelIcon,
  label,
  mask,
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
      <View style={S.labelIcon}>
        <Text style={[disabled ? S.labelDisabled : S.label, S.label]}>
          {required && <Text style={S.required}>*</Text>}
          {label}{" "}
        </Text>
        {labelIcon && (
          <Icon
            type="rounded"
            name={labelIcon}
            size={20}
            color={theme.colors.neutral[600]}
          />
        )}
      </View>
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
        {leftIcon && (
          <Icon
            type="rounded"
            name={leftIcon}
            size={20}
            color={theme.colors.neutral[600]}
            style={S.leftIcon}
          />
        )}
        {rightIcon && (
          <Icon
            type="rounded"
            name={rightIcon}
            size={20}
            color={theme.colors.neutral[600]}
            style={S.rightIcon}
          />
        )}
        {mask ? (
          <MaskedTextInput
            ref={rest.ref}
            mask={mask ?? ""}
            placeholder={placeholder || ""}
            placeholderTextColor={theme.colors.neutral[500]}
            keyboardType={keyboardType || "default"}
            aria-label={name}
            value={value}
            maxLength={maxLength}
            onChangeText={onChangeText}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            style={rightIcon ? S.input : null}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            {...rest}
          />
        ) : (
          <TextInput
            ref={rest.ref}
            placeholder={placeholder || ""}
            placeholderTextColor={theme.colors.neutral[500]}
            keyboardType={keyboardType || "default"}
            aria-label={name}
            value={value}
            maxLength={maxLength}
            onChangeText={onChangeText}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            style={rightIcon ? S.input : null}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            {...rest}
          />
        )}
      </View>
      {errorMessage && status === "error" && (
        <View style={S.feedback}>
          <Icon
            type="rounded"
            name="dangerous"
            size={20}
            color={theme.colors.feedback.error[600]}
            style={S.iconError}
          />

          <Text style={S.errorMessage}>{errorMessage}</Text>
        </View>
      )}
      {helper && (
        <View style={S.feedback}>
          <Icon
            type="rounded"
            name="error"
            size={20}
            color={theme.colors.neutral[600]}
            style={S.iconError}
          />

          <Text style={S.helper}>{helper}</Text>
        </View>
      )}
    </View>
  );
}

export default InputText;
