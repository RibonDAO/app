import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as Sentry from "sentry-expo";
import { useEffect, useState } from "react";
import { registerForPushNotificationsAsync } from "services/notifications";
import { initializeApi } from "services/api";
import * as SplashScreen from "expo-splash-screen";
import MaterialSymbolsRounded from "assets/fonts/MaterialSymbolsRounded.ttf";
import MaterialSymbolsOutlined from "assets/fonts/MaterialSymbolsOutlined.ttf";
import MaterialSymbolsSharp from "assets/fonts/MaterialSymbolsSharp.ttf";
import { useCurrentUser } from "contexts/currentUserContext";
import { useLanguage } from "contexts/languageContext";
import { formattedLanguage } from "lib/formatters/languageFormatter";
import * as Notifications from "expo-notifications";
import SpaceMono from "../assets/fonts/SpaceMono-Regular.ttf";
import GambarinoRegular from "../assets/fonts/Gambarino-Regular.ttf";
import Inter from "../assets/fonts/Inter.ttf";
import initializeChat from "services/chat";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { currentUser } = useCurrentUser();
  const { currentLang } = useLanguage();
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    initializeChat();
  },[]);


  useEffect(() => {
    initializeApi({
      email: currentUser?.email,
      language: formattedLanguage(currentLang),
    });
  }, [JSON.stringify(currentUser), currentLang]);

  useEffect(() => {
    Sentry.init({
      dsn: "https://c39226956ee34786a8acdb34123f7d3b@o409844.ingest.sentry.io/4504565365473280",
      enableInExpoDevelopment: false,
      debug: true,
    });
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) =>
      setExpoPushToken(token),
    );

    console.log(expoPushToken);
  }, []);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "space-mono": SpaceMono,
          "Gambarino-Regular": GambarinoRegular,
          Inter,
          MaterialSymbolsRounded,
          MaterialSymbolsOutlined,
          MaterialSymbolsSharp,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        // eslint-disable-next-line
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
