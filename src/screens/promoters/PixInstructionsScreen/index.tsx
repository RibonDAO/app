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

import { withPlaceholder } from "config/navigation/withPlaceholder";
import InputText from "components/atomics/inputs/InputText";
import Button from "components/atomics/buttons/Button";

import { usePixPaymentInformation } from "contexts/pixInformationContext";
import { theme } from "@ribon.io/shared";

import { useEffect, useState } from "react";
import ArrowLeft from "components/vectors/ArrowLeft";
import { useTranslation } from "react-i18next";
import { useCheckoutContext } from "contexts/checkoutContext";
import usePayable from "hooks/usePayable";
import Icon from "components/atomics/Icon";
import TrustSeal from "components/moleculars/TrustSeal";
import PaymentPlaceholder from "components/moleculars/PaymentPlaceholder";
import { useNavigation } from "hooks/useNavigation";
import S from "./styles";

function PixInstructionsScreen(): JSX.Element {
  const [isCopy, setIsCopy] = useState(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.pixInstructionsScreen",
  });

  const { verifyPayment, pixInstructions } = usePixPaymentInformation();

  const copyToClipboard = () => {
    Clipboard.setString(
      pixInstructions?.nextAction?.pixDisplayQrCode?.data ?? "",
    );
    setIsCopy(true);
  };

  const { target, targetId } = useCheckoutContext();

  const payable = usePayable(target, targetId);

  const { navigateTo } = useNavigation();

  const handleBackButtonClick = () => {
    navigateTo("CausesScreen");
  };

  useEffect(() => {
    if (pixInstructions && pixInstructions.clientSecret) {
      const totalTime = 5 * 60 * 1000;
      const interval = 30 * 1000;
      let elapsedTime = 0;

      const intervalId = setInterval(async () => {
        elapsedTime += interval;
        if (elapsedTime >= totalTime) {
          clearInterval(intervalId);
        }
      }, interval);
    }
  }, [pixInstructions, verifyPayment]);

  useEffect(() => {
    const requestInterval = 30000;
    const totalTime = 5 * 60 * 1000;

    const verifyStatus = async () => {
      await verifyPayment(pixInstructions?.id ?? "");
    };

    const intervalId = setInterval(verifyStatus, requestInterval);

    setTimeout(() => {
      clearInterval(intervalId);
    }, totalTime);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
            {target === "club" ? (
              <Text style={S.title}>
                {t("paymentOf")}
                <Text style={S.payableName}>{t("ribonClub")} </Text>
              </Text>
            ) : (
              <Text style={S.title}>
                {t("donatingTo")}
                <Text style={S.payableName}>{payable?.name} </Text>
              </Text>
            )}

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

            <View style={S.infoContainer}>
              <Icon
                type="rounded"
                name="error"
                color={theme.colors.neutral[600]}
                size={24}
                style={{ marginRight: 4 }}
              />
              <Text style={S.info}>{t("pixReceiverText")}</Text>
            </View>
            <Text style={S.pixCode}>{t("instructions")}</Text>
            <View style={S.borderContainer}>
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
            <TrustSeal />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default withPlaceholder(PixInstructionsScreen, PaymentPlaceholder);
