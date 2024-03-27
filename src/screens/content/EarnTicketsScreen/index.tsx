import { ScrollView, RefreshControl } from "react-native";
import { useDonatedToday, useSubscriptions } from "@ribon.io/shared";

import { useCallback, useState } from "react";
import EarnTicketsTabsProvider from "contexts/earnTicketsTabsContext";
import { useRouteParams } from "hooks/useRouteParams";
import { useFocusEffect } from "@react-navigation/native";

import { useCurrentUser } from "contexts/currentUserContext";
import { useTicketsContext } from "contexts/ticketsContext";
import { logError } from "services/crashReport";
import TabViewSection from "./TabViewSection";
import styles from "./styles";

export default function EarnTicketsScreen(): JSX.Element {
  const { params } = useRouteParams<"EarnTicketsScreen">();

  const { refetch: refetchDonatedToday } = useDonatedToday();
  const { currentUser } = useCurrentUser();
  const { refetchTickets } = useTicketsContext();
  const { userIsMember, userSubscriptions } = useSubscriptions();
  const { refetch: refetchIsMember } = userIsMember();
  const { refetch: refetchSubscriptions } = userSubscriptions();

  const [refreshing, setRefreshing] = useState(false);
  useFocusEffect(
    useCallback(() => {
      refetchDonatedToday();
      refetchTickets();
    }, [currentUser]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      refetchTickets();
      await refetchIsMember();
      await refetchSubscriptions();
    } catch (e) {
      logError(e);
    } finally {
      setRefreshing(false);
    }
  }, [refetchTickets, refetchIsMember, refetchSubscriptions]);

  return (
    <EarnTicketsTabsProvider>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TabViewSection initialTabIndex={params?.currentTab || 0} />
      </ScrollView>
    </EarnTicketsTabsProvider>
  );
}
