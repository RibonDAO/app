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
import MagicLinkLogin from "components/moleculars/MagicLinkLogin";
import { useNavigation } from "hooks/useNavigation";
import UserAvatar from "screens/auth/icons/UserAvatar";
import S from "./styles";

function SignInScreen() {
  usePageView("P12_view", { nonProfitId: "" });
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
            <UserAvatar />
          </View>
          <View style={S.contentContainer}>
            <Text style={S.title}>{t("title")}</Text>
            <MagicLinkLogin
              onContinue={() => navigateTo("InsertEmailScreen")}
              from="donation_flow"
            />
            <PrivacyPolicyLayout />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SignInScreen;
