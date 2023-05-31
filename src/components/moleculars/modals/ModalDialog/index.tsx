import React from "react";
import Button, {
  Props as ButtonProps,
} from "components/atomics/buttons/Button";
import Icon from "components/atomics/Icon";
import { View, Text, Platform } from "react-native";
import { theme } from "@ribon.io/shared";
import Modal from "react-native-modal";
import * as S from "./styles";

export type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  type?: string | null;
  title?: string | null;
  description?: string | JSX.Element | null;
  children?: JSX.Element | null;
  icon?: string;
  iconColor?: string;
  primaryButton?: ButtonProps | null;
  secondaryButton?: ButtonProps | null;
};

function ModalDialog({
  visible,
  setVisible,
  title = null,
  description = null,
  children = null,
  primaryButton = null,
  secondaryButton = null,
  type,
  icon,
  iconColor,
}: Props): JSX.Element {
  const handleCloseModal = () => {
    setVisible(false);
  };

  const iosProps =
    Platform.OS === "ios"
      ? { animationInTiming: 500, animationOutTiming: 500 }
      : {};

  const modalIcon = () => {
    if (icon) return icon;

    switch (type) {
      case "error":
        return "report";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "info";
    }
  };

  const titleColor = () => {
    switch (type) {
      case "error":
        return theme.colors.feedback.error[900];
      case "warning":
        return theme.colors.brand.quaternary[900];
      case "info":
        return theme.colors.feedback.informational[900];
      default:
        return theme.colors.feedback.informational[900];
    }
  };

  const themeColor = () => {
    switch (type) {
      case "error":
        return theme.colors.feedback.error[600];
      case "warning":
        return theme.colors.brand.quaternary[200];
      case "info":
        return theme.colors.feedback.informational[500];
      default:
        return theme.colors.feedback.informational[500];
    }
  };

  const primaryButtonTextColor = () => {
    switch (type) {
      case "warning":
        return theme.colors.neutral[900];

      default:
        return theme.colors.neutral10;
    }
  };

  const primaryButtonBackgroundColor = () => {
    switch (type) {
      case "error":
        return theme.colors.feedback.error[600];
      case "warning":
        return theme.colors.brand.quaternary[200];
      case "info":
        return theme.colors.brand.primary[600];
      default:
        return theme.colors.brand.primary[600];
    }
  };

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      hasBackdrop
      backdropOpacity={0.5}
      style={{ margin: 0, justifyContent: "flex-end" }}
      {...iosProps}
    >
      <View style={S.default.container}>
        <Icon
          style={S.default.closeIcon}
          type="outlined"
          name="close"
          onPress={handleCloseModal}
          color={theme.colors.neutral[600]}
          size={24}
        />
        {(icon || type) && (
          <Icon
            type="outlined"
            name={type ? modalIcon() : icon}
            color={type ? themeColor() : iconColor}
            size={40}
          />
        )}
        {title && (
          <Text style={[S.default.title, { color: titleColor() }]}>
            {title}
          </Text>
        )}
        {description && (
          <Text style={S.default.description}>{description}</Text>
        )}
        {primaryButton && (
          <Button
            text={primaryButton.text}
            customStyles={S.default.button}
            textColor={primaryButtonTextColor()}
            backgroundColor={primaryButtonBackgroundColor()}
            borderColor={primaryButtonBackgroundColor()}
            onPress={primaryButton.onPress}
          />
        )}
        {secondaryButton && (
          <Button
            text={secondaryButton.text}
            textColor={theme.colors.neutral[600]}
            backgroundColor={theme.colors.neutral10}
            onPress={secondaryButton.onPress}
            borderColor={theme.colors.neutral[600]}
            customStyles={S.default.button}
          />
        )}

        {children}
      </View>
    </Modal>
  );
}

export default ModalDialog;
