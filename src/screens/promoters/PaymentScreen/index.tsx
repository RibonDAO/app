import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { Currencies } from "@ribon.io/shared/types";
import { useCardGivingFees } from "@ribon.io/shared/hooks";
import { useEffect, useState } from "react";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import getThemeByFlow from "lib/themeByFlow";
import { useRouteParams } from "hooks/useRouteParams";
import MaskedWaveCut from "components/moleculars/MaskedWaveCut";
import { Text, View } from "components/Themed";
import Button from "components/atomics/buttons/Button";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { useKeyboardVisibility } from "hooks/useKeyboardVisibility";
import styles from "./styles";
import UserInfoSection from "./UserInfoSection";
import CardInfoSection from "./CardInfoSection";
import useNavigationReady from "hooks/useNavigationReady";

function PaymentScreen(): JSX.Element {
  const navigationReady = useNavigationReady();
  const { params } = useRouteParams<"PaymentScreen">();
  const { popNavigation } = useNavigation();
  const { offer, cause, nonProfit, flow } = params;
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen.paymentScreen",
  });
  const [currentSection, setCurrentSection] = useState<"user" | "card">("user");
  const { cardGivingFees } = useCardGivingFees(
    offer.priceValue,
    offer.currency.toUpperCase() as Currencies,
  );
  const { buttonDisabled, handleSubmit, setCause, setNonProfit } =
    useCardPaymentInformation();

  const colorTheme = getThemeByFlow(flow);
  const { isKeyboardVisible } = useKeyboardVisibility();

  useEffect(() => {
    setCause(cause);
  }, [cause]);

  useEffect(() => {
    setNonProfit(nonProfit);
  }, [nonProfit]);

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
      handleSubmit();
    }
  };

  const handleBackButtonClick = () => {
    if (isCardSection()) {
      setCurrentSection("user");
    } else {
      popNavigation();
    }
  };

  const highlightText = () => nonProfit?.name || cause?.name;

  if(!navigationReady) return <View />;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <MaskedWaveCut
          image={nonProfit?.mainImage || cause?.mainImage}
          imageStyles={styles.image}
        />
        <KeyboardAvoidingView style={styles.contentContainer}>
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
        </KeyboardAvoidingView>
      </ScrollView>
      {!isKeyboardVisible && (
        <View style={styles.donateButtonContainer}>
          <Button
            text={t("button")}
            onPress={handleContinueClick}
            disabled={buttonDisabled}
            customStyles={styles.donateButton}
            backgroundColor={theme.colors.orange20}
            borderColor={theme.colors.orange20}
          />
        </View>
      )}
    </View>
  );
}

export default PaymentScreen;
