import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";

import { useAuthentication } from "contexts/authenticationContext";
import { signIn } from "services/googleSignIn";
import { logEvent } from "services/analytics";
import { useState } from "react";
import ModalWrongEmail from "components/moleculars/modals/ModalWrongEmail";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import GoogleIcon from "./assets/GoogleIcon";

type Props = {
  onContinue: () => void;
  from: string;
};
function GoogleLogin({ onContinue, from }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.buttons.GoogleLogin",
  });

  const { signInWithGoogle } = useAuthentication();
  const [modalVisible, setModalVisible] = useState(false);
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();

  async function loginGoogle() {
    const result = await signIn();

    if (result) {
      try {
        showLoadingOverlay();
        await signInWithGoogle({ access_token: result.userInfo?.idToken });
        hideLoadingOverlay();
        onContinue();
      } catch (error: any) {
        hideLoadingOverlay();
        if (error.message.includes("Email does not match")) {
          setModalVisible(true);
        }
      }
    }
  }

  function handleGoogle() {
    logEvent("authGoogleBtn_click", {
      from,
    });
    loginGoogle();
  }

  return (
    <>
      <Button
        text={t("buttonText")}
        textColor={theme.colors.neutral[600]}
        backgroundColor="transparent"
        borderColor={theme.colors.neutral[300]}
        onPress={() => handleGoogle()}
        leftItem={<GoogleIcon />}
        customStyles={{
          height: 48,
        }}
      />
      <ModalWrongEmail visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
}

export default GoogleLogin;
