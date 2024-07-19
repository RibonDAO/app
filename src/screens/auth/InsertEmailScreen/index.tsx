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
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.insertEmailScreen",
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { navigateTo } = useNavigation();

  const { sendOtpEmail } = useAuthentication();

  useEffect(() => {
    logEvent("P28_view", {
      from: "sign_in",
    });
  }, []);

  const handleButtonPress = async () => {
    if (emailSent) return;

    setLoading(true);
    await sendOtpEmail({ email });
    logEvent("authEmailFormBtn_click", {
      from: "sign_in",
    });
    setEmailSent(true);
    navigateTo("InsertOtpCodeScreen", { email });
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
              disabled={loading}
            />

            <Button
              text={t("confirmText")}
              onPress={handleButtonPress}
              disabled={!isValidEmail(email) || loading}
              customStyles={loading ? S.buttonDisabled : S.button}
              customTextStyles={{
                color: theme.colors.neutral10,
              }}
              loading={loading}
            />
            <PrivacyPolicyLayout />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default InsertEmailScreen;
