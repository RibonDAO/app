import { View } from "react-native";
import { useDonatedToday } from "@ribon.io/shared";

import { useCallback } from "react";
import ForYouTabsProvider from "contexts/forYouTabsContext";
import { useRouteParams } from "hooks/useRouteParams";
import { useFocusEffect } from "@react-navigation/native";

import { useCurrentUser } from "contexts/currentUserContext";
import TabViewSection from "./TabViewSection";
import styles from "./styles";

export default function ForYouScreen(): JSX.Element {
  const { params } = useRouteParams<"ForYouScreen">();

  const { refetch: refetchDonatedToday } = useDonatedToday();
  const { currentUser } = useCurrentUser();

  useFocusEffect(
    useCallback(() => {
      refetchDonatedToday();
    }, [currentUser]),
  );

  return (
    <ForYouTabsProvider>
      <View style={styles.container}>
        <TabViewSection initialTabIndex={params?.currentTab || 0} />
      </View>
    </ForYouTabsProvider>
  );
}
