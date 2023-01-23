import React from "react";
import "./global";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import { QueryClientComponent } from "@ribon.io/shared/hooks";
import { useFonts } from "expo-font";
import "./i18n.config";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "./src/services/notifications";
import Navigation from "./src/config/navigation";
import useColorScheme from "./src/hooks/useColorScheme";
import useCachedResources from "./src/hooks/useCachedResources";
import { initializeApi } from "./src/services/api";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    "Gambarino-Regular": require("./src/assets/fonts/Gambarino-Regular.ttf"),
    Inter: require("./src/assets/fonts/Inter.ttf"),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log(token));
  }, []);

  useEffect(() => {
    initializeApi();
  }, []);

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <WalletConnectProvider
        redirectUrl={
          Platform.OS === "web" ? window.location.origin : "ribon://"
        }
        storageOptions={{
          asyncStorage: AsyncStorage as any,
        }}
      >
        <QueryClientComponent>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </QueryClientComponent>
      </WalletConnectProvider>
    );
  }
}
