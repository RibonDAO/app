import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import Image from "components/atomics/Image";
import PrivacyPolicyLayout from "components/moleculars/layouts/PrivacyPolicyLayout";
import { useNavigation } from "hooks/useNavigation";
import { logEvent } from "services/analytics";
import DonationInProgressSection from "screens/donations/auth/DonationInProgressSection";
import GoogleLogin from "components/moleculars/buttons/GoogleLogin";
import MagicLinkLogin from "components/moleculars/buttons/MagicLinkLogin";
import { showToast } from "lib/Toast";
import { useCallback, useState } from "react";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useRouteParams } from "hooks/useRouteParams";
import usePageView from "hooks/usePageView";
import AppleLogin from "components/moleculars/buttons/AppleLogin";
import useDonationFlow from "hooks/useDonationFlow";
import { useTickets } from "hooks/useTickets";
import S from "./styles";

function DonationSignInScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.signInScreen",
  });

  const [isDonating, setIsDonating] = useState(false);
  const [donationSucceeded, setDonationSucceeded] = useState(true);
  const [shouldRepeatAnimation, setShouldRepeatAnimation] = useState(true);
  const {
    params: { nonProfit },
  } = useRouteParams<"DonationSignInScreen">();
  const { navigateTo, popNavigation } = useNavigation();
  const { formattedImpactText } = useFormattedImpactText();
  const { handleDonate } = useDonationFlow();
  const { handleCollect } = useTickets();
  usePageView("P27_view", { from: "donation_flow", nonProfitId: nonProfit.id });

  const onDonationSuccess = () => {
    setDonationSucceeded(true);
    setShouldRepeatAnimation(false);
    logEvent("ticketDonated_end", { nonProfitId: nonProfit.id, quantity: 1 });
  };

  const onDonationFail = (error: any) => {
    setDonationSucceeded(false);
    setShouldRepeatAnimation(false);
    showToast({
      type: "error",
      message: error?.response?.data?.formatted_message,
    });
    popNavigation();
  };

  async function donateCallback() {
    await handleCollect({
      onSuccess: () => {
        logEvent("ticketCollected", { from: "collect" });
      },
    });
    await handleDonate({
      nonProfit,
      ticketsQuantity: 1,
      onSuccess: () => onDonationSuccess(),
      onError: (error) => {
        onDonationFail(error);
      },
    });
  }

  const onContinue = () => {
    setIsDonating(true);
    donateCallback();
  };

  const onContinueMagicLink = () => {
    navigateTo("InsertEmailAccountScreen", { nonProfit });
  };

  const onAnimationEnd = useCallback(() => {
    if (donationSucceeded) {
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
          shouldRepeatAnimation={shouldRepeatAnimation}
        />
      ) : (
        <KeyboardAvoidingView
          behavior="position"
          style={S.keyboardView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -20}
        >
          <TouchableWithoutFeedback
            accessibilityRole="button"
            onPress={Keyboard.dismiss}
          >
            <ScrollView contentContainerStyle={S.container}>
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
                <GoogleLogin onContinue={onContinue} from="donation_flow" />
                {Platform.OS === "ios" && (
                  <AppleLogin onContinue={onContinue} from="donation_flow" />
                )}
                <MagicLinkLogin
                  onContinue={onContinueMagicLink}
                  from="donation_flow"
                />
                <PrivacyPolicyLayout />
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

export default DonationSignInScreen;
