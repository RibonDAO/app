import { useTranslation } from "react-i18next";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import { View, Text } from "react-native";
import { useCurrentUser } from "contexts/currentUserContext";
import Subscription from "@ribon.io/shared/types/entities/Subscription";
import React, { useState } from "react";
import Icon from "components/atomics/Icon";

import { theme } from "@ribon.io/shared";
import S from "./styles";
import CancelContributionModal from "./CancelContributionModal";

export default function MonthlyContributionsScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.monthlyContributionsScreen",
  });

  const { currentUser } = useCurrentUser();

  const { userSubscriptions } = useSubscriptions();
  const { subscriptions } = userSubscriptions(currentUser?.id);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCancelContribution = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={S.container}>
      <Text style={S.title}>{t("title")}</Text>
      <View style={S.subscriptionsContainer}>
        {subscriptions?.map((subscription: Subscription) => (
          <View style={S.card}>
            <View style={S.iconTextContainer}>
              <Text style={S.amount}>{subscription.offer.price}</Text>
              <View style={S.iconContainer}>
                <Icon
                  type="outlined"
                  name="delete"
                  size={24}
                  color={theme.colors.neutral10}
                  onPress={handleCancelContribution}
                />
              </View>
            </View>
            <Text style={S.text}>
              {t("to")}
              <Text style={S.highlightedText}>
                {subscription.receiver.name}
              </Text>
            </Text>
            <Text style={S.text}>
              {t("nextContribution")}
              <Text style={S.highlightedText}>{subscription.createdAt}</Text>
            </Text>
            {modalVisible && (
              <CancelContributionModal
                setVisible={setModalVisible}
                visible={modalVisible}
                contributionId={subscription.id}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
