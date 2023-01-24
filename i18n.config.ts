import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, pt } from "./src/utils/translations";
const { languageDetectorPlugin } = require("./src/lib/languageDetectorPlugin");

const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    compatibilityJSON: "v3",
    resources,
    fallbackLng: "en",
    debug: false,
    ns: "translation",
    defaultNS: "translation",
    preload: ["en", "pt"],
    cleanCode: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
