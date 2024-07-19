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
import { useTranslation } from "react-i18next";
import { useNavigation } from "hooks/useNavigation";
import { isValidEmail } from "lib/validators";
import { useEffect, useState } from "react";
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
import LockIcon from "../assets/LockIcon";

import S from "./styles";
import ModalWrongOtp from "./ModalWrongOtp";

const CELL_COUNT = 6;

function InsertOtpCodeScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.insertOtpCodeScreen",
  });

  const [currentEmail, setCurrentEmail] = useState("");
  const [currentOtpCode, setCurrentOtpCode] = useState("");
  const [timer, setTimer] = useState<string>("");
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const ref = useBlurOnFulfill({
    value: currentOtpCode,
    cellCount: CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: currentOtpCode,
    setValue: setCurrentOtpCode,
  });

  const {
    params: { email },
  } = useRouteParams<"InsertOtpCodeScreen">();

  const { navigateTo } = useNavigation();
  const { signInByOtp, sendOtpEmail } = useAuthentication();

  useEffect(() => {
    if (!email) {
      navigateTo("InsertEmailScreen");
    } else {
      setCurrentEmail(email);
    }
  }, []);

  const handleButtonPress = async () => {
    const authenticate = () => {
      signInByOtp({
        code: currentOtpCode,
        onSuccess: () => {
          navigateTo("TabNavigator", { screen: "CausesScreen" });
        },
        onError: () => {
          setModalVisible(true);
        },
      });
    };

    logEvent("authEmailFormBtn_click", {
      from: "sign_in",
    });

    authenticate();
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    sendOtpEmail({ email: currentEmail });

    let seconds = 60;

    const interval = setInterval(() => {
      seconds -= 1;
      setTimer(`(${seconds}s)`);

      if (seconds === 0) {
        clearInterval(interval);
        setResendDisabled(false);
        setTimer("");
      }
    }, 1000);
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
              onChangeText={setCurrentOtpCode}
              cellCount={CELL_COUNT}
              rootStyle={S.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              testID="my-code-input"
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
            <Button
              text={t("confirmText")}
              onPress={handleButtonPress}
              disabled={!isValidEmail(email)}
              customStyles={S.button}
              customTextStyles={{
                color: theme.colors.neutral10,
              }}
            />
            <TouchableOpacity accessibilityRole="button"
              style={S.resendCodeContainer}
              onPress={handleResendCode}
              disabled={resendDisabled}
            >
              <Text style={S.resendCodeLink}>{t("resendText")}</Text>
              <Text style={S.timer}>{timer}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <ModalWrongOtp visible={modalVisible} setVisible={setModalVisible} />
    </KeyboardAvoidingView>
  );
}

export default InsertOtpCodeScreen;
