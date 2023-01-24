import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { registerForPushNotificationsAsync } from "services/notifications";
import SpaceMono from "../assets/fonts/SpaceMono-Regular.ttf";
import GambarinoRegular from "../assets/fonts/Gambarino-Regular.ttf";
import Inter from "../assets/fonts/Inter.ttf";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log(token));
  }, []);
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "space-mono": SpaceMono,
          "Gambarino-Regular": GambarinoRegular,
          Inter: Inter,
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
