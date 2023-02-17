import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from "react-native";
import { useCanDonate, useDonations, useUsers } from "@ribon.io/shared/hooks";
import { theme } from "@ribon.io/shared/styles";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import Image from "components/atomics/Image";
import Button from "components/atomics/buttons/Button";
import { showToast } from "lib/Toast";
import { isValidEmail } from "lib/validators/email";
import S from "screens/donations/DonateScreen/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { useRouteParams } from "hooks/useRouteParams";
import InputText from "components/atomics/inputs/InputText";
import TransferTicketAnimation from "components/moleculars/TransferTicketAnimation";
import UserIcon from "components/vectors/UserIcon";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import { useLanguage } from "contexts/languageContext";
import { formattedLanguage } from "lib/formatters/languageFormatter";
import Placeholder from "./placeholder";

function DonateScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donateScreen",
  });
  const [isDonating, setIsDonating] = useState(false);
  const {
    params: { nonProfit },
  } = useRouteParams<"DonateScreen">();
  const { findOrCreateUser } = useUsers();
  const { setCurrentUser, currentUser } = useCurrentUser();
  const [email, setEmail] = useState(currentUser?.email || "");
  const { donate } = useDonations(currentUser?.id);
  const { navigateTo } = useNavigation();
  const { refetch: refetchCanDonate } = useCanDonate(RIBON_INTEGRATION_ID);
  const { currentLang } = useLanguage();

  function handleButtonPress() {
    if (!isValidEmail(email)) {
      setIsDonating(false);
    } else {
      setIsDonating(true);
    }
  }

  async function donateCallback() {
    if (email) {
      try {
        const user = await findOrCreateUser(
          email,
          formattedLanguage(currentLang),
        );
        setCurrentUser(user);
        await donate(RIBON_INTEGRATION_ID, nonProfit.id, email);
        refetchCanDonate();
        navigateTo("DonationDoneScreen", { nonProfit });
      } catch (error: any) {
        showToast(error.response.data.formatted_message);
      } finally {
        setTimeout(() => {
          setIsDonating(false);
        }, 500);
      }
    }
  }

  const handleTextChange = (text: string) => {
    setEmail(text);
  };

  const linkToPrivacyPolicy = () => {
    Linking.openURL(t("privacyPolicyLink"));
  };
  return (
    <View>
      <View style={S.nonProfitContainer}>
        <View style={S.textWrapper}>
          <Text style={S.nonProfitText}>{t("nonProfitText")}</Text>
          <Text style={S.nonProfitHighlight}>{nonProfit.name}</Text>
        </View>
        <Image style={S.logo} source={{ uri: nonProfit.mainImage }} />
        <LinearGradient
          colors={[theme.colors.brand.primary[800], "transparent"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          locations={[0.0, 1.0]}
          style={S.gradient}
        />
      </View>
      {isDonating ? (
        <View style={S.animationContainer}>
          <TransferTicketAnimation
            onAnimationEnd={() => {}}
            senderIcon={<UserIcon />}
            receiverIcon={
              <Image style={S.nonProfitLogo} source={{ uri: nonProfit.logo }} />
            }
            description={t("animationText").toString()}
          />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  text={isDonating ? t("donatingText") : t("donateText")}
                  onPress={handleButtonPress}
                  timeout={isValidEmail(email) ? 2000 : null}
                  timeoutCallback={donateCallback}
                  disabled={isDonating || !isValidEmail(email)}
                  customStyles={S.button}
                />
                <Text style={S.privacyPolicyText}>
                  {t("agreementText")}{" "}
                  <Text
                    style={S.privacyPolicyLink}
                    onPress={linkToPrivacyPolicy}
                  >
                    {t("privacyPolicyText")}
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}
export default withPlaceholder(DonateScreen, Placeholder);
