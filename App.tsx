import React, { Suspense, useEffect } from "react";
import "./global";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WalletConnectModal } from "@walletconnect/modal-react-native";
import { QueryClientComponent } from "@ribon.io/shared/hooks";
import "./i18n.config";
import { View } from "react-native";
import { debugEventsEnabled } from "./src/config/DebugEventsView/helpers";
import DebugEventsView from "./src/config/DebugEventsView";
import ScrollEnabledProvider from "./src/contexts/scrollEnabledContext";
import StripeProvider from "./src/contexts/stripeContext";
import LanguageProvider from "./src/contexts/languageContext";
import CurrentUserProvider from "./src/contexts/currentUserContext";
import AuthenticationProvider from "./src/contexts/authenticationContext";
import Navigation from "./src/config/navigation";
import useCachedResources from "./src/hooks/useCachedResources";
import UnsafeAreaProvider, {
  useUnsafeAreaContext,
} from "./src/contexts/unsafeAreaContext";
import TasksProvider from "./src/contexts/tasksContext";
import initializeCRM from "./src/services/crm";
import { WALLET_CONNECT_PROJECT_ID } from "./src/utils/constants/Application";

const providerMetadata = {
  name: "Ribon App",
  description: "Donations that make new donors!",
  url: "https://dapp.ribon.io/",
  icons: [
    "https://dapp.ribon.io/static/media/logo.a55fa47db5544540f8f9327782a45e5b.svg",
  ],
  redirect: {
    native: "ribon://",
    universal: "dapp.ribo.io",
  },
};

function Main() {
  const isLoadingComplete = useCachedResources();
  const { topBackgroundColor, bottomBackgroundColor } = useUnsafeAreaContext();

  useEffect(() => {
    initializeCRM();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <WalletConnectModal
          projectId={WALLET_CONNECT_PROJECT_ID}
          providerMetadata={providerMetadata}
        />
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
      </>
    );
  }
}

export default function App() {
  return (
    <Suspense fallback={<View />}>
      <ScrollEnabledProvider>
        <CurrentUserProvider>
          <AuthenticationProvider>
            <LanguageProvider>
              <UnsafeAreaProvider>
                <Main />
              </UnsafeAreaProvider>
            </LanguageProvider>
          </AuthenticationProvider>
        </CurrentUserProvider>
      </ScrollEnabledProvider>
    </Suspense>
  );
}
