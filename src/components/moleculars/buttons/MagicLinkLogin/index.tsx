import { theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";

import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";

type Props = {
  onContinue: () => void;
  from: string;
};

function MagicLinkLogin({ onContinue, from }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.buttons.MagicLinkLogin",
  });

  const handleMagicLink = () => {
    logEvent("authEmailBtn_click", {
      from,
    });
    onContinue();
  };

  return (
    <Button
      text={t("buttonText")}
      textColor={theme.colors.neutral[600]}
      backgroundColor="transparent"
      borderColor={theme.colors.neutral[300]}
      customStyles={{
        height: 48,
      }}
      onPress={() => handleMagicLink()}
    />
  );
}

export default MagicLinkLogin;
