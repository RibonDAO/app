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
import MagicLinkLogin from "components/moleculars/MagicLinkLogin";
import { useNavigation } from "hooks/useNavigation";
import UserAvatarIcon from "assets/icons/userAvatarIcon";
import GoogleLogin from "components/moleculars/buttons/GoogleLogin";
import AppleLogin from "components/moleculars/buttons/AppleLogin";
import UserAvatar from "../assets/user-avatar.svg";
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
            <Image
              style={S.mainImage}
              source={{ uri: UserAvatar }}
              accessibilityIgnoresInvertColors
            />
          </View>
          <View style={S.contentContainer}>
            <Text style={S.title}>{t("title")}</Text>

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
