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
import usePageView from "hooks/usePageView";
import PrivacyPolicyLayout from "components/moleculars/layouts/PrivacyPolicyLayout";
import { useNavigation } from "hooks/useNavigation";
import GoogleLogin from "components/moleculars/buttons/GoogleLogin";
import MagicLinkLogin from "components/moleculars/buttons/MagicLinkLogin";
import AppleLogin from "components/moleculars/buttons/AppleLogin";
import { useCurrentUser } from "contexts/currentUserContext";
import { showToast } from "lib/Toast";
import { userAccountApi } from "@ribon.io/shared";
import { useAuthentication } from "contexts/authenticationContext";
import UserAvatarIcon from "../assets/UserAvatarIcon";
import S from "./styles";

function SignInExtraTicketScreen() {
  usePageView("P28_view", { from: "validation_flow" });
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.signInExtraTicketScreen",
  });

  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const { sendAuthenticationEmail } = useAuthentication();

  const onContinue = async (pathname: string) => {
    await userAccountApi.postSendValidatedEmail();
    navigateTo(pathname);
    showToast({
      type: "success",
      message: t("toastSuccessMessage"),
    });
  };

  const onContinueMagicLink = (pathname: string) => {
    sendAuthenticationEmail({ email: currentUser?.email });
    navigateTo(pathname, { email: currentUser?.email });
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
            <UserAvatarIcon />
          </View>
          <View style={S.contentContainer}>
            <Text style={S.title}>{t("title")}</Text>
            <Text style={S.description}>
              {t("description", { email: currentUser?.email })}
            </Text>
            <GoogleLogin
              onContinue={() => onContinue("CausesScreen")}
              from="validation_flow"
            />
            {Platform.OS === "ios" && (
              <AppleLogin
                onContinue={() => onContinue("CausesScreen")}
                from="validation_flow"
              />
            )}
            <MagicLinkLogin
              onContinue={() => onContinueMagicLink("SentMagicLinkEmailScreen")}
              from="validation_flow"
            />
            <PrivacyPolicyLayout />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SignInExtraTicketScreen;
