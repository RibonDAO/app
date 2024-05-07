import { ScrollView } from "react-native";
import {
  useDonatedToday,
  useDonationStreak,
  useSubscriptions,
} from "@ribon.io/shared";

import { useCallback } from "react";
import { useRouteParams } from "hooks/useRouteParams";
import { useFocusEffect } from "@react-navigation/native";

import { useCurrentUser } from "contexts/currentUserContext";
import { useTicketsContext } from "contexts/ticketsContext";

import TabViewSection from "./TabViewSection";
import * as S from "./styles";
import Header from "./Header";

export default function EarnTicketsScreen(): JSX.Element {
  const { params } = useRouteParams<"EarnTicketsScreen">();

  const { refetch: refetchDonatedToday } = useDonatedToday();
  const { currentUser } = useCurrentUser();
  const { refetchTickets } = useTicketsContext();
  const { userIsMember, userSubscriptions } = useSubscriptions();
  const { refetch: refetchIsMember } = userIsMember();
  const { refetch: refetchSubscriptions } = userSubscriptions();
  const { streak, refetch: refetchDonationStreak } = useDonationStreak();

  useFocusEffect(
    useCallback(() => {
      refetchDonatedToday();
      refetchTickets();
      refetchIsMember();
      refetchSubscriptions();
      refetchDonationStreak();
    }, [currentUser]),
  );

  return (
    <ScrollView style={S.Container}>
      <Header streak={streak} />

      <TabViewSection initialTabIndex={params?.currentTab || 0} />
    </ScrollView>
  );
}
