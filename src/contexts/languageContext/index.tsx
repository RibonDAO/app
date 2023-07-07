import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "types/enums/Languages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { setUserProperty } from "services/analytics";
import { formattedShortLanguage } from "lib/currentLanguage";

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
    formattedShortLanguage(i18n.resolvedLanguage),
  );
  const [loadingLanguage, setLoadingLanguage] = useState(false);

  useEffect(() => {
    setLoadingLanguage(true);
    i18n.changeLanguage(currentLang);
    AsyncStorage.setItem(LANGUAGE_KEY, currentLang).finally(() => {
      setLoadingLanguage(false);
    });
    setUserProperty("language", currentLang);
  }, [currentLang, i18n]);

  function handleSwitchLanguage() {
    if (currentLang === Languages.EN || currentLang === Languages.en) {
      setCurrentLang(Languages.PT);
    } else if (currentLang === Languages.PT || currentLang === Languages.pt) {
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
