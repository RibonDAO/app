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
import { useRouteParams } from "hooks/useRouteParams";
import Button from "components/atomics/buttons/Button";
import { useNavigation } from "hooks/useNavigation";
import { theme } from "@ribon.io/shared/styles";
import { INTEGRATION_AUTH_ID } from "utils/constants/Application";
import { useFirstAccessToIntegration } from "@ribon.io/shared";
import UserAvatarIcon from "../assets/UserAvatarIcon";
import S from "./styles";

function SentMagicLinkEmailScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.sentMagicLinkEmailScreen",
  });
  const { navigateTo } = useNavigation();
  const { isFirstAccessToIntegration } =
    useFirstAccessToIntegration(INTEGRATION_AUTH_ID);

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
            <UserAvatarIcon />
          </View>

          <View style={S.contentContainer}>
            <Text style={S.title}>
              {" "}
              {isFirstAccessToIntegration ? t("firstAccessTitle") : t("title")}
            </Text>
            <Text style={S.description}>
              {isFirstAccessToIntegration
                ? t("firstAccessText", { email })
                : t("text", { email })}
            </Text>
          </View>
          <Button
            text={t("buttonText")}
            onPress={() =>
              navigateTo("TabNavigator", { screen: "CausesScreen" })
            }
            textColor={theme.colors.neutral10}
            borderColor={theme.colors.brand.primary[600]}
            backgroundColor={theme.colors.brand.primary[600]}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SentMagicLinkEmailScreen;
