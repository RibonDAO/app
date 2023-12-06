import { theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";

import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";

type Props = {
  onContinue: () => void;
  from: string;
};

function MagicLinkButton({ onContinue, from }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "magicLinkButton",
  });

  const handleMagicLink = () => {
    logEvent("authEmailBtn_click", {
      from,
    });
    onContinue();
  };

  return (
    <Button
      outline
      onPress={() => handleMagicLink()}
      key={1}
      borderColorOutline={theme.colors.neutral[800]}
      text={t("title")}
      textColorOutline={theme.colors.neutral[800]}
      customStyles={{ height: 48 }}
    />
  );
}

export default MagicLinkButton;
