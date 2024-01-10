import { useNavigation } from "hooks/useNavigation";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "components/atomics/buttons/Button";
import { View, Text, TouchableOpacity } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { useRouteParams } from "hooks/useRouteParams";
import ArrowLeft from "components/vectors/ArrowLeft";
import Icon from "components/atomics/Icon";
import Tooltip from "components/atomics/Tooltip";
import { logEvent } from "services/analytics";
import Ticket from "./assets/Ticket";
import S from "./styles";

export default function GiveTicketScreen() {
  const { params } = useRouteParams<"GiveTicketScreen">();
  const isOnboarding = params?.isOnboarding || false;
  const { t } = useTranslation("translation", {
    keyPrefix: "content.giveTicketScreen",
  });

  const { navigateTo } = useNavigation();

  useEffect(() => {
    const eventName = isOnboarding ? "P10_view" : "P11_view";
    logEvent(eventName);
  }, []);

  const receiveTicket = () => {
    navigateTo("ReceiveTicketScreen");
  };

  const navigateToTicketsPage = () => {
    navigateTo("CausesScreen");
  };

  const handleBackButtonClick = () => {
    navigateTo("CausesScreen");
  };

  const handleHasAccount = () => {
    logEvent("openAuthBtn_click", { from: "onboarding_page" });
    navigateTo("SignInScreen");
  };

  return (
    <View style={S.container}>
      {!isOnboarding && (
        <View style={S.arrow}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={handleBackButtonClick}
            testID="arrow-back-button"
          >
            <ArrowLeft />
          </TouchableOpacity>
        </View>
      )}
      <View style={S.content}>
        <Ticket />
        <View style={S.textContainer}>
          <Text style={S.title}>
            {isOnboarding ? t("onboardingTitle") : t("title")}
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

        {!isOnboarding && (
          <Tooltip tooltipText={t("ticketExplanation")}>
            <View style={S.ticketExplanationSection}>
              <Icon
                type="rounded"
                name="help"
                size={20}
                color={theme.colors.gray30}
              />
              <View style={{ overflow: "hidden" }}>
                <View style={S.ticketTextContainer}>
                  <Text style={S.ticketText}>{t("whatIsATicket")}</Text>
                </View>
              </View>
            </View>
          </Tooltip>
        )}
      </View>
    </View>
  );
}
