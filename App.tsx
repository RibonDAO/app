import React, { Suspense } from "react";
import "./global";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import { QueryClientComponent } from "@ribon.io/shared/hooks";
import "./i18n.config";
import { Platform, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "@ribon.io/shared/styles";
import ScrollEnabledProvider from "./src/contexts/scrollEnabledContext";
import LanguageProvider from "./src/contexts/languageContext";
import CurrentUserProvider from "./src/contexts/currentUserContext";
import Navigation from "./src/config/navigation";
import useColorScheme from "./src/hooks/useColorScheme";
import useCachedResources from "./src/hooks/useCachedResources";
import UnsafeAreaProvider, {
  useUnsafeAreaContext,
} from "./src/contexts/unsafeAreaContext";

function Main() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { topBackgroundColor, bottomBackgroundColor } = useUnsafeAreaContext();

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
            <SafeAreaView
              edges={["top"]}
              style={{ flex: 1, backgroundColor: topBackgroundColor }}
            >
              <SafeAreaView
                edges={["bottom"]}
                style={{ flex: 1, backgroundColor: bottomBackgroundColor }}
              >
                <Navigation colorScheme={colorScheme} />
                <StatusBar style="dark" />
              </SafeAreaView>
            </SafeAreaView>
          </SafeAreaProvider>
        </QueryClientComponent>
      </WalletConnectProvider>
    );
  }
}

export default function App() {
  return (
    <Suspense fallback={<View />}>
      <ScrollEnabledProvider>
        <CurrentUserProvider>
          <LanguageProvider>
            <UnsafeAreaProvider>
              <Main />
            </UnsafeAreaProvider>
          </LanguageProvider>
        </CurrentUserProvider>
      </ScrollEnabledProvider>
    </Suspense>
  );
}
