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
import usePageView from "hooks/usePageView";
import PrivacyPolicyLayout from "components/moleculars/layouts/PrivacyPolicyLayout";

import { useNavigation } from "hooks/useNavigation";
import InputText from "components/atomics/inputs/InputText";
import { isValidEmail } from "lib/validators";
import { useEffect, useState } from "react";
import { useAuthentication } from "contexts/authenticationContext";
import { logEvent } from "services/analytics";
import { theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";
import UserAvatarIcon from "../assets/UserAvatarIcon";
import S from "./styles";

function InsertEmailScreen() {
  usePageView("P12_view", { nonProfitId: "" });
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.insertEmailScreen",
  });

  const [email, setEmail] = useState("");
  const { navigateTo } = useNavigation();

  const { sendAuthenticationEmail } = useAuthentication();

  useEffect(() => {
    logEvent("P28_view", {
      from: "sign_in",
    });
  }, []);

  const handleButtonPress = async () => {
    await sendAuthenticationEmail({ email });
    logEvent("authEmailFormBtn_click", {
      from: "sign_in",
    });
    navigateTo("SentMagicLinkEmailScreen", { email });
  };

  const handleTextChange = (text: string) => {
    setEmail(text);
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
            <InputText
              name="email"
              placeholder={t("emailPlaceholder") || ""}
              keyboardType="email-address"
              onChangeText={handleTextChange}
              value={email}
              autoCapitalize="none"
              textContentType="emailAddress"
              autoFocus
              containerStyle={S.inputContainer}
              style={S.input}
            />

            <Button
              text={t("confirmText")}
              onPress={handleButtonPress}
              disabled={!isValidEmail(email)}
              customStyles={S.button}
              customTextStyles={{
                color: theme.colors.neutral10,
              }}
            />
            <PrivacyPolicyLayout />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default InsertEmailScreen;
