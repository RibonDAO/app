import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as Sentry from "sentry-expo";
import { useEffect, useState } from "react";
import { registerForPushNotificationsAsync } from "services/notifications";
import { initializeApi } from "services/api";
import * as SplashScreen from "expo-splash-screen";
import MaterialSymbolsRounded from "assets/fonts/material/MaterialSymbolsRounded.ttf";
import MaterialSymbolsOutlined from "assets/fonts/material/MaterialSymbolsOutlined.ttf";
import MaterialSymbolsSharp from "assets/fonts/material/MaterialSymbolsSharp.ttf";
import { useCurrentUser } from "contexts/currentUserContext";
import { useLanguage } from "contexts/languageContext";
import { formattedLanguage } from "lib/formatters/languageFormatter";
import * as Notifications from "expo-notifications";
import GambarinoRegular from "../assets/fonts/Gambarino-Regular.ttf";
import Inter400 from "../assets/fonts/inter/Inter-Regular.ttf";
import Inter900 from "../assets/fonts/inter/Inter-Black.ttf";
import Inter700 from "../assets/fonts/inter/Inter-Bold.ttf";
import Inter800 from "../assets/fonts/inter/Inter-ExtraBold.ttf";
import Inter200 from "../assets/fonts/inter/Inter-ExtraLight.ttf";
import Inter300 from "../assets/fonts/inter/Inter-Light.ttf";
import Inter500 from "../assets/fonts/inter/Inter-Medium.ttf";
import Inter600 from "../assets/fonts/inter/Inter-SemiBold.ttf";
import Inter100 from "../assets/fonts/inter/Inter-Thin.ttf";

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
  }, []);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "Gambarino-Regular": GambarinoRegular,
          Inter400,
          Inter900,
          Inter700,
          Inter800,
          Inter200,
          Inter300,
          Inter500,
          Inter600,
          Inter100,
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
