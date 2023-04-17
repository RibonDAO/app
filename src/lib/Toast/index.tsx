import { theme } from "@ribon.io/shared/styles";
import Toast from "react-native-root-toast";

const iconToast = (type?: string) => {
  switch (type) {
    case "success":
      return "check_circle";
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

const iconColorToast = (type?: string) => {
  switch (type) {
    case "success":
      return theme.colors.feedback.success[200];
    case "error":
      return theme.colors.feedback.error[200];
    case "warning":
      return theme.colors.feedback.warning[600];
    case "info":
      return theme.colors.feedback.informational[500];
    default:
      return theme.colors.feedback.informational[300];
  }
};

const positionToast = (position?: string) => {
  switch (position) {
    case "top":
      return Toast.positions.TOP;
    case "bottom":
      return Toast.positions.BOTTOM;
    default:
      return Toast.positions.BOTTOM;
  }
};

const backgroundColorToast = {
  success: theme.colors.brand.primary[600],
  error: theme.colors.feedback.error[600],
  warning: theme.colors.brand.quaternary[200],
  info: theme.colors.feedback.informational[500],
};

const textColorToast = (type: string) => {
  switch (type) {
    case "warning":
      return theme.colors.neutral[800];
    default:
      return theme.colors.neutral10;
  }
};

export const showToast = (
  message: string,
  type?: "error" | "success" | "warning" | "info",
  backgroundColor?: string,
  textColor?: string,
  position?: string,
  visible = true,
  duration = Toast.durations.LONG,
) => (
  <Toast
    visible={visible}
    position={positionToast(position)}
    duration={duration}
    backgroundColor={backgroundColor || backgroundColorToast[type || "info"]}
    textColor={textColor || textColorToast(type || "info")}
    shadow={false}
    animation={false}
    hideOnPress
  >
    {message}
  </Toast>
);
