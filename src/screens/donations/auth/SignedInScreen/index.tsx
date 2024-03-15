import { Text, View } from "react-native";
import Image from "components/atomics/Image";
import Button from "components/atomics/buttons/Button";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import { theme } from "@ribon.io/shared/styles";
import { logEvent } from "services/analytics";
import { useCallback, useState } from "react";
import { useRouteParams } from "hooks/useRouteParams";
import { useNavigation } from "hooks/useNavigation";
import useDonationFlow from "hooks/useDonationFlow";
import S from "./styles";
import DonationInProgressSection from "../DonationInProgressSection";

function SignedInScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donateScreen.signedInScreen",
  });
  const { currentUser } = useCurrentUser();
  const { handleCollectAndDonate } = useDonationFlow();
  const { formattedImpactText } = useFormattedImpactText();
  const { navigateTo } = useNavigation();

  const [donationSucceeded, setDonationSucceeded] = useState(true);
  const [shouldRepeatAnimation, setShouldRepeatAnimation] = useState(true);
  const {
    params: { nonProfit },
  } = useRouteParams<"SignedInScreen">();
  const [isDonating, setIsDonating] = useState(false);

  const onDonationSuccess = () => {
    setDonationSucceeded(true);
    setShouldRepeatAnimation(false);
    logEvent("ticketDonated_end", { nonProfitId: nonProfit.id });
  };

  const onDonationFail = () => {
    setDonationSucceeded(false);
    setShouldRepeatAnimation(false);

    navigateTo("CausesScreen", { newState: { failedDonation: true } });
  };

  const handleButtonPress = async () => {
    if (!currentUser?.email) return;

    setIsDonating(true);

    await handleCollectAndDonate({
      nonProfit,
      email: currentUser.email,
      onSuccess: () => {
        logEvent("ticketCollected", { from: "collectAndDonate" });
        onDonationSuccess();
      },
      onError: () => {
        onDonationFail();
      },
    });
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
