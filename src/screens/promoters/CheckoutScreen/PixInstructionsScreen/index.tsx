import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";

import usePageView from "hooks/usePageView";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import InputText from "components/atomics/inputs/InputText";
import Button from "components/atomics/buttons/Button";

import { usePixPaymentInformation } from "contexts/pixInformationContext";
import { theme } from "@ribon.io/shared";

import { useEffect, useState } from "react";
import ArrowLeft from "components/vectors/ArrowLeft";
import { useTranslation } from "react-i18next";
import { useNavigation } from "hooks/useNavigation";
import { useCheckoutContext } from "contexts/checkoutContext";
import usePayable from "hooks/usePayable";
import Icon from "components/atomics/Icon";
import S from "./styles";
import Placeholder from "../placeholder";
import PriceSelection from "../Components/PriceSelection";

function PixInstructionsScreen(): JSX.Element {
  usePageView("P2x_view");

  const [isCopy, setIsCopy] = useState(false);
  const { navigateTo } = useNavigation();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.pixInstructionsScreen",
  });

  const { offer } = useCheckoutContext();

  const { verifyPayment, pixInstructions } = usePixPaymentInformation();

  const copyToClipboard = () => {
    Clipboard.setString(
      pixInstructions?.nextAction?.pixDisplayQrCode?.data ?? "",
    );
    setIsCopy(true);
  };

  const { target, targetId } = useCheckoutContext();

  const payable = usePayable(target, targetId);

  const handleBackButtonClick = () => {
    navigateTo("CausesScreen");
  };

  useEffect(() => {
    if (pixInstructions && pixInstructions.clientSecret) {
      const totalTime = 5 * 60 * 1000;
      const interval = 30 * 1000;
      let elapsedTime = 0;

      const intervalId = setInterval(async () => {
        await verifyPayment(pixInstructions.id, intervalId.toString());

        elapsedTime += interval;
        if (elapsedTime >= totalTime) {
          clearInterval(intervalId);
        }
      }, interval);
    }
  }, [pixInstructions]);

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={S.keyboardView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -20}
    >
      <TouchableWithoutFeedback
        accessibilityRole="button"
        onPress={Keyboard.dismiss}
        style={S.outerContainer}
      >
        <ScrollView style={S.container}>
          <View style={S.arrow}>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={handleBackButtonClick}
              testID="arrow-back-button"
            >
              <ArrowLeft />
            </TouchableOpacity>
          </View>
          <View style={S.mainContainer}>
            <Text style={S.title}>
              {t("donatingTo")}
              <Text style={S.payableName}>{payable?.name}</Text>
            </Text>
            <PriceSelection currentOffer={offer} isEdit={false} />
            <View>
              <View style={S.pixContainer}>
                <Text style={S.pixCode}>{t("pixCode")}</Text>
                <Image
                  accessibilityIgnoresInvertColors
                  style={S.qrcode}
                  source={{
                    uri: pixInstructions?.nextAction?.pixDisplayQrCode
                      ?.imageUrlPng,
                  }}
                />
                <Text style={S.info}>{t("expiresAt")}</Text>
              </View>
              <InputText
                name={t("pixCode")}
                disabled
                onChangeText={() => ({})}
                value={pixInstructions?.nextAction?.pixDisplayQrCode?.data}
                containerStyle={{ marginTop: 16, alignItems: "center" }}
                style={{ display: "flex", flex: 1 }}
              />
              <Button
                onPress={copyToClipboard}
                text={isCopy ? t("copyCodeSuccess") : t("copyCode")}
                backgroundColor={
                  isCopy
                    ? theme.colors.neutral10
                    : theme.colors.brand.primary[600]
                }
                textColor={
                  isCopy
                    ? theme.colors.brand.primary[600]
                    : theme.colors.neutral10
                }
                borderColor={theme.colors.brand.primary[600]}
                customStyles={{ height: 48, marginBottom: 16 }}
                leftIcon={
                  isCopy
                    ? {
                        name: "check_circle",
                        color: theme.colors.brand.primary[600],
                        size: 24,
                        type: "outlined",
                      }
                    : {
                        name: "content_copy",
                        color: theme.colors.neutral10,
                        size: 24,
                        type: "outlined",
                      }
                }
              />

              <View>
                <View style={S.instructionsContainer}>
                  <Icon
                    type="rounded"
                    name="error"
                    color={theme.colors.neutral[600]}
                    size={24}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={S.info}>{t("pixReceiverText")}</Text>
                </View>
                <Text style={S.pixCode}>{t("instructions")}</Text>
                <View style={S.instructionsContainer}>
                  <View style={S.circle}>
                    <Text style={S.number}>1</Text>
                  </View>
                  <Text style={S.info}>{t("firstInfo")}</Text>
                </View>
                <View style={S.instructionsContainer}>
                  <View style={S.circle}>
                    <Text style={S.number}>2</Text>
                  </View>
                  <Text style={S.info}>{t("secondInfo")}</Text>
                </View>
                <View style={S.instructionsContainer}>
                  <View style={S.circle}>
                    <Text style={S.number}>3</Text>
                  </View>
                  <Text style={S.info}>{t("thirdInfo")}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default withPlaceholder(PixInstructionsScreen, Placeholder);
