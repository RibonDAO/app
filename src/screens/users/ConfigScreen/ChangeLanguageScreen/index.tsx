import { theme } from "@ribon.io/shared/styles";
import ConfigItem from "components/moleculars/ConfigItem";
import { useLanguage } from "contexts/languageContext";
import { Languages } from "types/enums/Languages";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { logEvent } from "services/analytics";
import * as S from "./styles";

function ChangeLanguageScreen(): JSX.Element {
  const { currentLang, setCurrentLang } = useLanguage();

  const { t } = useTranslation("translation", {
    keyPrefix: "changeLanguageScreen",
  });

  useEffect(() => {
    logEvent("P18_view");
  }, []);

  const currentIcon = (key: Languages) => {
    if (currentLang === key) {
      return "radio_button_checked";
    } else {
      return "radio_button_unchecked";
    }
  };

  return (
    <S.Container>
      <S.ConfigGroup>
        <S.ConfigGroupList>
          <ConfigItem
            icon={{
              name: currentIcon(Languages.EN),
              type: "rounded",
              color: theme.colors.brand.primary[600],
              size: 24,
            }}
            text={t("languages.en")}
            onPress={() => setCurrentLang(Languages.EN)}
          />
          <ConfigItem
            icon={{
              name: currentIcon(Languages.PT),
              type: "rounded",
              color: theme.colors.brand.primary[600],
              size: 24,
            }}
            text={t("languages.ptbr")}
            onPress={() => setCurrentLang(Languages.PT)}
            last
          />
        </S.ConfigGroupList>
      </S.ConfigGroup>
    </S.Container>
  );
}

export default ChangeLanguageScreen;
