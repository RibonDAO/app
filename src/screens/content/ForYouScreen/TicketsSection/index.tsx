import { View } from "react-native";
import { useTickets, useSubscriptions } from "@ribon.io/shared/hooks";
import { Categories, Plan } from "@ribon.io/shared";
import { useTicketsContext } from "contexts/ticketsContext";

import { useCallback, useEffect, useState } from "react";

import { useCurrentUser } from "contexts/currentUserContext";
import { useFocusEffect } from "@react-navigation/native";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import DailyTicketCard from "./DailyTicketCard";
import S from "./styles";
import ClubDailyTicketCard from "./ClubDailyTicketCard";
import ClubMonthlyTicketCard from "./ClubMonthlyTicketCard";

export default function TicketsSection() {
  const { userIsMember, userSubscriptions } = useSubscriptions();
  const { isMember, refetch: refetchIsMember } = userIsMember();
  const { getTicketsToCollect } = useTickets();
  const { toCollect, refetch } = getTicketsToCollect(Categories.CLUB);
  const { refetchTickets } = useTicketsContext();
  const { currentUser } = useCurrentUser();
  const { subscriptions, refetch: refetchSubscriptions } = userSubscriptions();
  const [plan, setPlan] = useState<Plan | undefined>(undefined);

  const { navigateTo } = useNavigation();
  const [unauthorizedModalVisible, setUnauthorizedModalVisible] =
    useState(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.clubTicketsSection",
  });

  useEffect(() => {
    if (subscriptions) {
      const currentPlan = subscriptions?.find(
        (subscription) =>
          subscription.offer?.category === "club" &&
          subscription.status === "active" &&
          subscription.offer?.plan,
      )?.offer.plan;
      setPlan(currentPlan);
    } else {
      setPlan(undefined);
    }
  }, [subscriptions]);

  const refetchTicketsToCollect = () => {
    refetch();
    refetchTickets();
    refetchIsMember();
    refetchSubscriptions();
  };

  useFocusEffect(
    useCallback(() => {
      refetchTicketsToCollect();
    }, [toCollect, isMember, currentUser]),
  );

  return (
    <View style={S.container}>
      <DailyTicketCard />
      <ClubDailyTicketCard
        tickets={toCollect?.dailyTickets}
        isMember={isMember}
        refetchTickets={refetchTicketsToCollect}
        plan={plan?.dailyTickets}
        setUnauthorizedModalVisible={setUnauthorizedModalVisible}
      />
      <ClubMonthlyTicketCard
        tickets={toCollect?.monthlyTickets}
        isMember={isMember}
        refetchTickets={refetchTicketsToCollect}
        plan={plan?.monthlyTickets}
        setUnauthorizedModalVisible={setUnauthorizedModalVisible}
      />

      <ModalDialog
        type="success"
        visible={unauthorizedModalVisible}
        setVisible={setUnauthorizedModalVisible}
        title={t("unauthorizedModalTitle")}
        description={t("unauthorizedModalText")}
        primaryButton={{
          text: t("unauthorizedModalButtonText"),
          onPress: () => {
            setUnauthorizedModalVisible(false);
            navigateTo("ValidateAccountScreen", {
              from: "content.forYouScreen.clubTicketsSection",
            });
          },
        }}
      />
    </View>
  );
}
