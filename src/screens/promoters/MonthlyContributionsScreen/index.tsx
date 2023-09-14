import { useTranslation } from "react-i18next";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import { View, Text, TouchableOpacity } from "react-native";
import Subscription from "@ribon.io/shared/types/entities/Subscription";
import React, { useState } from "react";
import Icon from "components/atomics/Icon";

import { theme } from "@ribon.io/shared";
import { useLanguage } from "contexts/languageContext";
import {
  add30DaysAndFormatDate,
  stringToLocaleDateString,
} from "lib/formatters/dateFormatter";
import ArrowLeft from "components/vectors/ArrowLeft";
import { useNavigation } from "hooks/useNavigation";
import { useRouteParams } from "hooks/useRouteParams";
import S from "./styles";
import CancelContributionModal from "./CancelContributionModal";

export default function MonthlyContributionsScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.monthlyContributionsScreen",
  });

  const { userSubscriptions } = useSubscriptions();
  const { subscriptions } = userSubscriptions();
  const [modalVisible, setModalVisible] = useState(false);
  const { params } = useRouteParams<"MonthlyContributionsScreen">();

  const { navigateTo, popNavigation } = useNavigation();

  const { currentLang } = useLanguage();

  const nextPaymetAttempt = (subscription: any) =>
    subscription.nextPaymentAttempt
      ? stringToLocaleDateString(subscription.nextPaymentAttempt)
      : add30DaysAndFormatDate(subscription.createdAt, currentLang);

  const handleCancelContribution = () => {
    setModalVisible(!modalVisible);
  };
  const handleBackButtonClick = () => {
    if (params?.from === "ContributionDoneScreen") {
      navigateTo("PromotersScreen");
    } else {
      popNavigation();
    }
  };

  return (
    <View style={S.container}>
      <View style={S.arrow}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={handleBackButtonClick}
          testID="arrow-back-button"
        >
          <ArrowLeft />
        </TouchableOpacity>
      </View>
      <Text style={S.title}>{t("title")}</Text>
      <View style={S.subscriptionsContainer}>
        {subscriptions?.map((subscription: Subscription) => (
          <View style={S.card} key={subscription.id}>
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
              <Text style={S.highlightedText}>
                {nextPaymetAttempt(subscription)}
              </Text>
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
