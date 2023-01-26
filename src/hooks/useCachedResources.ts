import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as Sentry from "sentry-expo";
import { useEffect, useState } from "react";
import { registerForPushNotificationsAsync } from "services/notifications";
import { initializeApi } from "services/api";
import MaterialSymbolsRounded from "assets/fonts/MaterialSymbolsRounded.ttf";
import MaterialSymbolsOutlined from "assets/fonts/MaterialSymbolsOutlined.ttf";
import MaterialSymbolsSharp from "assets/fonts/MaterialSymbolsSharp.ttf";
import SpaceMono from "../assets/fonts/SpaceMono-Regular.ttf";
import GambarinoRegular from "../assets/fonts/Gambarino-Regular.ttf";
import Inter from "../assets/fonts/Inter.ttf";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    initializeApi();
  }, []);

  useEffect(() => {
    Sentry.init({
      dsn: "https://c39226956ee34786a8acdb34123f7d3b@o409844.ingest.sentry.io/4504565365473280",
      enableInExpoDevelopment: false,
      debug: true,
    });
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log(token));
  }, []);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
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
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
