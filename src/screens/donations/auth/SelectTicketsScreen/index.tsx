import { useTranslation } from "react-i18next";
import { Keyboard, Platform, View } from "react-native";
import { useRouteParams } from "hooks/useRouteParams";
import Header from "components/moleculars/Header";
import { theme } from "@ribon.io/shared/styles";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import Button from "components/atomics/buttons/Button";
import { useNavigation } from "hooks/useNavigation";
import { useCallback, useState } from "react";
import { useDonations } from "@ribon.io/shared";
import { showToast } from "lib/Toast";
import { logEvent } from "services/analytics";
import { PLATFORM } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import { useUtmContext } from "contexts/utmContext";
import { useIntegrationContext } from "contexts/integrationContext";
import SliderButton from "components/moleculars/SliderButton";
import * as S from "./styles";
import DonationInProgressSection from "../DonationInProgressSection";

export default function SelectTicketsScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.selectTicketsScreen",
  });

  const { navigateTo } = useNavigation();
  const { params } = useRouteParams<"SelectTicketsScreen">();
  const { formattedImpactText } = useFormattedImpactText();
  const [donationSucceeded, setDonationSucceeded] = useState(true);
  const [ticketsQuantity, setTicketsQuantity] = useState(1);
  const { currentUser } = useCurrentUser();
  const { donate } = useDonations(currentUser?.id);
  const { currentIntegrationId, externalId } = useIntegrationContext();
  const [tickets, setTickets] = useState(1);
  const { utmSource, utmMedium, utmCampaign } = useUtmContext();

  const { nonProfit } = params;

  const [isDonating, setIsDonating] = useState(false);

  const onDonationSuccess = () => {
    setDonationSucceeded(true);
    logEvent("ticketDonated_end", { nonProfitId: nonProfit.id });
  };

  const onDonationFail = (error: any) => {
    setDonationSucceeded(false);
    showToast({
      type: "error",
      message: error?.response?.data?.formatted_message || t("donationError"),
    });

    navigateTo("CausesScreen", { newState: { failedDonation: true } });
  };

  const handleButtonPress = async () => {
    if (!currentUser?.email) return;

    setIsDonating(true);

    try {
      await donate(
        currentIntegrationId,
        nonProfit.id,
        currentUser.email,
        PLATFORM,
        externalId,
        utmSource,
        utmMedium,
        utmCampaign,
      );
      onDonationSuccess();
    } catch (error: any) {
      onDonationFail(error);
    }
  };

  const onAnimationEnd = useCallback(() => {
    if (donationSucceeded) {
      setTickets(tickets - ticketsQuantity);
      navigateTo("DonationDoneScreen", { nonProfit });
    } else {
      const newState = {
        failedDonation: true,
        message: t("donationError"),
      };
      navigateTo("CausesScreen", { newState });
    }
  }, [donationSucceeded]);

  return (
    <S.KeyboardView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -20}
    >
      {isDonating ? (
        <DonationInProgressSection
          nonProfit={nonProfit}
          onAnimationEnd={onAnimationEnd}
        />
      ) : (
        <View>
          <Header
            hasBackButton
            backButtonColor={theme.colors.brand.primary[600]}
          />
          <S.Container accessibilityRole="button" onPress={Keyboard.dismiss}>
            <S.MainContainer>
              <S.ImageContainer>
                <S.Image
                  source={{ uri: nonProfit.mainImage }}
                  accessibilityIgnoresInvertColors
                />
              </S.ImageContainer>
              <S.ContentContainer>
                <S.Title>{t("title")}</S.Title>
                <S.Subtitle>
                  {formattedImpactText(nonProfit, undefined, false, true)}
                </S.Subtitle>
                <SliderButton rangeSize={3} setValue={setTicketsQuantity} />
                <Button
                  text={t("buttonText")}
                  textColor={theme.colors.neutral10}
                  backgroundColor={theme.colors.brand.primary[600]}
                  borderColor={theme.colors.neutral[300]}
                  onPress={handleButtonPress}
                  customStyles={{
                    height: 48,
                  }}
                />
              </S.ContentContainer>
            </S.MainContainer>
          </S.Container>
        </View>
      )}
    </S.KeyboardView>
  );
}
