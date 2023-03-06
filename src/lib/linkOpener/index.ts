import { Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";

export const openLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    await WebBrowser.openBrowserAsync(url);
  }
};

export const openInWebViewer = async (url: string) => {
  await WebBrowser.openBrowserAsync(url);
};

export const openInExternalBrowser = async (url: string) => {
  await Linking.openURL(url);
};
