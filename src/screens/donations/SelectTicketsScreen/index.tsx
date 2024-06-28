import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { useRouteParams } from "hooks/useRouteParams";
import Header from "components/moleculars/Header";
import { theme } from "@ribon.io/shared/styles";
import useFormattedImpactText from "hooks/useFormattedImpactText";
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
import { useTasksContext } from "contexts/tasksContext";
import ImageWithIconOverlay from "components/moleculars/ImageWithIconOverlay";
import { useUserProfile } from "@ribon.io/shared/hooks";
import DonationInProgressSection from "../auth/DonationInProgressSection";
import LottieStepper from "./LottieStepper";
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
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();
  const [isDonating, setIsDonating] = useState(false);
  const [donationSucceeded, setDonationSucceeded] = useState(true);
  const [shouldRepeatAnimation, setShouldRepeatAnimation] = useState(true);
  const [ticketsQuantity, setTicketsQuantity] = useState(1);
  const [currentImpact, setCurrentImpact] = useState(
    nonProfit?.impactByTicket || undefined,
  );
  const [step, setStep] = useState<number | undefined>(undefined);

  const { registerAction } = useTasksContext();

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
      registerAction("P8_view");
    } else {
      const newState = {
        failedDonation: true,
        message: t("donationError"),
      };
      navigateTo("CausesScreen", { newState });
    }
  }, [donationSucceeded, currentImpact]);

  useEffect(() => {
    const impactForMinimumNumberOfTickets =
      ticketsQuantity /
      (nonProfit?.nonProfitImpacts?.[0]?.minimumNumberOfTickets || 1);

    setCurrentImpact(
      nonProfit?.impactByTicket
        ? nonProfit.impactByTicket * ticketsQuantity
        : impactForMinimumNumberOfTickets,
    );
  }, [nonProfit, ticketsQuantity]);

  useEffect(() => {
    const impacts = nonProfit?.nonProfitImpacts || [];
    const nonProfitsImpactsLength = impacts.length;
    const lastImpact = impacts[nonProfitsImpactsLength - 1];
    if (lastImpact?.minimumNumberOfTickets) {
      setStep(lastImpact.minimumNumberOfTickets);
      setTicketsQuantity(lastImpact.minimumNumberOfTickets);
    }
  }, [nonProfit]);

  useEffect(() => {
    logEvent("P40_view", {
      nonProfitId: nonProfit.id,
    });
  }, [nonProfit]);

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
        <S.Container>
          <Header
            hasBackButton
            backButtonColor={theme.colors.brand.primary[600]}
            rightComponent={<TicketSection hasDividerBorder={false} />}
          />
          <S.ImageContainer>
            <LottieStepper
              rangeSize={tickets}
              step={step || 1}
              value={ticketsQuantity}
            />
            <S.ImageOverlayContainer>
              <ImageWithIconOverlay
                leftImage={profile?.photo}
                rightImage={nonProfit?.icon}
              />
            </S.ImageOverlayContainer>
          </S.ImageContainer>
          <S.ContentContainer>
            <S.TextContainer>
              <S.Title>{t("title")}</S.Title>
              <S.Subtitle>
                {t("prefix")}
                {formattedImpactText(nonProfit, currentImpact, false, false)}
              </S.Subtitle>
            </S.TextContainer>
            <S.SliderContainer>
              <TicketIconText
                quantity={ticketsQuantity}
                hasDividerBorder={false}
                buttonDisabled
              />
              {step && (
                <SliderButton
                  rangeSize={tickets}
                  setValue={setTicketsQuantity}
                  step={step}
                />
              )}
            </S.SliderContainer>
            <S.Button onPress={handleButtonPress}>
              <S.Text>
                {t(ticketsQuantity > 1 ? "buttonTextPlural" : "buttonText", {
                  quantity: ticketsQuantity,
                })}
              </S.Text>
            </S.Button>
          </S.ContentContainer>
        </S.Container>
      )}
    </S.KeyboardView>
  );
}
