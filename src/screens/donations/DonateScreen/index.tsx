import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { useCanDonate, useDonations, useUsers } from "@ribon.io/shared/hooks";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
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
import { withPlaceholder } from "config/navigation/withPlaceholder";
import Placeholder from "./placeholder";

function DonateScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donateModal",
  });
  const [isDonating, setIsDonating] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const {
    params: { nonProfit },
  } = useRouteParams<"DonateScreen">();
  const { findOrCreateUser } = useUsers();
  const { setCurrentUser, currentUser } = useCurrentUser();
  const [email, setEmail] = useState(currentUser?.email || "");
  const { donate } = useDonations(currentUser?.id);
  const { navigateTo, popNavigation } = useNavigation();
  const { refetch: refetchCanDonate } = useCanDonate(RIBON_INTEGRATION_ID);

  useEffect(() => {
    if (isValidEmail(email)) {
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
    }
  }, [email]);

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
        const user = await findOrCreateUser(email);
        setCurrentUser(user);
        await donate(RIBON_INTEGRATION_ID, nonProfit.id, email);
        refetchCanDonate();
        popNavigation();
        setTimeout(() => {
          navigateTo("DonationDoneScreen", { nonProfit });
        }, 500);
      } catch (error: any) {
        popNavigation();
        showToast(error.response.data.formatted_message);
      } finally {
        setIsDonating(false);
      }
    }
  }

  const handleTextChange = (text: string) => {
    setEmail(text);
  };

  return (
    <View style={S.modalWrapper}>
      <View style={S.nonProfitContainer}>
        <View style={S.textWrapper}>
          <Text style={S.nonProfitText}>{t("nonProfitText")}</Text>
          <Text style={S.nonProfitHighlight}>{nonProfit.name}</Text>
        </View>
        <Image style={S.logo} source={{ uri: nonProfit.mainImage }} />
        <LinearGradient
          colors={["rgb(140, 224, 190)", "transparent"]}
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
              <Button
                text={t("cancel")}
                onPress={() => popNavigation()}
                customStyles={S.cancelButton}
                outline
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
export default withPlaceholder(DonateScreen, Placeholder);
