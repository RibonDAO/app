import React, { useCallback, useState } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { View } from "react-native";
import { useRouteParams } from "hooks/useRouteParams";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import DonationInProgressSection from "screens/donations/DonateScreen/DonationInProgressSection";
import SignedInSection from "screens/donations/DonateScreen/SignedInSection";
import { logEvent } from "services/analytics";
import { setLocalStorageItem } from "lib/localStorage";
import { ALREADY_RECEIVED_TICKET_KEY } from "screens/donations/CausesScreen/TicketSection";
import { useNavigation } from "hooks/useNavigation";
import { showToast } from "lib/Toast";
import { useTickets } from "contexts/ticketsContext";
import { useTranslation } from "react-i18next";
import SignInSection from "../auth/SignInScreen";
import Placeholder from "./placeholder";

function DonateScreen() {
  const [isDonating, setIsDonating] = useState(false);
  const [donationSucceeded, setDonationSucceeded] = useState(true);
  const {
    params: { nonProfit },
  } = useRouteParams<"DonateScreen">();
  const { signedIn } = useCurrentUser();
  const { navigateTo, popNavigation } = useNavigation();
  const { setTickets } = useTickets();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  const onContinue = () => {
    setIsDonating(true);
    logEvent("P12_continueBtn_click", { nonProfitId: nonProfit.id });
  };

  const onDonationSuccess = () => {
    setDonationSucceeded(true);
    setLocalStorageItem(ALREADY_RECEIVED_TICKET_KEY, "false");
    logEvent("ticketDonated_end", { nonProfitId: nonProfit.id });
  };

  const onDonationFail = (error: any) => {
    setDonationSucceeded(false);
    showToast({
      type: "error",
      message: error?.response?.data?.formatted_message,
    });
    popNavigation();
  };

  const onAnimationEnd = useCallback(() => {
    if (donationSucceeded) {
      setTickets(0);
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
    <View>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isDonating ? (
        <DonationInProgressSection
          nonProfit={nonProfit}
          onAnimationEnd={onAnimationEnd}
        />
      ) : signedIn ? (
        <SignedInSection
          nonProfit={nonProfit}
          onContinue={onContinue}
          onDonationFail={onDonationFail}
          onDonationSuccess={onDonationSuccess}
        />
      ) : (
        <SignInSection
          nonProfit={nonProfit}
          onContinue={onContinue}
          onDonationFail={onDonationFail}
          onDonationSuccess={onDonationSuccess}
        />
      )}
    </View>
  );
}
export default withPlaceholder(DonateScreen, Placeholder);
