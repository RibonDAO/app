import React from "react";
import "./global";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import { QueryClientComponent } from "@ribon.io/shared/hooks";
import "./i18n.config";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from "./src/config/navigation";
import useColorScheme from "./src/hooks/useColorScheme";
import useCachedResources from "./src/hooks/useCachedResources";
import { initializeApi } from "./src/services/api";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    initializeApi();
  }, []);

  if (!isLoadingComplete) {
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
