import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import { useAuthentication } from "contexts/authenticationContext";
import { signIn } from "services/appleSignIn";
import { logEvent } from "services/analytics";
import { useState } from "react";
import ModalWrongEmail from "components/moleculars/modals/ModalWrongEmail";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import AppleIcon from "./assets/AppleIcon";

type Props = {
  onContinue: () => void;
  from: string;
};
function AppleLogin({ onContinue, from }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.buttons.AppleLogin",
  });

  const { signInWithApple } = useAuthentication();
  const [modalVisible, setModalVisible] = useState(false);
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();

  async function loginApple() {
    const result = await signIn();

    if (result) {
      try {
        showLoadingOverlay();
        await signInWithApple({
          access_token: result.userInfo?.identityToken,
        });
        hideLoadingOverlay();
        onContinue();
      } catch (error: any) {
        if (error.message.includes("Email does not match")) {
          setModalVisible(true);
        }
      }
    }
  }

  function handleApple() {
    logEvent("authAppleBtn_click", {
      from,
    });
    loginApple();
  }

  return (
    <>
      <Button
        text={t("buttonText")}
        textColor={theme.colors.neutral[600]}
        backgroundColor="transparent"
        borderColor={theme.colors.neutral[300]}
        onPress={() => handleApple()}
        leftItem={<AppleIcon />}
        customStyles={{
          height: 48,
        }}
      />
      <ModalWrongEmail visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
}

export default AppleLogin;
