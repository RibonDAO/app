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
import { useRouteParams } from "hooks/useRouteParams";
import S from "./styles";
import UserAvatar from "../assets/user-avatar.svg";

function SentMagicLinkEmailScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.sentMagicLinkEmailScreen",
  });

  const {
    params: { email },
  } = useRouteParams<"SentMagicLinkEmailScreen">();
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
            <Text style={S.description}>{t("text", { email })}</Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SentMagicLinkEmailScreen;
