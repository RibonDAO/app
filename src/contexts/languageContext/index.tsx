import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "types/enums/Languages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";

export const LANGUAGE_KEY = "LANGUAGE_KEY";
export interface ILanguageContext {
  currentLang: Languages;
  handleSwitchLanguage: () => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const LanguageContext = createContext<ILanguageContext>(
  {} as ILanguageContext,
);

function LanguageProvider({ children }: Props) {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<Languages>(
    i18n.language as Languages,
  );
  const [loadingLanguage, setLoadingLanguage] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_KEY).then((lang) => {
      if (lang) setCurrentLang(lang as Languages);
    });
  }, []);

  useEffect(() => {
    setLoadingLanguage(true);
    i18n.changeLanguage(currentLang);
    AsyncStorage.setItem(LANGUAGE_KEY, currentLang).finally(() => {
      setLoadingLanguage(false);
    });
  }, [currentLang, i18n]);

  function handleSwitchLanguage() {
    if (currentLang === Languages.EN) {
      setCurrentLang(Languages.PT);
    } else if (currentLang === Languages.PT) {
      setCurrentLang(Languages.EN);
    }
  }

  const languageObject: ILanguageContext = useMemo(
    () => ({
      currentLang,
      handleSwitchLanguage,
    }),
    [currentLang],
  );

  return (
    <LanguageContext.Provider value={languageObject}>
      {loadingLanguage ? (
        <View
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      ) : (
        children
      )}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
};
