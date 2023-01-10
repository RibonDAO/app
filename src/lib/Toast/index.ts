import Toast from "react-native-root-toast";

export const showToast = (message: string, duration = Toast.durations.LONG) => {
  Toast.show(message, {
    duration,
  });
};
