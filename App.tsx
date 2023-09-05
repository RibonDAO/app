import React, { Suspense, useEffect } from "react";
import "./global";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import { QueryClientComponent } from "@ribon.io/shared/hooks";
import "./i18n.config";
import { Platform, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { debugEventsEnabled } from "./src/config/DebugEventsView/helpers";
import DebugEventsView from "./src/config/DebugEventsView";
import ScrollEnabledProvider from "./src/contexts/scrollEnabledContext";
import StripeProvider from "./src/contexts/stripeContext";
import LanguageProvider from "./src/contexts/languageContext";
import CurrentUserProvider from "./src/contexts/currentUserContext";
import Navigation from "./src/config/navigation";
import useCachedResources from "./src/hooks/useCachedResources";
import UnsafeAreaProvider, {
  useUnsafeAreaContext,
} from "./src/contexts/unsafeAreaContext";
// import { initZendeskSupportChat } from "./src/services/support/zendesk";
import { REACT_APP_ZENDESK_IOS_KEY } from "./src/utils/constants/Application";
import TasksProvider from "./src/contexts/tasksContext";

function Main() {
  const isLoadingComplete = useCachedResources();
  const { topBackgroundColor, bottomBackgroundColor } = useUnsafeAreaContext();

  useEffect(() => {
    if (Platform.OS === "ios") {
      console.log(REACT_APP_ZENDESK_IOS_KEY);
      // initZendeskSupportChat(REACT_APP_ZENDESK_IOS_KEY)
    }
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
          <TasksProvider>
            <SafeAreaProvider>
              <SafeAreaView
                edges={["top"]}
                style={{ flex: 1, backgroundColor: topBackgroundColor }}
              >
                <SafeAreaView
                  edges={["bottom"]}
                  style={{ flex: 1, backgroundColor: bottomBackgroundColor }}
                >
                  {debugEventsEnabled() && <DebugEventsView />}
                  <StripeProvider>
                    <Navigation />
                    <StatusBar />
                  </StripeProvider>
                </SafeAreaView>
              </SafeAreaView>
            </SafeAreaProvider>
          </TasksProvider>
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
