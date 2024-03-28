import { View } from "react-native";
import { useDonatedToday, useSubscriptions } from "@ribon.io/shared";

import { useCallback } from "react";
import EarnTicketsTabsProvider from "contexts/earnTicketsTabsContext";
import { useRouteParams } from "hooks/useRouteParams";
import { useFocusEffect } from "@react-navigation/native";

import { useCurrentUser } from "contexts/currentUserContext";
import { useTicketsContext } from "contexts/ticketsContext";

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

  useFocusEffect(
    useCallback(() => {
      refetchDonatedToday();
      refetchTickets();
      refetchIsMember();
      refetchSubscriptions();
    }, [currentUser]),
  );

  return (
    <EarnTicketsTabsProvider>
      <View style={styles.container}>
        <TabViewSection initialTabIndex={params?.currentTab || 0} />
      </View>
    </EarnTicketsTabsProvider>
  );
}
