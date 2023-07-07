import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "components/atomics/buttons/Button";
import { isValidEmail } from "lib/validators/email";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputText from "components/atomics/inputs/InputText";
import { formattedLanguage } from "lib/formatters/languageFormatter";
import { PLATFORM, RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { openInWebViewer } from "lib/linkOpener";
import { NonProfit } from "@ribon.io/shared/types";
import { useDonations, useUsers } from "@ribon.io/shared/hooks";
import { useLanguage } from "contexts/languageContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onContinue: () => void;
  onDonationSuccess: () => void;
  onDonationFail: (error: any) => void;
};
function EmailInputSection({
  nonProfit,
  onContinue,
  onDonationFail,
  onDonationSuccess,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donateScreen",
  });
  const [email, setEmail] = useState("");
  const { findOrCreateUser } = useUsers();
  const { currentLang } = useLanguage();
  const { setCurrentUser } = useCurrentUser();
  const { donate } = useDonations(undefined);

  async function donateCallback() {
    if (email) {
      try {
        const user = await findOrCreateUser(
          email,
          formattedLanguage(currentLang),
        );
        setCurrentUser(user);
        await donate(RIBON_INTEGRATION_ID, nonProfit.id, email, PLATFORM);
        onDonationSuccess();
      } catch (error: any) {
        onDonationFail(error);
      }
    }
  }

  const handleButtonPress = async () => {
    if (!isValidEmail(email)) return;
    onContinue();

    await donateCallback();
  };

  const handleTextChange = (text: string) => {
    setEmail(text);
  };

  const linkToPrivacyPolicy = () => {
    openInWebViewer(t("privacyPolicyLink"));
  };

  const linkToTerms = () => {
    openInWebViewer(t("terms"));
  };

  return (
    <>
      <View style={S.nonProfitContainer}>
        <View style={S.textWrapper}>
          <Text style={S.nonProfitText}>{t("nonProfitText")}</Text>
          <Text style={S.nonProfitHighlight}>{nonProfit.name}</Text>
        </View>

        <LinearGradient
          colors={[theme.colors.brand.primary[800], "transparent"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          locations={[0.0, 1.0]}
          style={S.gradient}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <TouchableWithoutFeedback
          accessibilityRole="button"
          onPress={Keyboard.dismiss}
        >
          <View style={S.container}>
            <View style={S.inputEmailContainer}>
              <Text style={S.description}>{t("description")}</Text>

              <InputText
                name="email"
                placeholder={t("textInputPlaceholder") || ""}
                keyboardType="email-address"
                onChangeText={handleTextChange}
                value={email}
                autoCapitalize="none"
                textContentType="emailAddress"
                autoFocus
              />
            </View>

            <View style={S.buttonContainer}>
              <Button
                text={t("donateText")}
                onPress={handleButtonPress}
                disabled={!isValidEmail(email)}
                customStyles={S.button}
              />
              <Text style={S.privacyPolicyText}>
                {t("agreementText")}{" "}
                <Text style={S.privacyPolicyLink} onPress={linkToTerms}>
                  {t("termsText")}
                </Text>
                {t("and")}{" "}
                <Text style={S.privacyPolicyLink} onPress={linkToPrivacyPolicy}>
                  {t("privacyPolicyText")}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

export default EmailInputSection;
