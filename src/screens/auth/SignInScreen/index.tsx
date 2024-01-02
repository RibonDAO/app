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
import UserAvatarIcon from "../assets/UserAvatarIcon";
import S from "./styles";

function SignInScreen() {
  usePageView("P27_view", { from: "direct_flow" });
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.signInScreen",
  });

  const { navigateTo } = useNavigation();

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
            <GoogleLogin
              onContinue={() => navigateTo("CausesScreen")}
              from="direct_flow"
            />
            {Platform.OS === "ios" && (
              <AppleLogin
                onContinue={() => navigateTo("CausesScreen")}
                from="direct_flow"
              />
            )}
            <MagicLinkLogin
              onContinue={() => navigateTo("InsertEmailScreen")}
              from="direct_flow"
            />
            <PrivacyPolicyLayout />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SignInScreen;
