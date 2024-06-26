import { useTranslation } from "react-i18next";
import { Currencies } from "@ribon.io/shared/types";
import { useCardGivingFees } from "@ribon.io/shared/hooks";
import { useEffect, useState } from "react";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import getThemeByFlow from "lib/themeByFlow";
import { useRouteParams } from "hooks/useRouteParams";
import MaskedWaveCut from "components/moleculars/MaskedWaveCut";
import { Platform, Text, View } from "react-native";
import Button from "components/atomics/buttons/Button";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { useKeyboardVisibility } from "hooks/useKeyboardVisibility";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import PaymentScreenPlaceholder from "screens/promoters/PaymentScreen/placeholder";
import { logEvent } from "services/analytics";

import { useCheckoutContext } from "contexts/checkoutContext";
import styles from "./styles";
import UserInfoSection from "./UserInfoSection";
import CardInfoSection from "./CardInfoSection";

function PaymentScreen(): JSX.Element {
  const { params } = useRouteParams<"PaymentScreen">();
  const { offer, cause, nonProfit, flow } = params;
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen.paymentScreen",
  });
  const [currentSection, setCurrentSection] = useState<"user" | "card">("user");
  const { cardGivingFees } = useCardGivingFees(
    offer.priceValue,
    offer.currency.toUpperCase() as Currencies,
  );
  const { buttonDisabled, setCause, setNonProfit, resetStates } =
    useCheckoutContext();

  const { handleSubmit } = useCardPaymentInformation();

  const colorTheme = getThemeByFlow(flow);
  const { isKeyboardVisible } = useKeyboardVisibility();

  useEffect(() => {
    setCause(cause);
  }, [cause]);

  useEffect(() => {
    setNonProfit(nonProfit);
  }, [nonProfit]);

  useEffect(() => {
    resetStates();
  }, []);
  const isUserSection = () => currentSection === "user";
  const isCardSection = () => currentSection === "card";

  const renderCurrentSection = () => {
    if (isUserSection()) return <UserInfoSection />;

    return <CardInfoSection />;
  };

  const handleContinueClick = () => {
    if (isUserSection()) {
      setCurrentSection("card");
    } else if (isCardSection()) {
      logEvent("confirmPaymentFormBtn_click", {
        flow,
        causeId: cause?.id,
        nonprofitId: nonProfit?.id,
        price: offer.priceValue,
        currency: offer.currency,
      });
      handleSubmit();
    }
  };
  const highlightText = () => nonProfit?.name || cause?.name;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <MaskedWaveCut
            image={nonProfit?.backgroundImage || cause?.coverImage}
            imageStyles={styles.image}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              {t("title")}{" "}
              <Text
                style={[styles.titleHighlight, { color: colorTheme.shade30 }]}
              >
                {highlightText()}
              </Text>
            </Text>
            <Text
              style={[styles.donationValueText, { color: colorTheme.shade20 }]}
            >
              {offer.price}
            </Text>
            {cardGivingFees && (
              <Text style={styles.feeText}>
                {t("netDonationText")} {cardGivingFees.netGiving}
              </Text>
            )}
            {cardGivingFees && (
              <Text style={styles.feeText}>
                {t("serviceFeesText")} {cardGivingFees.serviceFees}
              </Text>
            )}
            {renderCurrentSection()}
          </View>
        </View>
      </ScrollView>
      {!isKeyboardVisible && (
        <View style={styles.donateButtonContainer}>
          <Button
            text={t("button")}
            onPress={handleContinueClick}
            disabled={buttonDisabled}
            customStyles={styles.donateButton}
            backgroundColor={colorTheme.shade20}
            borderColor={colorTheme.shade20}
            textColor={colorTheme.shade40}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
export default withPlaceholder(PaymentScreen, PaymentScreenPlaceholder);
