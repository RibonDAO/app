import { Text, View } from "react-native";
import Image from "components/atomics/Image";
import Button from "components/atomics/buttons/Button";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useTranslation } from "react-i18next";
import { useDonations } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { PLATFORM } from "utils/constants/Application";
import { theme } from "@ribon.io/shared/styles";
import { useIntegrationContext } from "contexts/integrationContext";
import { useUtmContext } from "contexts/utmContext";
import { logEvent } from "services/analytics";
import { useCallback, useState } from "react";
import { setLocalStorageItem } from "lib/localStorage";
import { ALREADY_RECEIVED_TICKET_KEY } from "screens/donations/CausesScreen/TicketSection";
import { useRouteParams } from "hooks/useRouteParams";
import { showToast } from "lib/Toast";
import { useNavigation } from "hooks/useNavigation";
import { useTickets } from "contexts/ticketsContext";
import S from "./styles";
import DonationInProgressSection from "../DonationInProgressSection";

function SignedInScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donateScreen.signedInScreen",
  });
  const { currentUser } = useCurrentUser();
  const { donate } = useDonations(currentUser?.id);
  const { formattedImpactText } = useFormattedImpactText();
  const { navigateTo } = useNavigation();

  const { currentIntegrationId, externalId } = useIntegrationContext();
  const { setTickets } = useTickets();
  const { utmSource, utmMedium, utmCampaign } = useUtmContext();
  const [donationSucceeded, setDonationSucceeded] = useState(true);
  const {
    params: { nonProfit },
  } = useRouteParams<"SignedInScreen">();
  const [isDonating, setIsDonating] = useState(false);

  const onDonationSuccess = () => {
    setDonationSucceeded(true);
    setLocalStorageItem(ALREADY_RECEIVED_TICKET_KEY, "false");
    logEvent("ticketDonated_end", { nonProfitId: nonProfit.id });
  };

  const onDonationFail = (error: any) => {
    setDonationSucceeded(false);
    showToast({
      type: "error",
      message: error?.response?.data?.formatted_message || t("donationError"),
    });

    setTickets(0);
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
      {isDonating ? (
        <DonationInProgressSection
          nonProfit={nonProfit}
          onAnimationEnd={onAnimationEnd}
        />
      ) : (
        <View style={S.container}>
          <View style={S.imageContainer}>
            <Image
              style={S.mainImage}
              source={{ uri: nonProfit.mainImage }}
              accessibilityIgnoresInvertColors
            />
          </View>
          <View style={S.contentContainer}>
            <Text style={S.title}>{t("title")}</Text>
            <Text style={S.description}>
              {formattedImpactText(nonProfit, undefined, false, true)}
            </Text>

            <Button
              text={t("confirmDonation")}
              onPress={handleButtonPress}
              backgroundColor={theme.colors.brand.primary[600]}
              borderColor={theme.colors.brand.primary[600]}
              customStyles={S.button}
              textColor={theme.colors.neutral[25]}
            />
          </View>
        </View>
      )}
    </View>
  );
}

export default SignedInScreen;
