import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/config/navigation";
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "./src/services/notifications";
import { QueryClientComponent } from "@ribon.io/shared/hooks";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log(token));
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientComponent>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </QueryClientComponent>
    );
  }
}
