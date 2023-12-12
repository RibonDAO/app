import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import { useAuthentication } from "contexts/authenticationContext";
import { signIn } from "services/appleSignIn";
import { logEvent } from "services/analytics";
import AppleIcon from "./assets/AppleIcon";

type Props = {
  onContinue: () => void;
};
function AppleLogin({ onContinue }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.buttons.AppleLogin",
  });

  const { signInWithApple } = useAuthentication();

  async function loginApple() {
    const result = await signIn();

    if (result) {
      await signInWithApple({
        access_token: result.userInfo?.identityToken,
      });
      onContinue();
    }
  }

  function handleApple() {
    logEvent("authAppleBtn_click", {
      from: "donation_flow",
    });
    loginApple();
  }

  return (
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
  );
}

export default AppleLogin;
