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
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "components/atomics/Image";
import usePageView from "hooks/usePageView";
import PrivacyPolicyLayout from "components/moleculars/layouts/PrivacyPolicyLayout";
import { logEvent } from "services/analytics";
import { useRouteParams } from "hooks/useRouteParams";
import { useNavigation } from "hooks/useNavigation";
import S from "./styles";

function InsertEmailAccountScreen() {
  const {
    params: { nonProfit },
  } = useRouteParams<"InsertEmailAccountScreen">();
  usePageView("P12_view", { nonProfitId: nonProfit.id });
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.insertEmailAccountScreen",
  });

  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (nonProfit) {
      logEvent("P28_view", {
        nonProfitId: nonProfit.id,
        from: "donation_flow",
      });
    }
  }, [nonProfit]);

  const handleButtonPress = () => {
    navigateTo("CausesScreen");
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
            <Image
              style={S.mainImage}
              source={{ uri: nonProfit.mainImage }}
              accessibilityIgnoresInvertColors
            />
          </View>
          <View style={S.contentContainer}>
            <Text style={S.title}>{t("title")}</Text>
            <Text style={S.description}>desc</Text>

            <Button
              text={t("confirmText")}
              onPress={handleButtonPress}
              customStyles={S.button}
            />
            <PrivacyPolicyLayout />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
export default InsertEmailAccountScreen;
