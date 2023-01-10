import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as eva from '@eva-design/eva';
import { ThemeProvider } from "styled-components/native";
import theme from "./src/styles/theme";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/config/navigation";
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "./src/services/notifications";
import { QueryClientComponent } from "@ribon.io/shared/hooks";
import { ApplicationProvider } from "@ui-kitten/components";
import "./i18n.config";

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
          <ThemeProvider theme={theme}>
            <ApplicationProvider {...eva} theme={eva.light}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </ApplicationProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientComponent>
    );
  }
}
