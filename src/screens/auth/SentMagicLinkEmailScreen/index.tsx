import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import { useTranslation } from "react-i18next";
import Image from "components/atomics/Image";
import usePageView from "hooks/usePageView";
import PrivacyPolicyLayout from "components/moleculars/layouts/PrivacyPolicyLayout";
import S from "./styles";
import UserAvatar from "../assets/user-avatar.svg";

function SentMagicLinkEmailScreen() {
  usePageView("P12_view", { nonProfitId: "" });
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.sentMagicLinkScreen",
  });

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
            <PrivacyPolicyLayout />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SentMagicLinkEmailScreen;
