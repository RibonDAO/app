import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import Button from "components/atomics/buttons/Button";
import UserSupportBanner from "components/moleculars/UserSupportBanner";
import { useCallback, useState } from "react";
import { Offer, theme, useSubscriptions } from "@ribon.io/shared";
import ArrowLeft from "components/vectors/ArrowLeft";
import { useTranslation } from "react-i18next";
import { useNavigation } from "hooks/useNavigation";
import { logEvent } from "services/analytics";
import { useFocusEffect } from "@react-navigation/native";
import { useAuthentication } from "contexts/authenticationContext";
import ModalDialog from "components/moleculars/modals/ModalDialog";
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
import LeftSun from "./assets/left-sun.png";

function ClubScreen(): JSX.Element {
  const [tabIndex, setTabIndex] = useState(0);
  const { userIsMember } = useSubscriptions();
  const { isMember, refetch } = userIsMember();
  const { isAuthenticated } = useAuthentication();
  const [unauthorizedModalVisible, setUnauthorizedModalVisible] =
    useState(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.clubScreen",
  });

  const { navigateTo, popNavigation } = useNavigation();
  const [offer, setOffer] = useState<Offer>();

  const tabs = [
    {
      title: t("benefitsSection.title"),
      component: <BenefitsSection />,
      handleBack: () => popNavigation(),
      handleNext: () => {
        logEvent("checkClubPlansBtn_click", { from: "clubDescription_page" });
        setTabIndex(tabIndex + 1);
      },
      buttonText: t("benefitsSection.buttonText"),
    },
    {
      title: t("purchaseSection.title"),
      component: <PurchaseSection setCurrentOffer={setOffer} />,
      handleBack: () => setTabIndex(tabIndex - 1),
      handleNext: () => {
        logEvent("giveClubBtn_start", {
          from: "clubPlans_page",
        });
        if (isAuthenticated()) {
          navigateTo("ClubCheckoutScreen", {
            target: "club",
            offer: offer?.priceCents,
            currency: offer?.currency,
            subscription: true,
          });
        } else {
          setUnauthorizedModalVisible(true);
        }
      },
      buttonText: t("purchaseSection.buttonText"),
    },
  ];

  const currentTab = tabs[tabIndex];

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  return !isMember ? (
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
                from={
                  tabIndex === 0 ? "clubDescription_page" : "clubPlans_page"
                }
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
      <ModalDialog
        type="success"
        visible={unauthorizedModalVisible}
        setVisible={setUnauthorizedModalVisible}
        title={t("unauthorizedModalTitle")}
        description={t("unauthorizedModalText")}
        primaryButton={{
          text: t("unauthorizedModalButtonText"),
          onPress: () => {
            setUnauthorizedModalVisible(false);
            navigateTo("ValidateAccountScreen", {
              from: "promoters.clubScreen",
            });
          },
        }}
      />
    </View>
  ) : (
    <View />
  );
}

export default ClubScreen;
