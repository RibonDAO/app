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
import { isValidEmail } from "lib/validators";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputText from "components/atomics/inputs/InputText";
import { formattedLanguage } from "lib/formatters/languageFormatter";
import { PLATFORM } from "utils/constants/Application";
import { NonProfit } from "@ribon.io/shared/types";
import { useDonations, useSources, useUsers } from "@ribon.io/shared/hooks";
import { useLanguage } from "contexts/languageContext";
import { useCurrentUser } from "contexts/currentUserContext";
import BackgroundShapes from "components/vectors/BackgroundShapes";
import Image from "components/atomics/Image";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { perform } from "lib/timeoutHelpers";
import usePageView from "hooks/usePageView";
import { useIntegrationContext } from "contexts/integrationContext";
import { useUtmContext } from "contexts/utmContext";
import PrivacyPolicyLayout from "components/moleculars/layouts/PrivacyPolicyLayout";
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
  usePageView("P12_view", { nonProfitId: nonProfit.id });
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donateScreen",
  });
  const [email, setEmail] = useState("");
  const { findOrCreateUser } = useUsers();
  const { currentLang } = useLanguage();
  const { setCurrentUser } = useCurrentUser();
  const { donate } = useDonations(undefined);
  const { formattedImpactText } = useFormattedImpactText();

  const { currentIntegrationId, externalId } = useIntegrationContext();

  const { utmSource, utmMedium, utmCampaign } = useUtmContext();

  const { createSource } = useSources();

  async function donateCallback() {
    try {
      const user = await findOrCreateUser(
        email,
        formattedLanguage(currentLang),
      );
      if (currentIntegrationId) {
        createSource(user.id, currentIntegrationId);
      }
      perform(() => {
        setCurrentUser(user);
      }).in(3000);
      await donate(
        currentIntegrationId,
        nonProfit.id,
        email,
        PLATFORM,
        externalId,
        utmSource,
        utmMedium,
        utmCampaign,
      );
      onDonationSuccess();
    } catch (error: any) {
      onDonationFail(error);
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
            <PrivacyPolicyLayout />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default EmailInputSection;
