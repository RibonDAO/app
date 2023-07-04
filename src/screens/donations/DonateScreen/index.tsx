import React, { useCallback, useState } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { View } from "react-native";
import { useRouteParams } from "hooks/useRouteParams";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import DonationInProgressSection from "screens/donations/DonateScreen/DonationInProgressSection";
import EmailInputSection from "screens/donations/DonateScreen/EmailInputSection";
import SignedInSection from "screens/donations/DonateScreen/SignedInSection";
import { logEvent } from "services/analytics";
import { setLocalStorageItem } from "lib/localStorage";
import { ALREADY_RECEIVED_TICKET_KEY } from "screens/donations/CausesScreen/TicketSection";
import { useNavigation } from "hooks/useNavigation";
import { showToast } from "lib/Toast";
import Placeholder from "./placeholder";

function DonateScreen() {
  const [isDonating, setIsDonating] = useState(false);
  const [donationSucceeded, setDonationSucceeded] = useState(false);
  const {
    params: { nonProfit },
  } = useRouteParams<"DonateScreen">();
  const { signedIn } = useCurrentUser();
  const { navigateTo, popNavigation } = useNavigation();

  const onContinue = () => {
    logEvent("P12_continueBtn_click", { nonProfitId: nonProfit.id });
    setIsDonating(true);
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
      message: error.response.data.formatted_message,
    });
  };

  const onAnimationEnd = () => {
    if (donationSucceeded)
      return navigateTo("DonationDoneScreen", { nonProfit });

    return popNavigation();
  };

  const renderCurrentSection = useCallback(() => {
    if (isDonating)
      return (
        <DonationInProgressSection
          nonProfit={nonProfit}
          onAnimationEnd={onAnimationEnd}
        />
      );
    if (signedIn)
      return (
        <SignedInSection
          nonProfit={nonProfit}
          onContinue={onContinue}
          onDonationFail={onDonationFail}
          onDonationSuccess={onDonationSuccess}
        />
      );

    return (
      <EmailInputSection
        nonProfit={nonProfit}
        onContinue={onContinue}
        onDonationFail={onDonationFail}
        onDonationSuccess={onDonationSuccess}
      />
    );
  }, [donationSucceeded]);

  return <View>{renderCurrentSection()}</View>;
}
export default withPlaceholder(DonateScreen, Placeholder);
