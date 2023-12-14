import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";

import { useAuthentication } from "contexts/authenticationContext";
import { signIn } from "services/googleSignIn";
import { logEvent } from "services/analytics";
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

  async function loginGoogle() {
    const result = await signIn();

    if (result) {
      await signInWithGoogle({ access_token: result.userInfo?.idToken });
      onContinue();
    }
  }

  function handleGoogle() {
    logEvent("authGoogleBtn_click", {
      from,
    });
    loginGoogle();
  }

  return (
    <Button
      text={t("buttonText")}
      textColor={theme.colors.neutral[600]}
      backgroundColor="transparent"
      borderColor={theme.colors.neutral[300]}
      onPress={() => handleGoogle()}
      leftItem={<GoogleIcon />}
      customStyles={{
        height: 48,
        marginBottom: 16,
      }}
    />
  );
}

export default GoogleLogin;
