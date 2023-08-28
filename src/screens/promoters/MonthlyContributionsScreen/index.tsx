import { useTranslation } from "react-i18next";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import { View, Text } from "react-native";
import { useCurrentUser } from "contexts/currentUserContext";
import Subscription from "@ribon.io/shared/types/entities/Subscription";
import React from "react";
import Icon from "components/atomics/Icon";
import S from "./styles";

export default function MonthlyContributionsScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.monthlyContributionsScreen",
  });

  const { currentUser } = useCurrentUser();

  const { userSubscriptions } = useSubscriptions();
  const { subscriptions } = userSubscriptions(currentUser?.id);

  return (
    <View style={S.container}>
      <Text style={S.title}>{t("title")}</Text>
      <View style={S.subscriptionsContainer}>
        {subscriptions?.map((subscription: Subscription) => (
          <View style={S.card}>
            <View style={S.iconTextContainer}>
              <Text style={S.amount}>{subscription.offer.price}</Text>
              <Icon type="outlined" name="cancel" size={24} />
            </View>
            <Text style={S.text}>
              {t("to")}
              <Text style={S.highlightedText}>
                {subscription.receiver.name}
              </Text>
            </Text>
            <Text style={S.text}>
              {t("nextContribution")}
              <Text style={S.highlightedText}>
                {new Date(subscription.createdAt).toLocaleDateString()}
              </Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
