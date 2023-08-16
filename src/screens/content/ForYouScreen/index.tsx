import { View } from "react-native";
import { useCanDonate } from "@ribon.io/shared";
import { PLATFORM } from "utils/constants/Application";
import { useCallback } from "react";
import ForYouTabsProvider from "contexts/forYouTabsContext";
import { useRouteParams } from "hooks/useRouteParams";
import { useFocusEffect } from "@react-navigation/native";
import { useIntegrationContext } from "contexts/integrationContext";
import TabViewSection from "./TabViewSection";
import styles from "./styles";

export default function ForYouScreen(): JSX.Element {
  const { params } = useRouteParams<"ForYouScreen">();

  const { currentIntegrationId } = useIntegrationContext();

  const { refetch: refetchCanDonate } = useCanDonate(
    currentIntegrationId,
    PLATFORM,
  );

  useFocusEffect(
    useCallback(() => {
      refetchCanDonate();
    }, []),
  );

  return (
    <ForYouTabsProvider>
      <View style={styles.container}>
        <TabViewSection initialTabIndex={params?.currentTab || 0} />
      </View>
    </ForYouTabsProvider>
  );
}
