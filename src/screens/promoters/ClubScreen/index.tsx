import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import usePageView from "hooks/usePageView";

import Button from "components/atomics/buttons/Button";
import UserSupportBanner from "components/moleculars/UserSupportBanner";
import { useState } from "react";
import { theme } from "@ribon.io/shared";
import ArrowLeft from "components/vectors/ArrowLeft";
import { useTranslation } from "react-i18next";
import { useNavigation } from "hooks/useNavigation";
import AppleIcon from "./assets/AppleIcon";
import GoogleIcon from "./assets/GoogleIcon";
import S from "./styles";
import VisaIcon from "./assets/VisaIcon";
import MasterCardIcon from "./assets/MasterCardIcon";
import AmexIcon from "./assets/AmexIcon";
import PixIcon from "./assets/PixIcon";
import BenefitsSection from "./components/BenefitsSection";
import Header from "./Header";
import PurchaseSection from "./components/PurchaseSection";

function ClubScreen(): JSX.Element {
  usePageView("P23_view");

  const [currentTab, setCurrentTab] = useState(0);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.clubScreen",
  });

  const { navigateTo } = useNavigation();

  const tabs = [
    {
      title: t("benefitsSection.title"),
      component: <BenefitsSection />,
      handleBack: () => navigateTo("PromotersScreen"),
      handleNext: () => setCurrentTab(currentTab + 1),
      buttonText: t("benefitsSection.buttonText"),
    },
    {
      title: t("purchaseSection.title"),
      component: <PurchaseSection />,
      handleBack: () => setCurrentTab(currentTab - 1),
      handleNext: () => setCurrentTab(currentTab - 1),
      buttonText: t("benefitsSection.buttonText"),
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={S.keyboardView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -20}
    >
      <TouchableWithoutFeedback
        accessibilityRole="button"
        onPress={Keyboard.dismiss}
        style={S.outerContainer}
      >
        <ScrollView style={S.container}>
          <View style={S.arrow}>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={tabs[currentTab].handleBack}
              testID="arrow-back-button"
            >
              <ArrowLeft color={theme.colors.brand.tertiary[800]} />
            </TouchableOpacity>
          </View>
          <View style={S.innerContainer}>
            <Header />
            <Text style={S.title}>{tabs[currentTab].title}</Text>

            {tabs[currentTab].component}

            <View style={S.footer}>
              <Text style={S.subtitle}>{t("subtitle")}</Text>
              <View style={S.cardsContainer}>
                <VisaIcon />
                <MasterCardIcon />
                <AmexIcon />
                <PixIcon />
                <AppleIcon />
                <GoogleIcon />
              </View>
            </View>
            <UserSupportBanner
              from="ribon-club"
              title={t("userSupportBannerTitle") ?? ""}
              description={t("userSupportBannerDescription") ?? ""}
              backgroundColor={theme.colors.brand.tertiary[25]}
            />
          </View>
          <View style={S.donateButtonContainer}>
            <Button
              text={tabs[currentTab].buttonText}
              onPress={tabs[currentTab].handleNext}
              backgroundColor={theme.colors.brand.tertiary[600]}
              borderColor={theme.colors.brand.tertiary[600]}
              textColor={theme.colors.neutral10}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default ClubScreen;
