import { useTranslation } from "react-i18next";
import { Keyboard, Platform, View } from "react-native";
import { useRouteParams } from "hooks/useRouteParams";
import Header from "components/moleculars/Header";
import { theme } from "@ribon.io/shared/styles";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import Button from "components/atomics/buttons/Button";
import { useNavigation } from "hooks/useNavigation";
import { useCallback, useEffect, useState } from "react";
import { logEvent } from "services/analytics";
import { useCurrentUser } from "contexts/currentUserContext";
import SliderButton from "components/moleculars/SliderButton";
import TicketSection from "components/moleculars/LayoutHeader/TicketSection";
import TicketIconText from "components/moleculars/TicketIconText";
import { useTicketsContext } from "contexts/ticketsContext";
import { useFocusEffect } from "@react-navigation/native";
import useDonationFlow from "hooks/useDonationFlow";
import DonationInProgressSection from "../auth/DonationInProgressSection";
import * as S from "./styles";

export default function SelectTicketsScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.selectTicketsScreen",
  });

  const { navigateTo } = useNavigation();
  const { params } = useRouteParams<"SelectTicketsScreen">();
  const { formattedImpactText } = useFormattedImpactText();
  const { signedIn } = useCurrentUser();
  const { handleDonate } = useDonationFlow();
  const { ticketsCounter: tickets, refetchTickets } = useTicketsContext();
  const { nonProfit } = params;

  const [isDonating, setIsDonating] = useState(false);
  const [donationSucceeded, setDonationSucceeded] = useState(true);
  const [shouldRepeatAnimation, setShouldRepeatAnimation] = useState(true);
  const [ticketsQuantity, setTicketsQuantity] = useState(1);
  const [currentImpact, setCurrentImpact] = useState(
    nonProfit?.impactByTicket || undefined,
  );

  const errorType = (type: number) => {
    switch (type) {
      case 403: {
        return "blockedDonation";
      }
      case 401: {
        return "unauthorizedDonation";
      }
      default: {
        return "failedDonation";
      }
    }
  };

  const onDonationSuccess = () => {
    setDonationSucceeded(true);
    setShouldRepeatAnimation(false);
    logEvent("ticketDonated_end", {
      nonProfitId: nonProfit.id,
      quantity: ticketsQuantity,
    });
  };

  useFocusEffect(
    useCallback(() => {
      refetchTickets();
    }, []),
  );

  const onDonationFail = (error: any) => {
    setDonationSucceeded(false);
    setShouldRepeatAnimation(false);
    const failedKey = errorType(error.response?.status);
    const newState = {
      [failedKey]: true,
      message: error.response?.data?.formatted_message || error.message,
    };

    navigateTo("CausesScreen", { newState });
  };

  const handleButtonPress = async () => {
    if (!signedIn) return;

    setIsDonating(true);

    await handleDonate({
      nonProfit,
      ticketsQuantity,
      onSuccess: () => onDonationSuccess(),
      onError: (error) => {
        onDonationFail(error);
      },
    });
  };

  const onAnimationEnd = useCallback(() => {
    if (donationSucceeded) {
      navigateTo("DonationDoneScreen", { nonProfit, impact: currentImpact });
    } else {
      const newState = {
        failedDonation: true,
        message: t("donationError"),
      };
      navigateTo("CausesScreen", { newState });
    }
  }, [donationSucceeded, currentImpact]);

  useEffect(() => {
    setCurrentImpact(
      nonProfit?.impactByTicket
        ? nonProfit.impactByTicket * ticketsQuantity
        : undefined,
    );
  }, [nonProfit, ticketsQuantity]);

  return (
    <S.KeyboardView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -20}
    >
      {isDonating ? (
        <DonationInProgressSection
          nonProfit={nonProfit}
          onAnimationEnd={onAnimationEnd}
          shouldRepeatAnimation={shouldRepeatAnimation}
        />
      ) : (
        <View>
          <Header
            hasBackButton
            backButtonColor={theme.colors.brand.primary[600]}
            rightComponent={<TicketSection hasDividerBorder={false} />}
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
                  {formattedImpactText(nonProfit, currentImpact, false, true)}
                </S.Subtitle>
                <TicketIconText
                  quantity={ticketsQuantity}
                  hasDividerBorder={false}
                  buttonDisabled
                />
                <SliderButton
                  rangeSize={tickets}
                  setValue={setTicketsQuantity}
                />
                <Button
                  text={t("buttonText")}
                  textColor={theme.colors.neutral10}
                  backgroundColor={theme.colors.brand.primary[600]}
                  borderColor={theme.colors.neutral[300]}
                  onPress={handleButtonPress}
                  customStyles={{
                    height: 48,
                    marginTop: 32,
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
