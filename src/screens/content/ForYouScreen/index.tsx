import { View } from "react-native";
import { useCanDonate } from "@ribon.io/shared";
import { PLATFORM, RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import { useEffect } from "react";
import ForYouTabsProvider from "contexts/forYouTabsContext";
import { useRouteParams } from "hooks/useRouteParams";
import TabViewSection from "./TabViewSection";
import styles from "./styles";

export default function ForYouScreen(): JSX.Element {
  const { params } = useRouteParams<"ForYouScreen">();

  const { currentUser } = useCurrentUser();

  const { refetch: refetchCanDonate } = useCanDonate(
    RIBON_INTEGRATION_ID,
    PLATFORM,
  );

  useEffect(() => {
    setTimeout(() => {
      refetchCanDonate();
    }, 500);
  }, [JSON.stringify(currentUser)]);

  return (
    <ForYouTabsProvider>
      <View style={styles.container}>
        <TabViewSection initialTabIndex={params?.currentTab || 0} />
      </View>
    </ForYouTabsProvider>
  );
}
