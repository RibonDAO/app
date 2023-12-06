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
import MagicLinkButton from "components/moleculars/MagicLinkButton";
import { useNavigation } from "hooks/useNavigation";
import S from "./styles";
import UserAvatar from "./assets/user-avatar.svg";

type Props = {
  nonProfit: NonProfit;
  onContinue?: () => void;
  onDonationSuccess: () => void;
  onDonationFail: (error: any) => void;
};

function SignInSection({
  nonProfit,
  onContinue,
  onDonationFail,
  onDonationSuccess,
}: Props) {
  usePageView("P12_view", { nonProfitId: "" });
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.signInScreen",
  });

  const { navigateTo } = useNavigation();

  const onContinueM = (pathname: string) => {
    navigateTo(pathname);
  };

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
              source={UserAvatar}
              accessibilityIgnoresInvertColors
            />
          </View>

          <View style={S.contentContainer}>
            <Text style={S.title}>{t("title")}</Text>
            <MagicLinkButton
              onContinue={() => onContinueM("InsertEmailScreen")}
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
