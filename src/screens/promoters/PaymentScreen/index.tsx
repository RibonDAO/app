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
import { theme } from "@ribon.io/shared/styles";
import { useKeyboardVisibility } from "hooks/useKeyboardVisibility";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import PaymentScreenPlaceholder from "screens/promoters/PaymentScreen/placeholder";
import { logEvent } from "services/analytics";
import GooglePayIcon from "assets/images/payments/google-pay-icon.png";
import CardIcon from "assets/images/payments/card-icon.png";
import GooglePaySection from "screens/promoters/PaymentScreen/GooglePaySection";
import RadioButton from "components/moleculars/RadioButton";
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
  const { buttonDisabled, handleSubmit, setCause, setNonProfit, resetStates } =
    useCardPaymentInformation();

  const colorTheme = getThemeByFlow(flow);
  const { isKeyboardVisible } = useKeyboardVisibility();
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "googlePay" | "applePay"
  >("card");

  useEffect(() => {
    if (flow === "cause") {
      logEvent("P5_view", {
        causeId: cause?.id,
        price: offer.priceValue,
        currency: offer.currency,
      });
    }
    if (flow === "nonProfit") {
      logEvent("P6_view", {
        nonprofitId: nonProfit?.id,
        price: offer.priceValue,
        currency: offer.currency,
      });
    }
  }, []);

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
    if (paymentMethod === "googlePay") return null;
    if (isUserSection()) return <UserInfoSection />;

    return <CardInfoSection />;
  };

  const handleContinueClick = () => {
    if (isUserSection()) {
      logEvent("continuePaymentFormBtn_click", {
        flow,
        causeId: cause?.id,
        nonprofitId: nonProfit?.id,
        price: offer.priceValue,
        currency: offer.currency,
      });
      setCurrentSection("card");
    } else if (isCardSection()) {
      logEvent("sendPaymentFormBtn_click", {
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
            image={nonProfit?.mainImage || cause?.mainImage}
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
            <RadioButton
              options={[
                { name: "Card", value: "card", id: 1, icon: CardIcon },
                {
                  name: "Google Pay",
                  value: "googlePay",
                  id: 2,
                  icon: GooglePayIcon,
                },
              ]}
              onOptionChanged={(option) => {
                setPaymentMethod(option.value as any);
              }}
            />
            {renderCurrentSection()}
          </View>
        </View>
      </ScrollView>
      {!isKeyboardVisible && paymentMethod === "card" && (
        <View style={styles.donateButtonContainer}>
          <Button
            text={t("button")}
            onPress={handleContinueClick}
            disabled={buttonDisabled}
            customStyles={styles.donateButton}
            backgroundColor={theme.colors.brand.secondary[300]}
            borderColor={theme.colors.brand.secondary[300]}
          />
        </View>
      )}
      {paymentMethod === "googlePay" && (
        <GooglePaySection offer={offer} cause={cause} nonProfit={nonProfit} />
      )}
    </KeyboardAvoidingView>
  );
}
export default withPlaceholder(PaymentScreen, PaymentScreenPlaceholder);
