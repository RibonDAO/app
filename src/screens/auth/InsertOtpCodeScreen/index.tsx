import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "hooks/useNavigation";
import { useAuthentication } from "contexts/authenticationContext";
import { logEvent } from "services/analytics";
import { theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useRouteParams } from "hooks/useRouteParams";
import Icon from "components/atomics/Icon";
import { isValidOTP } from "lib/validators";
import { countdown } from "lib/timeoutHelpers";
import S from "./styles";
import LockIcon from "../assets/LockIcon";

const CELL_COUNT = 6;

function InsertOtpCodeScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.insertOtpCodeScreen",
  });

  const [currentEmail, setCurrentEmail] = useState("");
  const [currentOtpCode, setCurrentOtpCode] = useState("");
  const [timer, setTimer] = useState<string>("");
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: currentOtpCode,
    setValue: setCurrentOtpCode,
  });

  const ref = useBlurOnFulfill({
    value: currentOtpCode,
    cellCount: CELL_COUNT,
  });

  const {
    params: { email },
  } = useRouteParams<"InsertOtpCodeScreen">();

  const { navigateTo } = useNavigation();
  const { signInByOtp, sendOtpEmail } = useAuthentication();

  useEffect(() => {
    logEvent("P36_view");

    if (!email) {
      navigateTo("InsertEmailScreen");
    } else {
      setCurrentEmail(email);
    }
  }, []);

  const handleButtonPress = async () => {
    logEvent("authOtpFormBtn_click");
    setLoading(true);

    signInByOtp({
      code: currentOtpCode,
      onSuccess: () => {
        navigateTo("TabNavigator", { screen: "CausesScreen" });
      },
      onError: () => {
        setErrorVisible(true);
        setLoading(false);
      },
    });
  };

  const handleResendCode = () => {
    setResendDisabled(true);
    sendOtpEmail({ email: currentEmail });

    countdown({
      timeInSeconds: 60,
      onChange: (seconds) => setTimer(`(${seconds}s)`),
      onComplete: () => {
        setResendDisabled(false);
        setTimer("");
      },
    });
  };

  const handleCodeChange = (code: string) => {
    setErrorVisible(false);
    setCurrentOtpCode(code);
  };

  const isButtonDisabled = loading || !isValidOTP(currentOtpCode);

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
            <LockIcon />
          </View>
          <View style={S.contentContainer}>
            <Text style={S.title}>{t("title")}</Text>

            <Text style={S.subtitle}>
              {t("subtitle", { email: currentEmail })}
            </Text>
            <CodeField
              ref={ref}
              {...props}
              value={currentOtpCode}
              onChangeText={handleCodeChange}
              cellCount={CELL_COUNT}
              rootStyle={S.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[S.cell, isFocused && S.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <View
              style={{
                ...S.errorContainer,
                display: errorVisible ? "flex" : "none",
              }}
            >
              <Icon type="outlined" name="info" size={20} color="red" />
              <Text style={S.errorText}>{t("incorrectCode")}</Text>
            </View>
            <Button
              text={t("confirmText")}
              onPress={handleButtonPress}
              customStyles={isButtonDisabled ? S.buttonDisabled : S.button}
              customTextStyles={{ color: theme.colors.neutral10 }}
              disabled={isButtonDisabled}
              loading={loading}
            />
            <TouchableOpacity
              accessibilityRole="button"
              style={S.resendCodeContainer}
              onPress={handleResendCode}
              disabled={resendDisabled}
            >
              <Text
                style={
                  resendDisabled ? S.resendCodeLinkDisabled : S.resendCodeLink
                }
              >
                {t("resendText")}
              </Text>
              <Text style={S.timer}>{timer}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default InsertOtpCodeScreen;
