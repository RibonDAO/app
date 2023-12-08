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
import usePageView from "hooks/usePageView";
import PrivacyPolicyLayout from "components/moleculars/layouts/PrivacyPolicyLayout";
import { NonProfit } from "@ribon.io/shared/types";
import MagicLinkLogin from "components/moleculars/MagicLinkLogin";
import { useNavigation } from "hooks/useNavigation";
// import { useIntegrationContext } from "contexts/integrationContext";
// import { useUserV1Donations } from "@ribon.io/shared";
// import { useUtmContext } from "contexts/utmContext";
// import { PLATFORM } from "utils/constants/Application";
// import { logEvent } from "services/analytics";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onContinue: () => void;
  onDonationSuccess: () => void;
  onDonationFail: (error: any) => void;
};

function SignInSection({
  nonProfit,
  onContinue,
  onDonationFail,
  onDonationSuccess,
}: Props) {
  usePageView("P12_view", { nonProfitId: nonProfit.id });
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.signInScreen",
  });

  const { navigateTo } = useNavigation();
  const { formattedImpactText } = useFormattedImpactText();
  // const { donate } = useUserV1Donations();
  // const { currentIntegrationId, externalId } = useIntegrationContext();
  // const { utmSource, utmMedium, utmCampaign } = useUtmContext();

  // const onContinueProviderLogin = async () => {
  //   try {
  //     await donate(
  //       currentIntegrationId,
  //       nonProfit.id,
  //       PLATFORM,
  //       externalId,
  //       utmSource,
  //       utmMedium,
  //       utmCampaign,
  //     );
  //     onDonationSuccess();
  //   } catch (error: any) {
  //     onDonationFail(error);
  //   }

  //   onContinue();
  //   logEvent("authEmailFormBtn_click", {
  //     nonProfitId: nonProfit.id,
  //     from: "donation_flow",
  //   });
  // };

  return (
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
            <MagicLinkLogin
              onContinue={() =>
                navigateTo("InsertEmailDonationScreen", {
                  nonProfit,
                })
              }
              from="donation_flow"
            />
            <PrivacyPolicyLayout />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SignInSection;
