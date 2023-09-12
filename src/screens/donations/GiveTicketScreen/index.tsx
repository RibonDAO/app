/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
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
import { useIntegrationContext } from "contexts/integrationContext";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import Image from "components/atomics/Image";
import Ticket from "./assets/Ticket";
import S from "./styles";
import RibonLogo from "./assets/RibonLogo";
import LeftShape from "./assets/LeftShape";
import RightShape from "./assets/RightShape";

export default function GiveTicketScreen() {
  const { params } = useRouteParams<"GiveTicketScreen">();
  const isOnboarding = params?.isOnboarding || false;
  const { t } = useTranslation("translation", {
    keyPrefix: "content.giveTicketScreen",
  });

  const { navigateTo } = useNavigation();

  const { currentIntegrationId, integration } = useIntegrationContext();

  const isRibonIntegration = currentIntegrationId === RIBON_INTEGRATION_ID;

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

  const titleOnboarding = isRibonIntegration
    ? t("onboardingRibonTitle")
    : t("onboardingIntegrationTitle", {
        integrationName: integration?.name,
      });

  const handleSubtitle = isRibonIntegration
    ? t("subtitle")
    : t("integrationSubtitle", {
        integrationName: integration?.name,
      });

  const subtitle = isOnboarding ? t("onboardingSubtitle") : handleSubtitle;

  const buttonText = isOnboarding ? t("onboardingButtonText") : t("button");

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
        {!isRibonIntegration && integration?.logo ? (
          <View style={S.imageContainer}>
            <View style={S.leftImage}>
              <LeftShape />
            </View>
            <View style={S.integrationContainer}>
              <RibonLogo />
              <Text style={S.logoText}>+</Text>
              <Image
                source={{ uri: integration?.logo }}
                style={S.integrationLogo}
              />
            </View>
            <View style={S.rightImage}>
              <RightShape />
            </View>
          </View>
        ) : (
          <Ticket />
        )}

        <View style={S.textContainer}>
          <Text style={S.title}>
            {isOnboarding ? titleOnboarding : t("title")}
          </Text>
          <Text style={S.subtitle}>{subtitle}</Text>
        </View>

        <Button
          text={buttonText}
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
