import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
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
import LeftSun from "./assets/left-sun.png";
import PinkCircle from "./assets/pink-circle.png";

function ClubScreen(): JSX.Element {
  usePageView("P32_view");

  const [tabIndex, setTabIndex] = useState(0);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.clubScreen",
  });

  const { navigateTo } = useNavigation();
  const tabs = [
    {
      title: t("benefitsSection.title"),
      component: <BenefitsSection />,
      handleBack: () => navigateTo("CausesScreen"),
      handleNext: () => setTabIndex(tabIndex + 1),
      buttonText: t("benefitsSection.buttonText"),
    },
    {
      title: "Forma de pagamento",
      component: (
        <View>
          <Text>texto</Text>
        </View>
      ),
      handleBack: () => setTabIndex(tabIndex - 1),
      handleNext: () => setTabIndex(tabIndex - 1),
      buttonText: t("benefitsSection.buttonText"),
    },
  ];

  const currentTab = tabs[tabIndex];

  return (
    <View style={S.innerContainer}>
      <ScrollView style={S.container} showsVerticalScrollIndicator={false}>
        <View style={S.arrow}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={currentTab.handleBack}
            testID="arrow-back-button"
          >
            <ArrowLeft color={theme.colors.brand.tertiary[800]} />
          </TouchableOpacity>
        </View>
        <View style={S.innerContainer}>
          <Header />
          <Text style={S.title}>{currentTab.title}</Text>
          <Image
            source={PinkCircle}
            resizeMode="stretch"
            style={S.circle}
            accessibilityIgnoresInvertColors
          />
          {currentTab.component}

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
            <View style={S.supportBanner}>
              <UserSupportBanner
                from="clubDescription_page"
                title={t("userSupportBannerTitle") ?? ""}
                description={t("userSupportBannerDescription") ?? ""}
                backgroundColor={theme.colors.brand.tertiary[25]}
                cardBackground={LeftSun}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={S.donateButtonContainer}>
        <Button
          text={currentTab.buttonText}
          onPress={currentTab.handleNext}
          backgroundColor={theme.colors.brand.tertiary[600]}
          borderColor={theme.colors.brand.tertiary[600]}
          textColor={theme.colors.neutral10}
        />
      </View>
    </View>
  );
}

export default ClubScreen;
