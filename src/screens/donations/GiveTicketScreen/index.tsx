import { useNavigation } from "hooks/useNavigation";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "components/atomics/buttons/Button";
import { View, Text } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { useRouteParams } from "hooks/useRouteParams";

import { logEvent } from "services/analytics";
import { useTicketsContext } from "contexts/ticketsContext";
import Ticket from "./assets/Ticket";
import S from "./styles";

export default function GiveTicketScreen() {
  const { params } = useRouteParams<"GiveTicketScreen">();
  const isOnboarding = params?.isOnboarding || false;
  const { t } = useTranslation("translation", {
    keyPrefix: "content.giveTicketScreen",
  });

  const { navigateTo } = useNavigation();
  const { ticketsCounter } = useTicketsContext();

  useEffect(() => {
    const eventName = isOnboarding ? "P10_view" : "P11_view";
    logEvent(eventName);
  }, []);

  const receiveTicket = () => {
    logEvent("P10_getTicketBtn_click");
    navigateTo("ReceiveTicketScreen");
  };

  const navigateToTicketsPage = () => {
    navigateTo("TabNavigator", { screen: "CausesScreen" });
  };

  const handleHasAccount = () => {
    logEvent("openAuthBtn_click", { from: "onboarding_page" });
    navigateTo("SignInScreen");
  };

  const title = isOnboarding ? t("onboardingTitle") : t("title");

  return (
    <View style={S.container}>
      <View style={S.content}>
        <Ticket />
        <View style={S.textContainer}>
          <Text style={S.title}>
            {ticketsCounter > 1 ? t("titlePlural", { ticketsCounter }) : title}
          </Text>
          <Text style={S.subtitle}>
            {isOnboarding ? t("onboardingSubtitle") : t("subtitle")}
          </Text>
        </View>

        <Button
          text={isOnboarding ? t("onboardingButton") : t("button")}
          onPress={isOnboarding ? receiveTicket : navigateToTicketsPage}
          borderColor={theme.colors.brand.primary[600]}
          backgroundColor={theme.colors.brand.primary[600]}
          customTextStyles={{
            fontWeight: "600",
          }}
          textColor={theme.colors.neutral10}
          customStyles={{
            borderWidth: 1,
            borderRadius: 4,
            marginBottom: 16,
            height: 48,
            width: 328,
          }}
        />

        {isOnboarding && (
          <Button
            text={t("hasAccountButton")}
            textColor={theme.colors.neutral[600]}
            backgroundColor="transparent"
            borderColor={theme.colors.neutral[300]}
            onPress={handleHasAccount}
            customStyles={{
              borderWidth: 1,
              borderRadius: 4,
              marginBottom: 16,
              height: 48,
              width: 328,
            }}
          />
        )}
      </View>
    </View>
  );
}
