import { View } from "react-native";
import { useCanDonate } from "@ribon.io/shared";
import { PLATFORM, RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCallback } from "react";
import ForYouTabsProvider from "contexts/forYouTabsContext";
import { useRouteParams } from "hooks/useRouteParams";
import { useFocusEffect } from "@react-navigation/native";
import TabViewSection from "./TabViewSection";
import styles from "./styles";

export default function ForYouScreen(): JSX.Element {
  const { params } = useRouteParams<"ForYouScreen">();

  const { refetch: refetchCanDonate } = useCanDonate(
    RIBON_INTEGRATION_ID,
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
