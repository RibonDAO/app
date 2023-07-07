import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import BackgroundShapes from "components/vectors/BackgroundShapes";
import Image from "components/atomics/Image";
import useFormattedImpactText from "hooks/useFormattedImpactText";
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
  const { formattedImpactText } = useFormattedImpactText();

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
    openInWebViewer(t("termsLink"));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <TouchableWithoutFeedback
        accessibilityRole="button"
        onPress={Keyboard.dismiss}
      >
        <ScrollView contentContainerStyle={S.container}>
          <View style={S.imageContainer}>
            <View style={S.imageBackground}>
              <BackgroundShapes />
            </View>
            <Image
              style={S.mainImage}
              source={{ uri: nonProfit.mainImage }}
              accessibilityIgnoresInvertColors
            />
          </View>
          <View style={S.contentContainer}>
            <Text style={S.title}>{t("title")}</Text>
            <Text style={S.description}>
              {formattedImpactText(nonProfit, undefined, false, true)}
            </Text>

            <InputText
              name="email"
              placeholder={t("textInputPlaceholder") || ""}
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
              text={t("continueText")}
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default EmailInputSection;
