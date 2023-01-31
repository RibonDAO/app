import React from "react";
import "./global";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import { QueryClientComponent } from "@ribon.io/shared/hooks";
import "./i18n.config";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CurrentUserProvider from "./src/contexts/currentUserContext";
import Navigation from "./src/config/navigation";
import useColorScheme from "./src/hooks/useColorScheme";
import useCachedResources from "./src/hooks/useCachedResources";

function Main() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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

export default function App() {
  return (
    <CurrentUserProvider>
      <Main />
    </CurrentUserProvider>
  );
}
