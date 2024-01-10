import { useCallback, useEffect, useState } from "react";
import { RootStackScreenProps } from "types";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import {
  useFirstAccessToIntegration,
  useStatistics,
  useUserConfig,
} from "@ribon.io/shared";
import DoneScreenTemplate from "screens/templates/DoneScreenTemplate";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useSound from "hooks/useSound";
import { View } from "react-native";
import { useCurrentUser } from "contexts/currentUserContext";
import { logEvent } from "services/analytics";
import { INTEGRATION_AUTH_ID } from "utils/constants/Application";
import { useAuthentication } from "contexts/authenticationContext";
import donationDoneSound from "./assets/donation-done.mp3";

export default function DonationDoneScreen({
  route,
}: RootStackScreenProps<"DonationDoneScreen">) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDoneScreen",
  });
  const { nonProfit, flow } = route.params;
  const { navigateTo } = useNavigation();
  const { formattedImpactText } = useFormattedImpactText();
  const { playSound } = useSound();
  const { updateUserConfig, userConfig } = useUserConfig();
  const { refetch: refetchUserConfig, config } = userConfig();
  const [allowedEmailMarketing, setAllowedEmailMarketing] = useState(false);
  const { currentUser } = useCurrentUser();
  const { isFirstAccessToIntegration: isFirstAccessToAuthIntegration } =
    useFirstAccessToIntegration(INTEGRATION_AUTH_ID);
  const { isAuthenticated } = useAuthentication();

  const {
    userStatistics,
    refetch: refetchStatistics,
    isLoading,
  } = useStatistics({
    userId: currentUser?.id,
  });

  const quantityOfDonationsToShowEmailCheckbox = 3;
  const firstDonation = 1;

  const shouldShowEmailCheckbox = useCallback(() => {
    if (userStatistics && config) {
      return (
        (Number(userStatistics.totalTickets) <=
          quantityOfDonationsToShowEmailCheckbox ||
          Number(userStatistics.totalTickets) %
            quantityOfDonationsToShowEmailCheckbox ===
            0 ||
          Number(userStatistics.totalTickets) === firstDonation) &&
        !config.allowedEmailMarketing
      );
    }
    return false;
  }, [userStatistics, config]);

  const handleNavigate = () => {
    if (allowedEmailMarketing && currentUser) {
      logEvent("acceptReceiveEmail_click", {
        from: "confirmedDonation_page",
      });
      updateUserConfig(currentUser.id, { allowedEmailMarketing });
    }
    if (flow === "magicLink" && isFirstAccessToAuthIntegration) {
      navigateTo("ExtraTicketScreen");
    } else if (!isAuthenticated() && isFirstAccessToAuthIntegration) {
      navigateTo("SignInExtraTicketScreen");
    } else if (!isLoading && userStatistics) {
      navigateTo("PostDonationScreen", {
        nonProfit,
        cause: nonProfit.cause,
      });
    }
  };

  useEffect(() => {
    refetchStatistics();
    refetchUserConfig();
  }, [currentUser]);

  useEffect(() => {
    playSound(donationDoneSound);

    if (shouldShowEmailCheckbox()) {
      logEvent("acceptReceiveEmail_view", {
        from: "confirmedDonation_page",
      });
    }
  }, []);

  return (
    <View>
      {shouldShowEmailCheckbox() ? (
        <DoneScreenTemplate
          image={nonProfit.confirmationImage || nonProfit.mainImage}
          imageDescription={
            nonProfit.confirmationImageDescription ||
            nonProfit.mainImageDescription
          }
          title={t("title") || ""}
          description={t("description") || ""}
          highlightedDescription={formattedImpactText(
            nonProfit,
            undefined,
            false,
            false,
          )}
          buttonTitle={t("buttonTitle") || ""}
          onButtonPress={handleNavigate}
          checkboxText={t("checkboxText") || ""}
          checked={allowedEmailMarketing}
          onChecked={() => setAllowedEmailMarketing(!allowedEmailMarketing)}
        />
      ) : (
        <DoneScreenTemplate
          image={nonProfit.confirmationImage || nonProfit.mainImage}
          imageDescription={
            nonProfit.confirmationImageDescription ||
            nonProfit.mainImageDescription
          }
          title={t("title") || ""}
          description={t("description") || ""}
          highlightedDescription={formattedImpactText(
            nonProfit,
            undefined,
            false,
            false,
          )}
          buttonTitle={t("buttonTitle") || ""}
          onButtonPress={handleNavigate}
        />
      )}
    </View>
  );
}
