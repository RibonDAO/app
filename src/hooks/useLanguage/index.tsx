import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "types/enums/Languages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

export const LANGUAGE_KEY = "LANGUAGE_KEY";

export function useLanguage() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    i18n.changeLanguage(currentLang);
    AsyncStorage.setItem(LANGUAGE_KEY, currentLang);
  }, [currentLang, i18n]);

  function handleSwitchLanguage() {
    if (currentLang === Languages.EN) {
      setCurrentLang(Languages.PT);
    } else if (currentLang === Languages.PT) {
      setCurrentLang(Languages.EN);
    }
  }

  return {
    currentLang,
    handleSwitchLanguage,
  };
}

